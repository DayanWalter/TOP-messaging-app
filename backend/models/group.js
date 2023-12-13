const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'message' }],
});

module.exports = mongoose.model('group', GroupSchema);
