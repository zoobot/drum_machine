mocha.setup('bdd');
var assert = chai.assert;



describe('Array 4 to floor', function() {
  it('should return -1 when the value is not present', function() {
    assert.equal([1,2,3].indexOf(4), -1)
  });
  it('should return 1 when the value is present', function() {
      assert.equal([1,5,9].indexOf(1), 0);
  });
});