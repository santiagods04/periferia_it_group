const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 280,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', postSchema);