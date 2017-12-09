import * as restify from 'restify';
import * as bunyan from 'bunyan';
import { config } from './config';
import { connect } from './db/mongoose';
import Feedback from './db/Feedback';


const logServer = bunyan.createLogger({
    name: 'log',
    level: 'debug',
    stream: process.stdout
});

export const server = restify.createServer({
    name: 'REST APIs',
    log: logServer,
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.bodyParser({ mapParams: true }));

const dbConnection = connect(server.log);

/**
 * Request handling before routing.
 * Note that req.params will be undefined, as that's filled in after routing.
 */
server.pre(function (req, res, next) {
    const log = req.log;
    log.info(`${req.method.toUpperCase()} ${req.url}`);
    next();
});

// Utility endpoint.
server.get('/health', function (req, res, next) {
    res.json(200, { 'health': 'ok' });
    return next();
});

server.get('/api/feedback', function (req, res, next) {
    const log = req.log;
    //log.debug('get feedback list');
    //log.debug({ headers: req.headers }, 'req.Headers:');
    log.debug({ params: req.params }, 'req.params:');
    
    res.json(200, { 'status': 'success' });
    //return next();
});

server.post('/api/feedback', function (req, res, next) {
    const log = req.log;
    log.debug({ body: req.body }, 'request.body:');
    log.debug({ params: req.params }, 'req.params:');
    
    res.json(200, { 'status': 'success' });
    //return next();
});

/**
 * Mapping static resources
 */
server.get('/', restify.plugins.serveStatic({
    directory: './dist',
    file: 'index.html'
}));
server.get(/\/.*/, restify.plugins.serveStatic({
    directory: './dist',
    default: 'index.html'
}));

/**
 * Starting server
 */
const cfgPort = config.get('server:port') || 8000;
server.listen(cfgPort, function () {
    logServer.info('%s listening at %s', server.name, server.url);
});
