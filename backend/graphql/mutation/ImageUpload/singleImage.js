const { GraphQLID } = require("graphql");
const { GraphQLUpload } = require("graphql-upload");
const { User } = require("../../../models");
const { UserType } = require("../../types");

const uploadImage = {
  description: "telecharger une fichier",
  type: UserType,
  args: {
    image: {
      description: "Image file.",
      type: GraphQLUpload,
    },
    id: {
      type: GraphQLID,
    },
  },
  async resolve(parent, args) {
    console.log(parent, args);
  },
};

module.exports = { uploadImage };
