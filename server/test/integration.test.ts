import { server } from '../server';

const supertest = require('supertest');
const expect = require('chai').expect;


describe('Server', function () {

    after(function () {
        server.close( function() {
            console.log('Server closed.');
            //process.exit();
        });
    });

    it('should be online', function (done)  {
        supertest(server)
            .get('/health')
            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.type).to.equal('application/json');
                    expect(response.body['health']).to.equal('ok');
                    done();
                }
            });
    });

    it('handle routing errors', function (done)  {
        supertest(server)
            .get('/isHealthy')
            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).equals(404);
                    const errorType = 'ResourceNotFound';
                    expect(response.body['code']).equals(errorType);
                    done();
                }
            });
    });

    it('returns Html page as root context', function (done) {
        supertest(server)
            .get(`/`)
            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.type).to.equal('text/html');
                    done();
                }
            });
    });

    it('throws validation error if partial data provided', function (done) {
        supertest(server)
            .post('/api/feedback')
            .send({
                comment: 'This is a test comment.' 
            })
            .expect(400)
            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(400);
                    done();
                }
            });
    });

    it('DB: create new feedback', function (done) {
        supertest(server)
            .post('/api/feedback')
            .send({ 
                hostName: 'John Smith',
                comment: 'This was created from test.',
                communication: 7,
                atmosphere: 8,
                valueForMoney: 9
            })
            .expect(201)
            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(201);
                    expect(response.type).to.equal('application/json');
                    done();
                }
            });
    });

    it('get all feedback from DB', function (done) {
        supertest(server)
            .get('/api/feedback')
            .expect(200)
            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.type).to.equal('application/json');
                    done();
                }
            });
    });

});