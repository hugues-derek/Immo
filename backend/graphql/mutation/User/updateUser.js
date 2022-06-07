const { GraphQLString, GraphQLID } = require("graphql");
const { UserType } = require("../../types");
const bcrypt = require("../../../utils/bcrypt");
const { createToken } = require("../../../utils/auth");
const { User } = require("../../../models");

//Modifier un utilisateur

const updateUser = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    status: { type: GraphQLString },
    nom: { type: GraphQLString },
    prenom: { type: GraphQLString },
    sexe: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
  },

  async resolve(_, { email, password, status, nom, prenom, sexe }, req) {
    const { verifiedUser } = req;
    if (!verifiedUser) throw new Error("Non authoriser");
    const user = await User.findOne({ email }).select("+password");

    const isSamePassword = await bcrypt.comparePassword(
      password,
      user.password
    );
    if (verifiedUser.status !== "admin" && user._id !== verifiedUser._id)
      throw new Error("Vous ne pouvez pas modifier cet user ");

    const validPassword = isSamePassword
      ? user.password
      : await bcrypt.encryptPassword(password);

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: verifiedUser._id,
        email: verifiedUser.email,
      },
      { email, password: validPassword, status, nom, prenom, sexe },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) throw new Error("user non retrouvé");

    const token = createToken({
      _id: updatedUser._id,
      email: updatedUser.email,
      status: updatedUser.status,
    });

    return token;
  },
};

module.exports = {
  updateUser,
};
