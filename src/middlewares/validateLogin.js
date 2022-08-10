const Joi = require('joi');

const VALIDATE = Joi.object({
  email: Joi.string().email().required()
  .messages({
    'string.empty': 'Some required fields are missing',
    'any.required': 'Some required fields are missing',
    'string.email': 'Invalid fields',
  }),
  password: Joi.string().required()
  .messages({
    'string.empty': 'Some required fields are missing',
    'any.required': 'Some required fields are missing',
  }),
});

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = VALIDATE.validate({ email, password });

  if (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = validateLogin;