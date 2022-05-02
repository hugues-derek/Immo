const { GraphQLID, GraphQLString } = require("graphql");
const { Annonce, User } = require("../../../models");
const { AnnonceType } = require("../../types");

const updateAnnonce = {
  type: AnnonceType,
  description: "Modifier une annonce",
  args: {
    id: {
      type: GraphQLString,
    },
    typeAnnonce: {
      type: GraphQLString,
    },
    titre: {
      type: GraphQLString,
    },
    proprio: {
      type: GraphQLString,
    },
  },
  async resolve(_, args, req) {
    const { verifiedUser } = req;
    const annonce = await Annonce.findById(args.id);
    console.log(annonce, verifiedUser);
    if (!verifiedUser) throw new Error("non authoriser");
    if (verifiedUser._id !== annonce.proprio) throw new Error("non authoriser");
    const updatedAnnonce = await Annonce.findByIdAndUpdate(
      args.id,
      {
        typeAnnonce: args.typeAnnonce,
        titre: args.titre,
        proprio: args.proprio,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return updatedAnnonce;
  },
};

module.exports = {
  updateAnnonce,
};
