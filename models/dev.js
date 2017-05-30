var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var devSchema = new Schema({
  email: String,
  name : {
    first : String,
    last : String
  },
  password : String,
  commissions : {
    created : [{ type: Schema.Types.ObjectId, ref: 'commission' }],
    invites : [{ type: Schema.Types.ObjectId, ref: 'commission' }]
  },
  requests : [{
    type : Schema.Types.ObjectId,
    ref : 'request'
  }]
});

var devModel = mongoose.model('dev', devSchema);
module.exports = devModel;