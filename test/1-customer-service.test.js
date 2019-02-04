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

describe('DELETE /cservice/nextcustomer', () => {

    it('should respond with next customer with number c1', (done) => {
        chai.request(server)
            .delete('/cservice/nextcustomer')
            .end((err, res) => {
                // there should be no errors
                should.not.exist(err);
                // there should be a 200 status code
                res.status.should.equal(200);
                // the response should be JSON
                res.type.should.equal('application/json');
                // the serviceName property of nextCustomer object in response body 
                //should equal to 'open_account'
                res.body.nextCustomer.serviceName.should.equal('open_account');
                // the customerNumber property of nextCustomer object in response body 
                //should equal to 'c1'
                res.body.nextCustomer.customerNumber.should.equal('c1');
                done();
            });
    });
});

describe('GET /cservice/showqueue', () => {

    it('should respond with all queued numbers', (done) => {
        chai.request(server)
            .get('/cservice/showqueue')
            .end((err, res) => {
                // there should be no errors
                should.not.exist(err);
                // there should be a 200 status code
                res.status.should.equal(200);
                // the response should be JSON
                res.type.should.equal('application/json');
                // the queuedCustomers object in response body 
                //should be an array with 1 object
                res.body.queuedCustomers.length.should.equal(1);
                // the customerNumber property of object in queuedCustomers
                // should equal to 'c2'
                res.body.queuedCustomers[0].customerNumber.should.equal('c2');
                done();
            });
    });
});