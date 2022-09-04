import 'dotenv/config';
import {App} from './app/App';
import {UserController} from './controllers';
import {validateEnv} from './utils/validateEnv';

validateEnv();

const app = new App([new UserController()]);
app.run();
