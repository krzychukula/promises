describe("Player", function() {
  var fileManager;

  beforeEach(function() {
    fileManager = new FileManager();
  });

  it('shoud run', function () {
    expect(fileManager).toBeTruthy();
  })
});