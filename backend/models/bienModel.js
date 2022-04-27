const { Schema, model } = require("mongoose");

const bienSchema = new Schema(
  {
    situationGeo: {
      type: String,
      required: true,
    },
    proprio: Schema.Types.ObjectId,

    superficie: {
      type: Number,
      required: true,
    },

    images: {
      type: [String],
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
