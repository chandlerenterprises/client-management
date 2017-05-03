var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
  budget : {
    min : Boolean,
    max : Boolean
  },
  description : String,
  similarProducts : Array, //array of links
  pictures : Object, //set up gridFS
  chosenDevs : [{
    type: Schema.Types.ObjectId,
    ref: 'dev'   
  }],
  client : {
    type: Schema.Types.ObjectId,
    ref: 'client'
  }
});

var requestModel = mongoose.model('request', requestSchema);
module.exports = requestModel;