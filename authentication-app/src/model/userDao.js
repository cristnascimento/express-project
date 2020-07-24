const bcrypt = require('bcrypt');
const { User } = require('./user');

const getUser = async (id, callback) => { 
    const user = await User.findByPk(id);
    callback(null, user);
}

const getUserByUserName = async (username, callback) => { 
    const user = await User.findOne({where: {username: username}});
    callback(null, user);
}

const createUser = (user, callback) => {
  const salt = 10;
  console.log(user);
  bcrypt.hash(user.password, salt, async (err, hash) => {
    try {      
      const jane = await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.email,
        email: user.email,
        password: hash,
      });
      console.log(jane.toJSON());
      callback(null, jane.id);
    } catch (Err) {
      callback(Err);
    }
    
  })
}

const updateUser = async (user) => { }
const deleteUser = async (user) => { }
const activateUser = async (id, callback) => { 
  const user = await User.findByPk(id);
  user.active = true;
  user.save();
  console.log(user.toJSON());
  callback(null);
}

module.exports = {
    getUser,
    getUserByUserName,
    createUser,
    updateUser,
    deleteUser,
    activateUser,
}