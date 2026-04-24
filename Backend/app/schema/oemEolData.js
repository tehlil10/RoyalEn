/* Created by Rutik on 13-01-2026 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const oemEOLDataSchema = new Schema({
    oemStage: {type: String},
    customerId: {type: Schema.Types.ObjectId},
    userId: {type: Schema.Types.ObjectId},
    macAddress: {type: String},
    pressure: {type: String},
    temperature: {type: String},
    battery: {type: String},
    beforeAssembly: {type: String, default: ""},
    afterAssembly: {type: String, default: ""},
    userId2: {type: Schema.Types.ObjectId},
    pressure2: {type: String},
    temperature2: {type: String},
    battery2: {type: String},
    counter: {type: Number},
    counter2: {type: Number},
    stageDate1: {type: Date},
    stageDate2: {type: Date},
}, {timestamps: true});

module.exports = mongoose.model('t_oemEOLData', oemEOLDataSchema);