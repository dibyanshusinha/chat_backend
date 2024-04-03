import { randomUUID } from 'node:crypto';
import parentLogger from './logger.js';

const logheadername = 'Correlation-ID';

const genReqId = (req, res) => {
    const existingID = req.id ?? req.headers[logheadername];
    if (existingID) return existingID;
    const id = randomUUID();
    res.setHeader(logheadername, id);
    return id;
};

const onResFinished = (res, logger, err) => {
    const log = logger;
    const responseTime = (process.hrtime.bigint() - res.startTime) / BigInt(1000000);
    const req = res.reqObject;

    if (err || res.err || res.statusCode >= 500) {
        const error = err || res.err || new Error(`failed with status code ${res.statusCode}`);
        log.error({
            'type': 'RESPONSE ERROR', 
            'res': res,
            'err': error,
            'responseTime': `${responseTime}ms`,
        });
        
    } else {
        log.success({
            'type': !req.readableAborted && res.writableEnded ? 'REQUEST COMPLETED' : 'REQUEST ABORTED',
            'res': res,
            'responseTime': `${responseTime}ms`,
        });
    }
};

const loggingMiddleware = (req, res, next) => {
    const start = process.hrtime.bigint();

    req.id = req.id || genReqId(req, res);

    const logger = parentLogger.child({ 'reqId': req.id });

    res.log = res.log || logger;
    req.log = req.log || logger;

    res.startTime = res.startTime || start;
    res.reqObject = req;

    logger.success({ type: `${req.method} HTTP REQ RECEIVED`, 'req': req });

    const onResponseComplete = (err) => {
        res.removeListener('close', onResponseComplete);
        res.removeListener('finish', onResponseComplete);
        res.removeListener('error', onResponseComplete);
        return onResFinished(res, logger, err);
    };

    res.on('close', onResponseComplete);
    res.on('finish', onResponseComplete);
    res.on('error', onResponseComplete);

    next();
};

export default loggingMiddleware;