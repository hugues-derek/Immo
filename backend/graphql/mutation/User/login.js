const { GraphQLString, GraphQLID } = require("graphql");
const { UserType } = require("../../types");
const bcrypt = require("../../../utils/bcrypt");
const { createToken } = require("../../../utils/auth");
const { User } = require("../../../models");

//Modifier un utilisateur

const login = {
  type: GraphQLString,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },

  async resolve(_, { email, password }, req) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error("Invalid Email");

    const validPassword = await bcrypt.comparePassword(password, user.password);

    if (!validPassword) throw new Error("Invalid password");

    const token = createToken({
      _id: user._id,
      email: user.email,
      status: user.status,
    });

    return token;
  },
};

module.exports = {
  login,
};
