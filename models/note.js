var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
  global : Boolean,
  dateCreated : Date,
  title : String,
  body : String,
  creatorUserType: String,
  creator : { type: Schema.Types.ObjectId, refPath: 'creatorUserType' },
  deliverable : { type: Schema.Types.ObjectId, ref: 'deliverable' },
  responses : [{
    body : String,
    userType : String,
    user : { type: Schema.Types.ObjectId, refPath: 'responses.userType' }
  }]
});

var noteModel = mongoose.model('note', noteSchema);
module.exports = noteModel;