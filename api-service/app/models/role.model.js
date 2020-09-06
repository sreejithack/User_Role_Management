const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
  roleName: { type: String,required: true,unique: true} ,
  status: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Role', RoleSchema);