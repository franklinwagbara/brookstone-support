import 'dotenv/config';
import {App} from './app/App';
import {UserController} from './controllers';

const app = new App([new UserController()]);
app.run();
