const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  name: { type: String },
  user: [{ type: Schema.Types.ObjectId, ref: 'user' }],
});

module.exports = mongoose.model('chat', ChatSchema);
