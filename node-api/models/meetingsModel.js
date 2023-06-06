var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Any = mongoose.Schema.Types.Mixed;
// Define collection and schema for Items

var Meetings = new Schema({
  title: {
    type: String,
    trim: true
  },
  meetingDate: {
    type: Date,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  totalUsers: {
    type: Number
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'meetings'
});

var MeetingUsers = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'
  },
  meetingId: {
    type: mongoose.Schema.Types.ObjectId, required: true, ref: 'meetings'
  },
  userAck: {
    type: Boolean,
    default: false
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'meeting_users'
});

// module.exports = mongoose.model('meetings', meetings);

module.exports = {
  Meetings: mongoose.model('meetings', Meetings),
  MeetingUsers: mongoose.model('meeting_users', MeetingUsers)
}