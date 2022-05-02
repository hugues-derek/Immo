const { model, Schema } = require("mongoose");

const visiteSchema = new Schema(
  {
    dateVisite: {
      type: Date,
      default: Date.now,
    },
    heureVisite: {
      type: String,
      required: true,
    },
    visiteur: {
      type: String,
      required: true,
    },
    bienVisite: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Visite", visiteSchema);
