const { GraphQLID, GraphQLString, GraphQLList } = require("graphql");
const { VisiteType } = require("../../types");
const { Visite } = require("../../../models");

const addVisite = {
  type: VisiteType,
  description: "Ajouter une visite",

  args: {
    dateVisite: {
      type: GraphQLString,
    },
    heureVisite: {
      type: GraphQLString,
    },
    visiteurs: {
      type: GraphQLString,
    },
    bienVisite: {
      type: GraphQLString,
    },
  },
  async resolve(_, args, req) {
    const { verifiedUser } = req;
    if (!verifiedUser) throw new Error("Non authoriser");

    const newVisite = new Visite({
      heureVisite: args.heureVisite,
      dateVisite: args.dateVisite,
      bienVisite: args.bienVisite,
      visiteur: verifiedUser._id,
    });
    await newVisite.save();
    return newVisite;
  },
};

// Supprimer visite avec l'id
const deleteVisite = {
  type: VisiteType,
  description: "Supprimer une visite",
  args: {
    id: {
      type: GraphQLID,
    },
  },
  resolve: async (_, { id }, req) => {
    const { verifiedUser } = req;
    if (!verifiedUser) throw new Error("Non authoriser");
    const visite = await Visite.findById(id);
    if (visite.visiteur !== verifiedUser._id && verifiedUser.status !== "admin")
      throw new Error("Vous ne pouvez pas supprimer cette visite");
    return Visite.findByIdAndDelete(id);
  },
};

//update visite
const updateVisite = {
  type: VisiteType,
  description: "Modifier une visite",
  args: {
    id: {
      type: GraphQLID,
    },
    dateVisite: {
      type: GraphQLString,
    },
    heureVisite: {
      type: GraphQLString,
    },
    visiteurs: {
      type: GraphQLString,
    },
    bienVisite: {
      type: GraphQLString,
    },
  },
  async resolve(_, args, req) {
    const { verifiedUser } = req;
    if (!verifiedUser) throw new Error("Non authoriser");

    const visite = await Visite.findById(args.id);
    if (visite.visiteur !== verifiedUser._id && verifiedUser.status !== "admin")
      throw new Error("Vous ne pouvez pas modifier cette visite");
    const updatedVisite = await Visite.findByIdAndUpdate(
      args.id,
      {
        dateVisite: args.dateVisite,
        heureVisite: args.heureVisite,
        bienVisite: args.bienVisite,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return updatedVisite;
  },
};

module.exports = {
  addVisite,
  deleteVisite,
  updateVisite,
};
