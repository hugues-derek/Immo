const { Schema, model } = require("mongoose");

const bienSchema = new Schema(
  {
    situationGeo: {
      type: String,
      required: true,
    },
    proprietaire: {
      type: String,
      required: true,
    },

    superficie: {
      type: Number,
      required: true,
    },

    photos: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("bien", bienSchema);
