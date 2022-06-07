const { UserType } = require("../../types");
const { GraphQLString, GraphQLID } = require("graphql");
const { User } = require("../../../models");

//Supprimer un utilisateur un utilisateur
const deleteUser = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_, args, req) {
    if (!req.verifiedUser) throw new Error("vous n'êtes pas authentifié");

    if (req.verifiedUser.status !== "admin" && req.verifiedUser._id !== args.id)
      throw new Error("vous ne pouvez pas modifier cet utilisateur");

    const user = await User.findByIdAndDelete(args.id);
    if (!user) throw new Error("utilisateur introuvable");
    return user;
  },
};

module.exports = {
  deleteUser,
};
