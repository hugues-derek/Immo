const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const RootMutation = require("../mutation");
const {
  users,
  user,
  annonces,
  annonce,
  visites,
  visite,
  bien,
  biens,
  bienUser
} = require("../queries");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "All of queries",
  fields: {
    users,
    user,
    annonces,
    annonce,
    visites,
    visite,
    bien,
    biens,
    bienUser
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = schema;
