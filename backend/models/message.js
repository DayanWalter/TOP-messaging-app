const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'user' },
  receiver: {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    group: { type: Schema.Types.ObjectId, ref: 'group' },
  },

  text: { type: String },
  timestamp: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['read', 'unread'],
    default: 'unread',
  },
});

module.exports = mongoose.model('message', MessageSchema);
