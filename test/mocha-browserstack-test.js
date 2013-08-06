describe('Test example', function () {
  function add(a, b) {
    return a + b;
  }

  function mul(a, b) {
    return a / b;
  }

  it('should add two numbers', function () {
    expect(add(1, 2)).to.eql(3);
  });

  it('should multiply two numbers', function () {
    expect(mul(2, 2)).to.eql(4);
  });
});
