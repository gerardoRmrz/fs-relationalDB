const errorHandler = (error, req, res, next) => {
  if (error.name === "SequelizeValidationError") {
    const errors = JSON.stringify(error.errors.map((err) => err.message));
    console.log({ errors: errors });
    return res.status(400).send({ errors: errors });
  }
  next(error);
};

module.exports = errorHandler;
