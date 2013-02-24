/*global describe:true beforeEach:true it:true expect:true
FileManager:true

*/
describe("Player", function() {

  it('shoud run', function () {
    expect(writeAndRead).toBeTruthy();
  })
  
  runs(function() {
      flag = false;
      value = 0;

      setTimeout(function() {
        flag = true;
      }, 500);
    });
    
    waitsFor(function() {
      value++;
      return flag;
    }, "The Value should be incremented", 750);
    
    runs(function() {
      expect(value).toBeGreaterThan(0);
    });
});