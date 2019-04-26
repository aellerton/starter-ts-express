import app from '@/app'
import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
chai.should()

// These are here just to prove tests without an import work
describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      expect([1, 2, 3].indexOf(4)).to.equal(-1)
    })
    it('should return 0 for first element', () => {
      expect([1, 2, 3].indexOf(1)).to.equal(0)
    })
    it('should return 1 for second element', () => {
      expect([1, 2, 3].indexOf(2)).to.equal(1)
    })
  })
})

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
  describe('GET /missing', () => {
    it('should 404', (done) => {
      chai.request(app)
        .get('/missing')
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })
})
