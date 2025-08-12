import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).max(30),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').min(3).max(30).required(),
  onDuty: Joi.boolean(),
});

export const updatecontactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  phoneNumber: Joi.string().min(3).max(30),
  email: Joi.string().min(3).max(30),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').min(3).max(30),
  onDuty: Joi.boolean(),
});