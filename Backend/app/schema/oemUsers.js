const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: {type: String, required: true},
    mobileNumber: {type: Number, required: true, unique: true},
    countryCode: {type: Number, default: 91},
    activeStatus: {type: Boolean, default: true},
    adminUser: {type: Boolean, default: false},
    logout: {type: Boolean, default: false},
    roleName: {type: String, default: "user"},
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: "Customer"},
    lastActive: {type: Date, default: Date.now},
    assemblyType: {type: String},
    oemStage: {type: String},
    maxPressure2: {type: Number},
    minPressure2: {type: Number},
},{timestamps: true});

module.exports = mongoose.model('User', UserSchema);