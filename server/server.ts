import * as restify from 'restify';
import * as bunyan from 'bunyan';

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

/**
 * Request handling before routing.
 * Note that req.params will be undefined, as that's filled in after routing.
 */
server.pre(function (req, res, next) {
    const log = req.log;
    log.info(`${req.method.toUpperCase()} ${req.url}`);
    //log.debug({ headers: req.headers }, 'req.Headers:');
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
    //directory: './public',
    directory: './dist',
    file: 'index.html'
}));
//server.get(/\/public\/?.*/, restify.plugins.serveStatic({
server.get(/\/.*/, restify.plugins.serveStatic({
    //directory: __dirname, // C:\Users\alex\Documents\_repos\_tests\comeat\server\build
    directory: './dist',
    default: 'index.html'
}));

/**
 * Starting server
 */
const cfgPort = 8000; //config.get('port') || 8000;
server.listen(cfgPort, function () {
    logServer.info('%s listening at %s', server.name, server.url);
});
