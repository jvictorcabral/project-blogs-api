const Joi = require('joi');

const VALIDATE = Joi.object({
  name: Joi.string().required()
  .messages({
    'string.empty': '"name" is required',
    'any.required': '"name" is required',
  }),
});

const validateCategory = (req, res, next) => {
  const { name } = req.body;
  const { error } = VALIDATE.validate({ name });

  if (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = validateCategory;