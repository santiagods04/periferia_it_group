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

const validatePost = celebrate({
  body: Joi.object().keys({
    message: Joi.string().required().min(10).max(280)
      .messages({
        'string.min': 'El mensaje debe tener al menos 10 caracteres',
        'string.max': 'El mensaje no puede exceder los 280 caracteres',
        'any.required': 'El mensaje es obligatorio',
      }),
  })
  .unknown(false),
});

const validatePostId = celebrate({
  params: Joi.object().keys({
    postId: Joi.number().integer().positive().required(),
  }),
});


module.exports = {
  validateLogin,
  validatePost,
  validatePostId,
};


