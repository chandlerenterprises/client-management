var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deliverableSchema = new Schema({
  dates : {
    created : Date,
    due : Date,
    completed : Date
  },
  partition : Boolean,
  desc : String,
  devs : Array,
  commission: {
    type: Schema.Types.ObjectId,
    ref: 'commission'
  }
});

var deliverableModel = mongoose.model('deliverable', deliverableSchema);
module.exports = deliverableModel;