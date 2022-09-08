import Joi from 'joi';
import {ITranscript} from '../interfaces';

export const validateTranscriptUpdate = (transcript: ITranscript) => {
  const schema = Joi.object<ITranscript>({
    student: Joi.string(),
    subject: Joi.string(),
    session: Joi.string(),
    classroom: Joi.string(),
    teacher: Joi.string(),
    week_1: Joi.number().allow(null).allow('').allow(' '),
    week_2: Joi.number().allow(null).allow('').allow(' '),
    week_3: Joi.number().allow(null).allow('').allow(' '),
    week_4: Joi.number().allow(null).allow('').allow(' '),
    half_term_exam: Joi.number().allow(null).allow('').allow(' '),
    ca_1: Joi.number().allow(null).allow('').allow(' '),
    ccm: Joi.number().allow(null).allow('').allow(' '),
    week_5: Joi.number().allow(null).allow('').allow(' '),
    week_6: Joi.number().allow(null).allow('').allow(' '),
    week_7: Joi.number().allow(null).allow('').allow(' '),
    week_8: Joi.number().allow(null).allow('').allow(' '),
    ca_2: Joi.number().allow(null).allow('').allow(' '),
    final_exam: Joi.number().allow(null).allow('').allow(' '),
    total: Joi.number().allow(null).allow('').allow(' '),
    grade: Joi.string().allow(null).allow('').allow(' '),
    gpa: Joi.number().allow(null).allow('').allow(' '),
    comment: Joi.string().allow(null).allow('').allow(' '),
  });

  return schema.validate(transcript, {abortEarly: false});
};
