var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
  email: String,
  companyName: String,
  firstName: String,
  lastName : String,
  password: String,
  ip: String,
  commissions : Object // something
});

var clientModel = mongoose.model('client', clientSchema);
module.exports = clientModel;