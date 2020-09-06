const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Modelchema = mongoose.Schema({
    moduleName: { type: String, required: true, unique: true },
    users: {
        type: Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    status: { type: Boolean, default: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Model', Modelchema);