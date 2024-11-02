import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {3} characters',
    'string.max': 'Username should have at most {20} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

const data = {
  name: 'John Doe',
  phoneNumber: '+380123123123',
  email: 'john.doe@example.com',
  isFavourite: 'true',
  contactType: 'personal',
};


const validationResult = createContactSchema.validate(data, {
  abortEarly: false,
});

if (validationResult.error) {
  console.error(validationResult.error.message);
} else {
  console.log('Data is valid!');
}
