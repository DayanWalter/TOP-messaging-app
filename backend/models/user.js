const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  profile: {
    description: { type: String },
    name: { type: String },
  },
  username: { type: String },
  password: { type: String },
  role: { type: String },
  people: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  chats: [{ type: Schema.Types.ObjectId, ref: 'chat' }],
});

module.exports = mongoose.model('user', UserSchema);
