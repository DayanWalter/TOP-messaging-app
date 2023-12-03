const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: { type: String },
  timestamp: Date.now(),
  status: { type: String },
  from: { type: Schema.Types.ObjectId, ref: 'user' },
  to: { type: Schema.Types.ObjectId, ref: 'chat' },
});

module.exports = mongoose.model('message', MessageSchema);
