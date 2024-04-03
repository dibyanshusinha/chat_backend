const LOG_LEVEL = process.env.LOG_LEVEL || 'trace';
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const LOGS_DIR = process.env.LOGS_DIR || './logs';
const LOG_DUPLICATION = process.env.LOG_DUPLICATION || false;

export { LOG_LEVEL, NODE_ENV, PORT, LOGS_DIR, LOG_DUPLICATION };