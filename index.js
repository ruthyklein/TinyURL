import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import connectDB from './tinyUrl_DB.js';
import UserRouter from './routers/userRouter.js';
import LinkRouter from './routers/linkRouter.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/users', UserRouter);
app.use('/links', LinkRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: 'An unexpected error occurred' });
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
