const { Schema, model } = require("mongoose");

const annonceSchema = new Schema(
  {
    typeAnnonce: {
      type: String,
      enum: ["vente", "location"],
      required: true,
    },
    dateAnnonce: {
      type: Date,
      default: Date.now,
    },
    titre: {
      type: String,
      required: true,
    },
    proprio: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Annonce", annonceSchema);
