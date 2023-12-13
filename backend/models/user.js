const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  profile: {
    description: { type: String },
    name: { type: String },
  },
  username: { type: String },
  email: { type: String },
  password: { type: String },
  role: {
    type: String,
    enum: ['Visitor', 'Member', 'Admin'],
    default: 'Visitor',
  },
  profileImage: { type: String },
  friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  reg_time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', UserSchema);
