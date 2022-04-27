const { GraphQLList, GraphQLID } = require("graphql");
const { UserType, AnnonceType } = require("./types");
const { User, Annonce } = require("../models");

// tous les utilisateurs
const users = {
  type: new GraphQLList(UserType),
  description: "Retrieves a list of users",
  resolve: () => User.find(),
};

// utilisateur par l'id
const user = {
  type: UserType,
  description: "retrieve single user",
  args: {
    id: {
      type: GraphQLID,
    },
  },
  resolve: (_, { id }) => User.findById(id),
};

//toutes les annonces
const annonces = {
  type: new GraphQLList(AnnonceType),
  description: "La liste de toutes Annonces",

  async resolve() {
    return Annonce.find();
  },
};

// annonce par Id
const annonce = {
  type: AnnonceType,
  description: "annonce par l'id",
  args: {
    id: {
      type: GraphQLID,
    },
  },
  async resolve(_, { id }) {
    return Annonce.findById(id);
  },
};

module.exports = {
  user,
  users,
  annonces,
  annonce,
};
