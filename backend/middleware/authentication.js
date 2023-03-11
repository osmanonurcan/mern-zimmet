const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  const token = req.headers["access-token"];

  if (!token) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const { email, password } = payload;

    if (email !== process.env.EMAIL || password !== process.env.PASSWORD) {
      throw new UnauthenticatedError("Authentication Invalid");
    }
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = auth;
