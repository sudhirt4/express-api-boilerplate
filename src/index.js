import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import './env';
import routes from './app/routes';
import * as errorHandler from './middlewares/errorHandler';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', routes);

app.use(errorHandler.generic);
app.use(errorHandler.notAllowed);

app.listen(process.env.HTTP_PORT, () => {
  console.log(`Server started on port : ${process.env.HTTP_PORT}`);
});
