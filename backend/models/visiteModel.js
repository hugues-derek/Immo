const { model, Schema } = require("mongoose");

const visiteSchema = new Schema(
  {
    dateVisite: {
      type: Date,
      required: true,
    },
    heureVisite: {
      type: String,
    },
    visiteur: {
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
