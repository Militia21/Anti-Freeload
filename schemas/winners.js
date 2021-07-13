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
      required: false,
      allowNull: true,
      default: null,
    },
  })
);
