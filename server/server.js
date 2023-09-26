import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import dbConnection from './dbConfig/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import path from 'path';
dotenv.config();
//security packages
import helmet from 'helmet';
import router from './routes/index.js';

const __dirname = path.resolve(path.dirname(''));

const app = express();

app.use(express.static(path.join(__dirname, './views/index.html')));

const port = process.env.PORT || 8080;

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