import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import dbConnection from './dbConfig/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
dotenv.config();
//security packages
import helmet from 'helmet';
import router from './routes/index.js';

const app = express();
const port = process.env.PORT || 8800;

dbConnection();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended : true }));

app.use(morgan('dev'));
app.use(router)
app.use(errorMiddleware)
app.listen(port, () => {{
    console.log(`Server is running on port: ${port}`);
}})