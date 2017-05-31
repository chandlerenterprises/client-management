var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deliverableSchema = new Schema({
  dates : {
    created : Date,
    start : Date,
    due : Date,
    completed : Boolean
  },
  title : String,
  partition : Number,
  items : [{
    body : String,
    _id: {
      type: Schema.Types.ObjectId,
      default: function () { return new mongoose.Types.ObjectId }
    }
  }],
  devs : Array,
  notes : [{
    title : String,
    body : String,
    dateCreated : Date
  }],
  commission: {
    type: Schema.Types.ObjectId,
    ref: 'commission'
  }
});

var deliverableModel = mongoose.model('deliverable', deliverableSchema);
module.exports = deliverableModel;