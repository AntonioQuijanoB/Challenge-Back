import Joi from 'joi';
import { type ArticleCreateDto } from './article';

export const articleCreateDtoSchema = Joi.object<ArticleCreateDto>({
  title: Joi.string().required(),
  author: Joi.string().required(),
  content: Joi.string().default(''),
  isPublished: Joi.boolean().default(false),
});

export const articleUpdateDtoSchema = Joi.object<ArticleCreateDto>({
  title: Joi.string(),
  author: Joi.string(),
  content: Joi.string(),
  isPublished: Joi.boolean(),
});
