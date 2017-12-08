"use strict";
const restify = require("restify");
const bunyan = require("bunyan");
const logServer = bunyan.createLogger({
    name: 'log',
    level: 'debug',
    stream: process.stdout
});
exports.server = restify.createServer({
    name: 'REST APIs',
    log: logServer,
    version: '1.0.0'
});
exports.server.use(restify.plugins.acceptParser(exports.server.acceptable));
exports.server.use(restify.plugins.queryParser({ mapParams: true }));
exports.server.use(restify.plugins.bodyParser({ mapParams: true }));
/**
 * Request handling before routing.
 * Note that req.params will be undefined, as that's filled in after routing.
 */
exports.server.pre(function (req, res, next) {
    const log = req.log;
    log.info(`${req.method.toUpperCase()} ${req.url}`);
    //log.debug({ headers: req.headers }, 'req.Headers:');
    next();
});
// Utility endpoint.
exports.server.get('/health', function (req, res, next) {
    res.json(200, { 'health': 'ok' });
    return next();
});
exports.server.get('/api/feedback', function (req, res, next) {
    const log = req.log;
    //log.debug('get feedback list');
    //log.debug({ headers: req.headers }, 'req.Headers:');
    log.debug({ params: req.params }, 'req.params:');
    res.json(200, { 'status': 'success' });
    //return next();
});
exports.server.post('/api/feedback', function (req, res, next) {
    const log = req.log;
    log.debug({ body: req.body }, 'request.body:');
    log.debug({ params: req.params }, 'req.params:');
    res.json(200, { 'status': 'success' });
    //return next();
});
/**
 * Mapping static resources
 */
exports.server.get('/', restify.plugins.serveStatic({
    //directory: './public',
    directory: './dist',
    file: 'index.html'
}));
//server.get(/\/public\/?.*/, restify.plugins.serveStatic({
exports.server.get(/\/.*/, restify.plugins.serveStatic({
    //directory: __dirname, // C:\Users\alex\Documents\_repos\_tests\comeat\server\build
    directory: './dist',
    default: 'index.html'
}));
/**
 * Starting server
 */
const cfgPort = 8000; //config.get('port') || 8000;
exports.server.listen(cfgPort, function () {
    logServer.info('%s listening at %s', exports.server.name, exports.server.url);
});
