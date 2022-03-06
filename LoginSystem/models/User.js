const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:{
    type: String
  },
  email:{
    type: String
  },
  password: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User',userSchema);

module.exports = User;