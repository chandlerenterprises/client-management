var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
  email: String,
  firstName: String,
  lastName : String,
  password: String,
  commissions: [{
    type: Schema.Types.ObjectId,
    ref: 'deliverable'    
  }]
});

var clientModel = mongoose.model('client', clientSchema);
module.exports = clientModel;