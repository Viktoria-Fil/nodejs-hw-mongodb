import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20),
  contactType: Joi.string().valid('work', 'home', 'personal').min(3).max(20).required(),
  isFavourite: Joi.boolean(),
  onDuty: Joi.boolean(),
  photo: Joi.string().optional(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional().allow(''),
  phoneNumber: Joi.string().min(3).max(20).optional().allow(''),
  email: Joi.string().min(3).max(20).optional().allow(''),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').optional().allow(''),
  onDuty: Joi.boolean().optional(),
  photo: Joi.string().optional().allow(''),
});


// PATCH updatecontactSchema: no required fields