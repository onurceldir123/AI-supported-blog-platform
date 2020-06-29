const mongoose = require('mongoose');
const { dateFormat } = require('highcharts');

const dataSchema = mongoose.Schema({
  TMP_1: {type: Number, required: true},
  TMP_2 : {type: Number, required: true},
  GS_1 : {type: Number, required: true},
  GS_2: { type: Number, required: true },
  VBR_1: { type: Number, required: true },
  date: {type: Date, required: true},
  prediction: {type: String, required: true}
});

module.exports = mongoose.model('5ee003b85bb3776b83e6e682', dataSchema);
