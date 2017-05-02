var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commissionSchema = new Schema({
  deliverables : [{
    type: Schema.Types.ObjectId,
    ref: 'deliverable'    
  }],
  devs: [{
    type: Schema.Types.ObjectId,
    ref: 'dev'
  }],
  payment : Boolean,
  client : {
    type: Schema.Types.ObjectId,
    ref: 'client'
  }
});

var studentModel = mongoose.model('commission', commissionSchema);
module.exports = studentModel;