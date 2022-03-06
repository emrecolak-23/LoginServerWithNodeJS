const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registiration Process
const register = (req, res, next) => {

  bcrypt.hash(req.body.password, 10, function(err,hashedPass){
    if (err) {
      res.json({
        error:err
      });
    }
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass
    });
  
    user.save()
    .then(user=> {
      res.json({
        message: "User Added Successfully!"
      })
    })
    .catch(error=> {
      res.json({
        message: "An error occured!"
      })
    });
  });

}

// Login Process
const login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email:req.body.email})
      .then(user => {
        if(user){
          bcrypt.compare(password, user.password, function(err,result){
            if (err) {
              res.json({
                error:err
              })
            }
            if (result) {
              let token = jwt.sign({name: user.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME});
              let resfreshToken = jwt.sign({name: user.name}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME});

              res.json({
                message: 'Login Succesful!',
                token: token,
                resfreshToken
              })
            } else {
              res.json({
                message: "Password does not matched"
              });
            }
          })
        } else {
          res.json({
            message: "No user found!"
          })
        }
      })

}

const resfreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function(err,decode) {
    if(err){
      res.status(400).json({
        err
      })
    }
    else {
      let token = jwt.sign({name:decode.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME})
      let refreshToken = req.body.refreshToken;
      res.status(200).json({
        message: "Token refreshed successfully!",
        token,
        refreshToken
      })
    }
  })
}

module.exports = {
  register, login, resfreshToken
}