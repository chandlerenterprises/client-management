var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deliverableSchema = new Schema({
  date : Date,
  partition : Boolean,
  description : String,
  devs : Array,
  commission: [{
    type: Schema.Types.ObjectId,
    ref: 'commission'
  }]
});

var deliverableModel = mongoose.model('deliverable', deliverableSchema);
module.exports = deliverableModel;