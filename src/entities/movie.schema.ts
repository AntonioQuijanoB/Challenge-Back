import Joi from 'joi';
import { type MovieCreateDto } from './movie';

export const articleCreateDtoSchema = Joi.object<MovieCreateDto>({
  title: Joi.string().required(),
  author: Joi.string().required(),
  content: Joi.string().default(''),
  isPublished: Joi.boolean().default(false),
});

export const articleUpdateDtoSchema = Joi.object<MovieCreateDto>({
  title: Joi.string(),
  author: Joi.string(),
  content: Joi.string(),
  isPublished: Joi.boolean(),
});
