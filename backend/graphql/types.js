const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const { User, Bien } = require("../models");

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
    situationGeo: {
      type: GraphQLString,
    },
    proprietaire: {
      type: UserType,
      async resolve(parent) {
        return await User.findById(parent.proprietaire);
      },
    },
    superficie: {
      type: GraphQLInt,
    },
    photos: {
      type: new GraphQLList(GraphQLString),
    },
    description: {
      type: GraphQLString,
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
    dateVisite: {
      type: GraphQLString,
    },
    visiteur: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.visiteur);
      },
    },
    bienVisite: {
      type: BiensType,
      async resolve(parent) {
        return await Bien.findById(parent.bienVisite);
      },
    },
  }),
});

module.exports = {
  UserType,
  BiensType,
  AnnonceType,
  VisiteType,
};
