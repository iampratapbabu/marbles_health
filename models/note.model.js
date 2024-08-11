const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required:[true,"title is required"]
  },
  body: {
    type: String,
    required:[true,"body is required"],
  },

  created_at:{
    type:Date,
    default:Date.now(),
  },

  updated_at:{
    type:Date,
    default:null,
  },

  deleted_at:{
    type:Date,
    default:null
  }

});

 

module.exports = mongoose.model('Note', noteSchema);;
