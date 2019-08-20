const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');
const list = require('../playstore');

function sort() {

}

function filter(list, keyword) {
    return list.filter(item => item.Genres
        .split(';')
        .map(i => i.toLowerCase())
        .includes(keyword)    
    )
}

describe('GET /apps', () => {
    it('GET /apps should return an array', () => {
        return request(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.eql(list);
            });
    });

    it('GET /apps?genres=action should return a filtered array', () => {
        const query = {
            genres: 'action',
        };
        
        return request(app)
            .get('/apps')
            .query(query)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.eql(filter(list, 'action'));
            })
    })
});