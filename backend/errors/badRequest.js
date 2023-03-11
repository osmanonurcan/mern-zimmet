const { StatusCodes } = require("http-status-codes");
const CustomError = require("./customError");

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

// const badRequestError = (errorObj, res) => {
//   // bu işlem veritananına log yazmak
//   res.json({
//     status: StatusCodes.BAD_REQUEST,
//     message: errorObj.message,
//   });
// };

module.exports = BadRequestError;
