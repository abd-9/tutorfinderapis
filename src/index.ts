import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { LinkRoute } from '@routes/links.route';
import { PaymentRoute } from '@routes/payments.route';
import { TutorRoute } from '@routes/tutors1.route';
import { StudentRoute } from './routes/students.route';
import { RequestRoute } from './routes/requests.route';

ValidateEnv();
const app = new App([
  new UserRoute(),
  new AuthRoute(),
  new TutorRoute(),
  new LinkRoute(),
  new PaymentRoute(),
  new StudentRoute(),
  new RequestRoute(),
]);

process.once('SIGUSR2', function () {
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', function () {
  process.kill(process.pid, 'SIGINT');
});
app.listen();
