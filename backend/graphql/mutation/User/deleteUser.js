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
    const user = await User.findByIdAndDelete(args.id);
    return user;
  },
};

module.exports = {
  deleteUser,
};
