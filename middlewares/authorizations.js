const Book = require('../models/book');

const IsAuthenticated = (req, res, next) => {  //working
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({message: 'You are not logged in'});
    }
}

const IsNotAuthenticated = (req, res, next) => {   // working
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.status(403).json({message: 'a user is logged in already'});
    }
}

const IsNotValidAdmin = (req, res, next) => {  // working
    if (req.body.role === 'admin') {
        return res.status(403).json({message: 'You cannot be admin'});
    } else {
        return next();
    }
}

const IsAdmin = (req, res, next) => {    // working
    if (req.user[0].role === 'admin') {
        return next();
    } else {
        return res.status(403).json({message: 'You are not admin'});
    }
}

const IsAuthor = (req, res, next) => {   // working
    console.log(req.user);
    if (req.user[0].role === 'author') {
        return next();
    } else {
        return res.status(403).json({message: 'You are not author'});
    }
}

// for deleting and updating own acct (only admins or acct owners)
const IsLoggedInUser = (req, res, next) => {   // working
    if (req.user[0]._id.toString() === req.params.id || req.user[0].role == 'admin') {
        return next();
    } else {
        return res.status(403).json({message: 'You are not authorized'});
    }
}

const IsBookOwner = async (req, res, next) => {    // working
  const book = await Book.findById(req.params.id);
  if (req.user[0]._id.toString() === book.author.toString()) {
      return next();
  } else {
      return res.status(403).json({message: 'You are not authorized'});
  }
}

module.exports = { IsAuthenticated, IsNotAuthenticated, IsNotValidAdmin, IsAdmin, IsAuthor, IsLoggedInUser, IsBookOwner };