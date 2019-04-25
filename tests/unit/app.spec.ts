import { expect } from 'chai';

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
