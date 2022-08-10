const Joi = require('joi');

const VALIDATE = Joi.object({
  displayName: Joi.string().min(8).required()
  .messages({
    'string.min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().required()
  .messages({
    'string.email': '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required()
  .messages({
    'string.min': '"password" length must be at least 6 characters long',
  }),
  image: Joi.string().required(),
});

const validateUser = (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const { error } = VALIDATE.validate({ displayName, email, password, image });

  if (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = validateUser;