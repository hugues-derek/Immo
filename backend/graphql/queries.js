const { GraphQLList, GraphQLID } = require("graphql");
const { UserType, AnnonceType, VisiteType, BiensType } = require("./types");
const { User, Annonce, Visite, Bien } = require("../models");

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
  resolve: async (_, { id }) => {
    const user = await User.findById(id);
    if (!user) throw new Error("utilisateur introuvable");
  },
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

//Toutes les visites
const visites = {
  type: new GraphQLList(VisiteType),
  description: "La liste de toutes les visites",
  resolve: () => Visite.find(),
};

// visite par Id
const visite = {
  type: VisiteType,
  description: "visite par l'id",
  args: {
    id: {
      type: GraphQLID,
    },
  },
  async resolve(_, { id }) {
    return Visite.findById(id);
  },
};

//bien par l'id
const bien = {
  type: BiensType,
  description: "Bien par l'id",
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_, args) {
    return await Bien.findById(args.id);
  },
};

//bien par l'utilisateur
const bienUser = {
  type: new GraphQLList(BiensType),
  description: "Avoir les biens par l'utilisateur",
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_, args, req) {
    console.log(req);
    const biens = await Bien.find({ propritaire: args.id });
    return biens;
  },
};

//Tous les biens
const biens = {
  type: new GraphQLList(BiensType),
  resolve() {
    return Bien.find();
  },
};

module.exports = {
  user,
  users,
  annonces,
  annonce,
  visites,
  visite,
  bien,
  biens,
  bienUser,
};
