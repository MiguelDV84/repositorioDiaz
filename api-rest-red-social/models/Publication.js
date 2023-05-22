const { Schema, model } = require("mongoose");

const PublicationSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  file: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Publication", PublicationSchema, "publications");