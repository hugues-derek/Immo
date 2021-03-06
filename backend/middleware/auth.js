const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  console.log(token);
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.verifiedUser = verified;
    next();
  } catch (error) {
    console.error("error:", error);
    next();
  }
};

module.exports = {
  authenticate,
};
