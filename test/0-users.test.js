//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Load Service model
const Service = require('../api/models/service');

const server = require('../server');

//Require the dev-dependencies
const chaiHttp = require('chai-http');
const chai = require('chai');
const should = chai.should();

chai.use(chaiHttp);

describe('POST /users/book', () => {
    //Empty db before test
    before((done) => {
        Service.deleteMany({}, (err) => { 
           done();           
        });        
    });

    it('should respond with user number c1', (done) => {
        chai.request(server)
        .post('/users/book')
        .send({
            serviceName: 'open_account'
        })
        .end((err, res) => {
            // there should be no errors
            should.not.exist(err);
            // there should be a 201 status code
            res.status.should.equal(201);
            // the response should be JSON
            res.type.should.equal('application/json');
            // the JSON response body should have a
            // key-value pair of {"message": "your number is c1"}
            res.body.message.should.eql('your number is c1');
            done();
        });
    });

    it('should respond with user number c2', (done) => {
        chai.request(server)
        .post('/users/book')
        .send({
            serviceName: 'close_account'
        })
        .end((err, res) => {
            // there should be no errors
            should.not.exist(err);
            // there should be a 201 status code
            res.status.should.equal(201);
            // the response should be JSON
            res.type.should.equal('application/json');
            // the JSON response body should have a
            // key-value pair of {"message": "your number is c2"}
            res.body.message.should.eql('your number is c2');
            done();
        });
    });

    it('should respond with user number t1', (done) => {
        chai.request(server)
        .post('/users/book')
        .send({
            serviceName: 'deposit'
        })
        .end((err, res) => {
            // there should be no errors
            should.not.exist(err);
            // there should be a 201 status code
            res.status.should.equal(201);
            // the response should be JSON
            res.type.should.equal('application/json');
            // the JSON response body should have a
            // key-value pair of {"message": "your number is t1"}
            res.body.message.should.eql('your number is t1');
            done();
        });
    });

    it('should respond with user number t2', (done) => {
        chai.request(server)
        .post('/users/book')
        .send({
            serviceName: 'withdraw'
        })
        .end((err, res) => {
            // there should be no errors
            should.not.exist(err);
            // there should be a 201 status code
            res.status.should.equal(201);
            // the response should be JSON
            res.type.should.equal('application/json');
            // the JSON response body should have a
            // key-value pair of {"message": "your number is t2"}
            res.body.message.should.eql('your number is t2');
            done();
        });
    });
});