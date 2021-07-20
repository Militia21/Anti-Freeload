const { model, Schema } = require("mongoose");

module.exports = model(
  "winners",
  new Schema({
    id: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      default: [],
    },
    heistMode: {
      type: Boolean,
      default: false,
    },
    logChannel: {
      type: String,
      default: null,
    },
    prefix: {
      type: String,
      default: "s!",
    },
    freeloaders: {
      type: Number,
      default: 0,
    },
  })
);
