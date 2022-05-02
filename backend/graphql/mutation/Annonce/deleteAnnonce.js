const { GraphQLID } = require("graphql");
const { Annonce, User } = require("../../../models");
const { AnnonceType } = require("../../types");

const deleteAnnonce = {
  type: AnnonceType,
  description: "Supprimer une annonce",
  args: {
    id: {
      type: GraphQLID,
    },
  },
  async resolve(_, { id }, req) {
    const { verifiedUser } = req;
    let annonce = await Annonce.findById(id);
    if (!annonce) throw new Error("id incorrect");
    if (verifiedUser._id != annonce.proprio) throw new Error("non authoriser");
    annonce = await Annonce.findByIdAndDelete(id);
    return annonce;
  },
};

module.exports = {
  deleteAnnonce,
};
