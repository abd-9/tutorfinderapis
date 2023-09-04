import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { LinkRoute } from '@routes/links.route';
import { PaymentRoute } from '@routes/payments.route';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new LinkRoute(), new PaymentRoute()]);

app.listen();
