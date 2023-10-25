import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';

chai.use(chaiHttp);

const expect = chai.expect;

describe('API Tests', () => {
    it('should return a 200 OK response with the same schema when the request is valid', (done) => {
        chai
            .request('http://localhost:3000') // Update with your API URL
            .post('/user/JohnDoe@example.com')
            .send({ action: 'Add', amount: 150 }) // Valid action and amount
            .end((err: any, res: any) => {
                expect(res).to.have.status(200);
                expect(res.body.response).to.have.property('username');
                expect(res.body.response).to.have.property('action');
                expect(res.body.response).to.have.property('amount');
                done();
            });
    });

    it('should return a 400 Bad Request response with the same schema when the request is invalid', (done) => {
        chai
            .request('http://localhost:3000') // Update with your API URL
            .post('/user/JohnDoe@example.com')
            .send({ action: 'InvalidAction', amount: -1 }) // Invalid action and negative amount
            .end((err: any, res: any) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal('Validation error');
                expect(res.body.fields).to.be.an('array');
                done();
            });
    });

    it('should return a 404 Not Found response when the username is not "JohnDoe@example.com"', (done) => {
        chai
            .request('http://localhost:3000') // Update with your API URL
            .post('/user/InvalidUser@example.com')
            .send({ action: 'Add', amount: 100 })
            .end((err: any, res: any) => {
                expect(res).to.have.status(404);
                expect(res.body.message).to.equal('Resource not found');
                done();
            });
    });
});
