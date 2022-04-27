const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const { User } = require("../models");

const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "User type",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    nom: {
      type: GraphQLString,
    },
    prenom: {
      type: GraphQLString,
    },
    sexe: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },

    status: {
      type: GraphQLString,
    },
    imageUrl: {
      type: GraphQLString,
    },
  }),
});

const BiensType = new GraphQLObjectType({
  name: "Bien",
  description: "Type Biens",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    situation_Geo: {
      type: GraphQLString,
    },
    proprietaire: {
      type: UserType,
    },
    superficie: {
      type: GraphQLInt,
    },

    photos: {
      type: GraphQLList[GraphQLString],
    },
  }),
});

const AnnonceType = new GraphQLObjectType({
  name: "Annonce",
  description: "type Annonce",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    typeAnnonce: {
      type: GraphQLString,
    },
    dateAnnonce: {
      type: GraphQLString,
    },
    titre: {
      type: GraphQLString,
    },
    proprio: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.proprio);
      },
    },
  }),
});

const VisiteType = new GraphQLObjectType({
  name: "VisiteType",
  description: "visite type",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    heureVisite: {
      type: GraphQLString,
    },
    visiteur: {
      type: GraphQLString,
    },
  }),
});

module.exports = {
  UserType,
  BiensType,
  AnnonceType,
  VisiteType,
};
