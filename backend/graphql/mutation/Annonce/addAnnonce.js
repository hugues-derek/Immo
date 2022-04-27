const { GraphQLString, GraphQLID, GraphQL } = require("graphql");
// const { auth, bcrypt } = require("../../../utils");
const { Annonce } = require("../../../models");
const { AnnonceType } = require("../../types");

const addAnnonce = {
  type: AnnonceType,
  description: "Ajouter une annonce",
  args: {
    typeAnnonce: { type: GraphQLString },
    dateAnnonce: { type: GraphQLString },
    titre: { type: GraphQLString },
    proprio: { type: GraphQLString },
  },

  async resolve(_, args, req) {
    const { verifiedUser } = req;
    if (!verifiedUser) throw new Error("Non authoriser");

    const newAnnonce = new Annonce({
      typeAnnonce: args.typeAnnonce,
      dateAnnonce: Date.now(),
      titre: args.titre,
      proprio: verifiedUser._id,
    });

    await newAnnonce.save();
    return newAnnonce;
  },
};

module.exports = { addAnnonce };
