var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Any = mongoose.Schema.Types.Mixed;
// Define collection and schema for Items

var Users = new Schema({
  userName: {
    type: String,
    trim: true
  },
  email: {
    type: String
  },
  role: {
    type: String
  },
  status: {
    type: Number
  }
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('users', Users);