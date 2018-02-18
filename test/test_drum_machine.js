mocha.setup('bdd');
var assert = chai.assert;

console.log(drums)
describe('drum pattern length', function() {
  it('it should be as long as step', function() {
    assert.equal(drums.kick.pattern.length, drums.kick.steps);
  });
});


// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1,2,3].indexOf(4), -1)
//     })
//   })
// })


// beforeEach(async function() {
//   await db.clear();
//   await db.save([tobi, loki, jane]);
// });

// describe('#find()', function() {
//   it('responds with matching records', async function() {
//     const users = await db.find({ type: 'User' });
//     users.should.have.length(3);
//   });
// });


// beforeEach(function() {
//   // beforeEach hook
// });


// describe('test suite', function () {
//   beforeEach(function() { /*...*/ });
//   afterEach(function() { /*...*/ });

//   before(function() { /*...*/ });
//   after(function() { /*...*/ });

//   it('a basic test', function() {
//     /*...*/ });

//   it('a test with a promise', function() {
//     return somePromiseObject; });

//   it('an asynchronous test', function(next) {
//     if (success) { next(); } else { next(error); }
//   });

//   xit('use "xit" for pending tests', function() {
//     /*...*/ });
// });