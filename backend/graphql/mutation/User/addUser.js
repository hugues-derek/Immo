const { UserType } = require("../../types");
const { GraphQLString, GraphQLID } = require("graphql");
const { User } = require("../../../models");
const { createToken } = require("../../../utils/auth");
const { user } = require("../../queries");
const bcrypt = require("../../../utils/bcrypt");

const addUser = {
  name: "Ajouter un utilisateur",
  type: GraphQLString,
  args: {
    nom: { type: GraphQLString },
    prenom: { type: GraphQLString },
    email: { type: GraphQLString },
    status: { type: GraphQLString },
    sexe: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const newUser = new User({
      nom: args.nom,
      prenom: args.prenom,
      email: args.email,
      status: args.status,
      sexe: args.sexe,
      password: args.password,
      imageUrl: args.imageUrl,
    });
    newUser.password = await bcrypt.encryptPassword(newUser.password);
    const user = await newUser.save();
    const token = createToken({
      _id: user._id,
      email: user.email,
      status: user.status,
    });
    return token;
  },
};

module.exports = {
  addUser,
};
