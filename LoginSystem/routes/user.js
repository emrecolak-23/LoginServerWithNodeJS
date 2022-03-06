const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authenticate');

router.get("/", authenticate, (req, res)=>{
  res.json("Welcomte to home page");
})

module.exports = router