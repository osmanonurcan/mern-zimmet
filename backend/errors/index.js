const CustomError = require("./customError");
const BadRequestError = require("./badRequest");
const NotFoundError = require("./notFound");
const UnauthenticatedError = require("./unauthenticated");

module.exports = {
  CustomError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
};
