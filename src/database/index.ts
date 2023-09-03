import { DB_HOST, DB_PORT, DB_DATABASE, DB_CONNECTION } from '@config';

export const dbConnection = {
  url: DB_CONNECTION || `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
