import Joi from 'joi';
import {IBehaviour} from '../interfaces';

export const validateBehaviour = (classroomEnrollment: IBehaviour) => {
  const schema = Joi.object<IBehaviour>({
    student: Joi.string().required(),
    session: Joi.string().required(),
    week: Joi.string(),
    active_participation_and_composure_during_lessons: Joi.string().allow(''),
    ownership_of_learning: Joi.string().allow(''),
    punctuality_and_attendance_to_lessons: Joi.string().allow(''),
    motivation_and_value_for_academic_success: Joi.string().allow(''),
    self_confidence_towards_academic_work: Joi.string().allow(''),
    effective_use_of_study_skills: Joi.string().allow(''),
    Assessed_extended_learning: Joi.string().allow(''),
    completion_of_extended_learning: Joi.string().allow(''),
    organizational_skills: Joi.string().allow(''),
    obedience_to_pastoral_rules_and_regulations: Joi.string().allow(''),
    cooperation_with_boarding_parents: Joi.string().allow(''),
    ability_to_concentrate_during_prep: Joi.string().allow(''),
    punctuality: Joi.string().allow(''),
  });

  return schema.validate(classroomEnrollment, {abortEarly: false});
};
