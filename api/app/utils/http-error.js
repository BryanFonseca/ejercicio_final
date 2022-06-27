module.exports = class HttpError extends Error {
  constructor(message, statusCode = 404) {
    super(message);
    this.statusCode = statusCode;
  }
};
