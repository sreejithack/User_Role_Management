const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = mongoose.Schema({
  userName: { type: String,required: true,unique: true} ,
  password: { type: String,required: true} ,
  userRole: { type: Schema.Types.ObjectId,
    ref: 'Role',required: true }, 
  status: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);