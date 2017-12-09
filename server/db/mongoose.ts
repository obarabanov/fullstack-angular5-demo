import * as mongoose from 'mongoose';
import { config } from '../config';


export function connect (logger: any = console) {

    const url = config.get('db:url') || 'mongodb://localhost/feedback-demo-db';
    logger.debug(`connecting to MongoDB using url: ${url}`);
        
    mongoose.connect( url, { useMongoClient: true } );
    const conn = mongoose.connection;
    conn.once('open', function () {
        logger.info(`Connected to MongoDB at: ${conn['host']}:${conn['port']}/${conn['name']}`);
    });
    
    conn.on('error', function (err) {
        logger.error('MongoDB connection error:', err.message);
    });
        
}
