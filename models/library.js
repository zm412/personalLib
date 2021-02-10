let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const schemaLib = new Schema({
  title: {
    type: String,
    require: true
  }, 
  comments: {
    type: Array,
  },  

  commentcount:{
    type: Number,
    default: 0
   } 
   

}, ); 



module.exports = mongoose.model('Library', schemaLib); 
