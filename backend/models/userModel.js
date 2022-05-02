const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    nom: {
      type: String,
      maxlength: 256,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
      maxlength: 256,
    },
    sexe: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "fournir un email valide",
      ],
    },
    status: {
      type: String,
      required: true,
      enum: ["proprio", "client", "admin"],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
