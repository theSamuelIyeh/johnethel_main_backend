if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const cors = require('cors');
//   const session = require('express-session');
//   const passport = require('passport');
//   const multer = require('multer');
//   const adminUser = require('./models/adminUser');
  
  
  
  const siteRouter = require('./routes/site');
//   const usersRouter = require('./routes/users');
//   const bookRouter = require('./routes/books');
//   const categoryRouter = require('./routes/categories');
  
  
  //app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
  app.use(cors());
//   const oneDay = 1000 * 60 * 30;
//   app.use(session({
//       secret: process.env.SESSION_SECRET,
//       cookie: { maxAge: oneDay },
//       resave: false,
//       saveUninitialized: false
//   }));
  
  app.use(express.urlencoded({ extended: true }));
//   app.use(passport.initialize());
//   app.use(passport.session());
  app.use(express.json());
  
  const mongoose = require('mongoose');
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', error => console.error(error));
  db.once('open', () => console.log('Connected to Mongoose'));
//   adminUser();
  
  app.use('/api/site', siteRouter);
//   app.use('/api/users', usersRouter);
//   app.use('/api/books', bookRouter);
//   app.use('/api/categories', categoryRouter);
  
  
  app.listen(process.env.PORT || 3001, () => console.log('Server started on port 3001'));