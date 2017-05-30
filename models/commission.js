var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commissionSchema = new Schema({
  title : String,
  payment : Boolean,
  desc : String,
  deliverables : [{
    type: Schema.Types.ObjectId,
    ref: 'deliverable'
  }],
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
});

var commissionModel = mongoose.model('commission', commissionSchema);
module.exports = commissionModel;