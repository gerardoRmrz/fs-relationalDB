const errorHandler = (error, req, res, next) => {
  if (error.name === "SequelizeValidationError") {
    const errors = JSON.stringify(error.errors.map((err) => err.message));
    return res.status(400).send({ errors: errors });
  } else {
    console.log({ errors: error });
  }
  next(error);
};

module.exports = errorHandler;
