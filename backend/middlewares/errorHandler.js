const { isCelebrateError } = require("celebrate");

module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'SequelizeValidationError' || err.name === 'CastError') {
    err.statusCode = 400;
    err.message = 'Datos inválidos o ID mal formado';
  }

  if (err.name === "DocumentNotFoundError") {
    err.statusCode = 404;
    err.message = "Recurso no encontrado";
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    err.statusCode = 409;
    err.message = "Ese correo ya está registrado";
  }

  if (isCelebrateError(err)) {
    err.statusCode = 400;

    const first = err.details.values().next().value;
    const detail = first?.details?.[0];

    err.message = detail?.message
      ? detail.message.replace(/"/g, "")
      : "Datos inválidos";
  }

  const { statusCode = 500 } = err;
  const message =
    statusCode === 500 ? "Error interno del servidor" : err.message;

  if (statusCode === 500) console.error(err);

  res.status(statusCode).json({ message });
};
