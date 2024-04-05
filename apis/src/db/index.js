import mongoose from 'mongoose';
import { DB_URI } from '../keys.js';
import {logger} from '../Logger/index.js';

const db = async () => {
    try {
        const connection = await mongoose.connect(DB_URI);
        logger.info(`DB connected !! DB HOST: ${connection.connection.host}`);
    } catch (err) {
        logger.alert(err, 'DB connection FAILED');
        throw err;
    }
};

export default db;