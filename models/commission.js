var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commissionSchema = new Schema({
  title : String,
  payment : Number,
  desc : String,
  devs: [{
    type: Schema.Types.ObjectId,
    ref: 'dev'
  }],
  clients : [{
    type: Schema.Types.ObjectId,
    ref: 'client'
  }],
  creator : {
    type: Schema.Types.ObjectId,
    ref: 'dev'
  },
  deliverables : [{
    type: Schema.Types.ObjectId,
    ref: 'deliverable'
  }],
  notes : [{
    type: Schema.Types.ObjectId,
    ref: 'note'
  }]
});

var commissionModel = mongoose.model('commission', commissionSchema);
module.exports = commissionModel;