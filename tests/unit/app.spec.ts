import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app'; // The "@/app" syntax doesn't work

chai.use(chaiHttp);
chai.should();

// These are here just to prove tests without an import work
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      expect([1, 2, 3].indexOf(4)).to.equal(-1);
    });
    it('should return 0 for first element', function() {
      expect([1, 2, 3].indexOf(1)).to.equal(0);
    });
    it('should return 1 for second element', function() {
      expect([1, 2, 3].indexOf(2)).to.equal(1);
    });
  });
});

// This proves that the API defined in the other module can be tested
describe('app api', () => {
  describe('GET /', () => {
    it('should work', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200)
          res.text.should.match(/^Hello world at/)
          // res.body.should.be.a('object')
          // res.body.should.equal('foo')
          done()
        })
    })
  })
})