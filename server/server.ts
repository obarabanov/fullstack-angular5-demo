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
    /*
    //  tested - OK
    Feedback.find(function (err, data) {
        if (!err) {
            log.debug(`found: ${data.length}`);
            res.json(data);
            return next();
        } else {
            res.statusCode = 500;
            log.error( { err: err }, `${res.statusCode} ${err.name} '${err.message}'` );
            res.json({
                type: 'Server error, after DB call.',
                error: err
            });
            return next(err);
        }
    });
    */
    Feedback.find().
        then(data => {
            log.debug(`Feedback found: ${data.length}`);
            res.json(data);
            return next();
        })
        .catch(err => {
            log.error({ err: err }, `${res.statusCode} ${err.name} '${err.message}'`);
            return next(err);
        });

});

server.post('/api/feedback', function (req, res, next) {
    const log = req.log;
    log.debug({ body: req.body }, 'request.body:');

    let {
        hostName,
        comment,
        communication,
        atmosphere,
        valueForMoney
    } = JSON.parse(req.body);
    //} = req.body;

    let feedback = new Feedback({
        hostName,
        comment,
        communication,
        atmosphere,
        valueForMoney
    });

    /*
    //  tested - OK
    feedback.save(function (err) {
        if (!err) {
            log.info(`Feedback created with id: ${feedback.id}`);
            res.json(201, { 'data': feedback });
            return next();
        }
        //  error processing
        log.error(`${err.name} '${err.message}'`);
        //log.error({ err: err }, 'error:');
        if (err.name === 'ValidationError') {
            res.send(400, err);
            return next();
        }
        return next(err);
    });
    */

    feedback.save()
        .then(data => {
            log.info(`Feedback created with id: ${data.id}`);
            res.json(201, { 'data': data });
            return next();
        })
        .catch(err => {
            log.error(`${err.name} '${err.message}'`);
            //log.error({ err: err }, 'error:');
            if (err.name === 'ValidationError') {
                res.send(400, err);
                return next();
            }
            return next(err);
        });

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
