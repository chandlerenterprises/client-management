var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
  email: String,
  companyName: String,
  name : {
    first : String,
    last : String
  },
  password: String,
  ip: String,
  requests : [{
    type: Schema.Types.ObjectId,
    ref: 'request'
  }],
  commissions : {
    invites : [{ type: Schema.Types.ObjectId, ref: 'commission' }]
  }
});

var clientModel = mongoose.model('client', clientSchema);
module.exports = clientModel;