const { GraphQLObjectType } = require("graphql");
const { addUser } = require("./User/addUser");
const { updateUser } = require("./User/updateUser");
const { deleteUser } = require("./User/deleteUser");
const { login } = require("./User/login");
const { addAnnonce } = require("./Annonce/addAnnonce");
const { deleteAnnonce } = require("./Annonce/deleteAnnonce");
const { updateAnnonce } = require("./Annonce/updateAnnonce");
const { addVisite, deleteVisite, updateVisite } = require("./Visite/addVisite");
const { addBien, deleteBien, updateBien } = require("./Bien/bien");

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  description: "All mutations",
  fields: {
    addUser,
    updateUser,
    deleteUser,
    login,
    addAnnonce,
    deleteAnnonce,
    updateAnnonce,
    addVisite,
    deleteVisite,
    updateVisite,
    addBien,
    deleteBien,
    updateBien,
  },
});

module.exports = RootMutation;
