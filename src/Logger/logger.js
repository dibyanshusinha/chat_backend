import pino from 'pino';
import { LOG_LEVEL, NODE_ENV, LOGS_DIR, LOG_DUPLICATION } from '../config/keys.js';

// Anything that devs want to be logged,
// Critical failures External API or service failures impacting the application's functionality (after automated recovery //attempts have failed).
//    info: 30, a record of the normal operation of the system.
//    error: 50,   Failure to create or update a resource in the system. An unexpected error, such as the failure to decode a JSON object. Failure to create or update a resource in the system.
//    debug: 20,  for specific needs such as sql queries and response rows which can help in fututre optimisation.
const levels = {
    fatal: 60,
    alert: 55,
    error: 50,
    warn: 40,
    success: 35,
    info: 30,
    debug: 20,
    trace: 10
};

const createSonicBoom = (dest) =>
    pino.destination({ dest: dest, append: true, sync: true, mkdir: true });


const streams = [
    { level: 'info', stream: createSonicBoom(`${LOGS_DIR}/info.log`) },
    { level: 'warn', stream: createSonicBoom(`${LOGS_DIR}/error.log`) },
    { level: 'error', stream: createSonicBoom(`${LOGS_DIR}/error.log`) },
    { level: 'success', stream: createSonicBoom(`${LOGS_DIR}/app.log`) },
    { level: 'alert', stream: createSonicBoom(`${LOGS_DIR}/alert.log`) },
    { level: 'fatal', stream: createSonicBoom(`${LOGS_DIR}/alert.log`) },
    { level: 'debug', stream: createSonicBoom(`${LOGS_DIR}/debug.log`) },
    {level: 'trace', stream: process.stdout}
];

const formatters = {
    level: label => {
        return { level: label.toUpperCase() };
    },
    bindings: (bindings) => {
        return { env: NODE_ENV, pid: bindings.pid, hostname: bindings.hostname };
    }
};

const serializers = {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
    err: pino.stdSerializers.err,
};

const loggerOptions = {
    formatters,
    level: LOG_LEVEL || 'info',
    customLevels: levels,
    useOnlyCustomLevels: true,
    timestamp: pino.stdTimeFunctions.isoTime,
    serializers
};

const logger = pino(loggerOptions, pino.multistream(streams, { levels, dedupe: LOG_DUPLICATION } ));

export default logger;