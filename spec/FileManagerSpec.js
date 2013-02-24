/*global describe:true beforeEach:true it:true expect:true
FileManager:true

*/
describe("FileManager", function() {

  it('shoud run', function () {
    expect(window.fileManager).toBeTruthy();
  })
  
  it('saves and reads', function(){

    runs(function() {
      result = '';
      writeFile(function(){
        readFile(function(res) {
          result = res;
        });
      })
    });
    
    waitsFor(function() {
      return result;
    }, "The Value should be incremented", 750);
    
    runs(function() {
      expect(result).toBe('Lorem Ipsum');
    });

  })
});