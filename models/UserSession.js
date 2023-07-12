const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '1h', 
  },
});

const UserSession = mongoose.model('UserSession', UserSessionSchema);

module.exports = UserSession;
