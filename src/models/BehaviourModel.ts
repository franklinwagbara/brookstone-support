import {Schema, model} from 'mongoose';
import {IBehaviour} from '../interfaces';

const BehaviourSchema = new Schema<IBehaviour>({
  student: {type: Schema.Types.ObjectId, ref: 'Student'},
  session: {type: Schema.Types.ObjectId, ref: 'Session'},
  week: {type: String, required: false},
  active_participation_and_composure_during_lessons: {
    type: Number,
    required: false,
    default: 0,
  },
  ownership_of_learning: {type: Number, required: false, default: 0},
  punctuality_and_attendance_to_lessons: {
    type: Number,
    required: false,
    default: 0,
  },
  motivation_and_value_for_academic_success: {
    type: Number,
    required: false,
    default: 0,
  },
  self_confidence_towards_academic_work: {
    type: Number,
    required: false,
    default: 0,
  },
  effective_use_of_study_skills: {type: Number, required: false, default: 0},
  Assessed_extended_learning: {type: Number, required: false, default: 0},
  completion_of_extended_learning: {type: Number, required: false, default: 0},
  organizational_skills: {type: Number, required: false, default: 0},
  obedience_to_pastoral_rules_and_regulations: {
    type: Number,
    required: false,
    default: 0,
  },
  cooperation_with_support_teachers: {
    type: Number,
    required: false,
    default: 0,
  },
  cooperation_with_boarding_parents: {
    type: Number,
    required: false,
    default: 0,
  },
  ability_to_concentrate_during_prep: {
    type: Number,
    required: false,
    default: 0,
  },
  punctuality: {type: Number, required: false, default: 0},
});

export const BehaviourModel = model<IBehaviour>('Behaviour', BehaviourSchema);
