const express = require('express');
const mongoose = require('mongoose');
const morgan  = require('morgan');
const bodyParser = require('body-parser');

// ENV Config
const dotenv = require('dotenv');
dotenv.config();

const AuthRoute = require('./routes/auth');
const UserRoute = require('./routes/user');

const app = express();

// Database Connected And Server Created
const dbURI = "mongodb+srv://emco:emco3232@nodetuts.iuulr.mongodb.net/usersDb?retryWrites=true&w=majority"
mongoose.connect(dbURI, {useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>{
  // declare port number
  const PORT = 9000;
  // listen for request
  app.listen(PORT,()=>{
    console.log(`Server is created in ${PORT} port`)
  });} )
.catch((err)=>{ console.log(err); })

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Routes
app.use(AuthRoute);
app.use(UserRoute)