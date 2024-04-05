import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { loggingMiddleware } from './Logger/index.js';
import routes from './routes/index.js';

const app = express();

app.get('/', (req, res) => {
    return res.send({ message: 'HEALTH CHECK OK !' });
});

app.get('/favicon.ico', (req, res) => {
    return res.status(200).send();
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());
app.use(helmet());
app.use(loggingMiddleware);

app.use('/chatservice', routes);

app.use('*', (req, res) => {
    return res.status(500).send({ message: 'INTERNAL SERVER ERROR' });
});


export default app;
