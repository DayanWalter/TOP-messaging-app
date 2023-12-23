const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  groupname: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'user' }],
});

module.exports = mongoose.model('group', GroupSchema);
