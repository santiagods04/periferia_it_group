const { celebrate, Joi } = require("celebrate");

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': 'El formato del email no es válido',
        'any.required': 'El email es obligatorio',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'La contraseña debe tener al menos 8 caracteres',
        'any.required': 'La contraseña es obligatoria',
      }),
  }),
});


module.exports = {
  validateLogin,
};


