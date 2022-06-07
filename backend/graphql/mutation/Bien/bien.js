const {
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} = require("graphql");

const { BiensType } = require("../../types");
const { User, Bien } = require("../../../models");
const { findByIdAndUpdate } = require("../../../models/userModel");

//Ajouter un bien
const addBien = {
  type: BiensType,
  description: "Ajouter un bien immobilier",
  args: {
    situationGeo: {
      type: GraphQLString,
    },
    proprietaire: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    photos: {
      type: new GraphQLList(GraphQLString),
    },
    superficie: {
      type: GraphQLInt,
    },
  },
  async resolve(_, args, req) {
    const { verifiedUser } = req;
    console.log(verifiedUser);
    if (!verifiedUser) throw new Error("non authentifier");
    if (verifiedUser.status !== "proprio")
      throw new Error("vous devez être propriétaire avant d'ajouter un bien");

    const newBien = new Bien({
      ...args,
      proprietaire: verifiedUser._id,
    });
    await newBien.save();
    return newBien;
  },
};

// Supprimer un bien
const deleteBien = {
  type: BiensType,
  description: "supprimer un bien ",
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_, args, req) {
    const { verifiedUser } = req;
    if (!verifiedUser) throw new Error("Vous n'êtes pas authentifier");
    const bien = await Bien.findById(args.id);
    console.log(bien);
    if (!bien) throw new Error(`id invalide`);
    const proprioId = new String(bien?.proprietaire);
    if (proprioId != verifiedUser._id)
      throw new Error("Vous ne pouvez pas supprimer ce bien");
    const deletedBien = await Bien.findByIdAndDelete(args.id);
    if (!deletedBien) throw new Error("bien introuvable");
    return deletedBien;
  },
};

// Modifier un bien
const updateBien = {
  type: BiensType,
  description: "modifier un bien",
  args: {
    id: {
      type: GraphQLID,
    },
    situationGeo: {
      type: GraphQLString,
    },
    proprietaire: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    photos: {
      type: new GraphQLList(GraphQLString),
    },
    superficie: {
      type: GraphQLInt,
    },
  },
  async resolve(_, args, req) {
    const { verifiedUser } = req;
    if (!verifiedUser) throw new Error("non authoriser");
    const bien = await Bien.findById(args.id);
    console.log(verifiedUser._id, bien.proprietaire);
    if (
      bien.proprietaire !== verifiedUser._id &&
      verifiedUser.status !== "admin"
    )
      throw new Error("Vous ne pouvez pas modifier ce bien");

    const updatedBien = await Bien.findByIdAndUpdate(args.id, {
      ...args,
      proprietaire: verifiedUser._id,
    });
    if (!updatedBien) throw new Error("Bien introuvable");
    return updatedBien;
  },
};

module.exports = {
  addBien,
  deleteBien,
  updateBien,
};
