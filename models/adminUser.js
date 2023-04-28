// const User = require('./user');
const bcrypt = require('bcrypt');

const func = async () => {
  const password = 'admin';
  const hashedpassword = await bcrypt.hash(password, 10);
  const exists = await User.exists({email: 'admin@email.com', role: 'admin'});
  if (!exists) {
    const user = new User({
      role: 'admin',
      first_name: 'admin',
      last_name: 'admin',
      password: hashedpassword,
      email: 'admin@email.com',
    });
    user.save();
  }
}

module.exports = func;