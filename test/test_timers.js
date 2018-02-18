mocha.setup('bdd');
var assert = chai.assert;

describe('bpm', function() {
  it('should be a specific bpm number of 128', function() {
    assert.equal(timers.bpm, 128)
  });
});

describe('four to floor', function() {
  it('kick should be on 4', function() {
    assert.equal(timers.four_to_floor_time, 4)
  });
});

describe('tempoConversion', function() {
  it('should return milliseconds: 235', function() {
    assert.equal(timers.tempoConversion(128, 2), 235)
  });
});