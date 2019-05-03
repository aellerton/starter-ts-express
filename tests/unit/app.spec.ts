/* tslint:disable:no-trailing-whitespace */
import app from '@/app'
import logger, {expressLogger} from '@/logger'
import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import winston from 'winston'

chai.use(chaiHttp)
chai.should()
// winston.remove(winston.transports.Console)
// logger.remove(winston.transports.Console)
logger.transports.forEach((out) => out.silent = true)

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
describe('root endpoint', () => {
  it('non-JSON works with no parameters', (done) => {
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
  it('non-JSON works with name parameter', (done) => {
    chai.request(app)
      .get('/?name=Bob')
      .end((err, res) => {
        res.should.have.status(200)
        res.text.should.match(/^Hello Bob at/)
        done()
      })
  })
  it('non-JSON defaults correctly with a whitespace name parameter', (done) => {
    chai.request(app)
      .get('/?name=%20')
      .end((err, res) => {
        res.should.have.status(200)
        res.text.should.match(/^Hello world at/)
        done()
      })
  })
  it('non-JSON defaults correctly with a missing name parameter', (done) => {
    chai.request(app)
      .get('/?name=')
      .end((err, res) => {
        res.should.have.status(200)
        res.text.should.match(/^Hello world at/)
        done()
      })
  })
  it('non-JSON works in simple case', (done) => {
    chai.request(app)
      .get('/')
      .accept('json')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.name.should.equal('world')
        res.body.timestamp.should.not.be.empty
        res.body.message.should.match(/^Hello world at/)
        done()
      })
  })
  it('non-JSON works if name passed as parameter', (done) => {
    chai.request(app)
      .get('/?name=Lauren')
      .accept('json')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.name.should.equal('Lauren')
        res.body.timestamp.should.not.be.empty
        res.body.message.should.match(/^Hello Lauren at/)
        done()
      })
  })
})

describe('contact endpoint', () => {
  it('should fail with no parameters', (done) => {
    chai.request(app)
      .post('/contact')
      .type('json')
      .send({})
      .end((err, res) => {
        res.should.have.status(200)
        expect(res.body.ok).to.equal(false)
        expect(res.body.error.length).to.equal(2)
        done()
      })
  })
})

describe('invalid URI', () => {
  it('should 404', (done) => {
    chai.request(app)
      .get('/missing')
      .end((err, res) => {
        res.should.have.status(404)
        done()
      })
  })
})
