const express = require('express');
const mongoose  = require('mongoose');
const path = require('path'); 

//CONFIGURATION FILES
const app = require('./app');
const devEnv = require('./config/dev.json');

const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, 'config.env') });


//DB CONNECTION
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
  	dbName: `marble_health`,
  })
  .then(() => {
    console.log("database connected successfully");
  }).catch(err =>{
    console.log("ERR CONNECTING DATABASE",err);
  });


const port = devEnv.PORT || 8200;
const host = `http://127.0.0.1:`
app.listen(port,()=>{
  console.log(`server is running on ${host}${port}`)
});
