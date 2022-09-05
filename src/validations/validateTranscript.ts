import Joi from 'joi';
import {ITranscript} from '../interfaces';

export const validateTranscript = (transcript: ITranscript) => {
  const schema = Joi.object<ITranscript>({
    student: Joi.string().required(),
    subject: Joi.string().required(),
    session: Joi.string().required(),
    classroom: Joi.string().required(),
    teacher: Joi.string().required(),
    week_1: Joi.number(),
    week_2: Joi.number(),
    week_3: Joi.number(),
    week_4: Joi.number(),
    half_term_exam: Joi.number(),
    ca_1: Joi.number(),
    week_5: Joi.number(),
    week_6: Joi.number(),
    week_7: Joi.number(),
    week_8: Joi.number(),
    ca_2: Joi.number(),
    final_exam: Joi.number(),
    total: Joi.number(),
    grade: Joi.string(),
    gpa: Joi.number(),
    comment: Joi.string(),
  });

  return schema.validate(transcript, {abortEarly: false});
};
