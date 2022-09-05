import 'dotenv/config';
import {App} from './app/App';
import {
  SessionController,
  UserController,
  SubjectController,
} from './controllers';
import {validateEnv} from './utils/validateEnv';

validateEnv();

const app = new App([
  new UserController(),
  new SessionController(),
  new SubjectController(),
]);
app.run();
