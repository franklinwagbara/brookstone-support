import 'dotenv/config';
import {App} from './app/App';
import {
  SessionController,
  UserController,
  SubjectController,
  StudentController,
  YearGroupController,
  ClassroomController,
  EnrollmentController,
  TranscriptController,
} from './controllers';
import {validateEnv} from './utils/validateEnv';

validateEnv();

const app = new App([
  new UserController(),
  new SessionController(),
  new SubjectController(),
  new StudentController(),
  new YearGroupController(),
  new ClassroomController(),
  new EnrollmentController(),
  new TranscriptController(),
]);
app.run();
