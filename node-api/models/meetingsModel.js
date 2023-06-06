var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Any = mongoose.Schema.Types.Mixed;
// Define collection and schema for Items

var meetings = new Schema({
  title: {
    type: String,
    trim: true
  },
  totalUsers: {
    type: Number
  },
  status: {
    type: Number
  }
}, {
  timestamps: true,
  collection: 'meetings'
});

module.exports = mongoose.model('meetings', meetings);