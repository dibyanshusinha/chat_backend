import app from './app.js';
import { logger } from './Logger/index.js';
import {PORT} from './config/keys.js';

const server = app.listen(PORT);

process.on('warning', (warning) => {
    logger.warn(warning); 
});

process.on('unhandledRejection', (err) => {
    logger.warn(err, 'UNHANDLED REJECTION WARNING');
});

process.on('uncaughtException', err => {
    logger.fatal(err, 'UNCAUGHT EXCEPTION DETECTED');
    // shutdown the server gracefully
    server.close(() => {
        process.exit(1); // then exit
    });

    setTimeout(() => {
        process.abort();
    }, 1000).unref();
    process.exit(1);
});

process.on('exit', eventcode => {
    logger.info(`PROCESS EXITED WITH CODE:${eventcode}`);
});

if (server.listening) {
    logger.info(`SERVER NOW LISTENING AT :${server.address()?.port || PORT}`);
};

export default server;

