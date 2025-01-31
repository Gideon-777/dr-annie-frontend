const HttpStatus = require('http-status-codes');

const genericResponse = (statusCode, message, data) => {
  return {
    statusCode: statusCode,
    message: message,
    data
  }
};

const ok = (data) => {
  return {
    statusCode: HttpStatus.OK,
    message: "Success",
    data
  }
};

module.exports = {genericResponse, ok};
