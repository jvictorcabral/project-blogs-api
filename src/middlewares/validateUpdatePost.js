const Joi = require('joi');

const requiredError = 'Some required fields are missing';

const VALIDATE = Joi.object({
  title: Joi.string().required()
  .messages({
    'string.empty': requiredError,
    'any.required': requiredError,
  }),
  content: Joi.string().required()
  .messages({
    'string.empty': requiredError,
    'any.required': requiredError,
  }),
});

const validateUpdatePost = (req, res, next) => {
  const { title, content } = req.body;
  const { error } = VALIDATE.validate({ title, content });

  if (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = validateUpdatePost;