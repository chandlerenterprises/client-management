var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commissionSchema = new Schema({
  deliverables : [{
    date : Date,
    partition : Boolean,
    description : String
  }],
  payment : Boolean,
  client : {
    type: Schema.Types.ObjectId,
    ref: 'client'
  }
});

var studentModel = mongoose.model('commission', commissionSchema);
module.exports = studentModel;