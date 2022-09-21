import Joi from 'joi';
import {IBehaviour} from '../interfaces';

export const validateBehaviour = (classroomEnrollment: IBehaviour) => {
  const schema = Joi.object<IBehaviour>({
    student: Joi.string().required(),
    session: Joi.string().required(),
    week: Joi.string(),
    active_participation_and_composure_during_lessons: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .allow(''),
    ownership_of_learning: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .allow(''),
    punctuality_and_attendance_to_lessons: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .allow(''),
    motivation_and_value_for_academic_success: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .allow(''),
    self_confidence_towards_academic_work: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .allow(''),
    effective_use_of_study_skills: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .allow(''),
    Assessed_extended_learning: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .allow(''),
    completion_of_extended_learning: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .allow(''),
    organizational_skills: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .allow(''),
    obedience_to_pastoral_rules_and_regulations: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .allow(''),
    cooperation_with_support_teachers: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .allow(''),
    cooperation_with_boarding_parents: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .allow(''),
    ability_to_concentrate_during_prep: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .allow(''),
    punctuality: Joi.alternatives().try(Joi.string(), Joi.number()).allow(''),
  });

  return schema.validate(classroomEnrollment, {abortEarly: false});
};
