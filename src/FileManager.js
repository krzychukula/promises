// Note: The file system has been prefixed as of Google Chrome 12:
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

(function(window){

  function errorHandler(e) {
        var msg = '';
      
        switch (e.code) {
          case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
          case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
          case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
          case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
          case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
          default:
            msg = 'Unknown Error';
            break;
        };
      
        throw new Error('Error: ' + msg);
      }
      
  var readFileFromFs = function(fs, success, error){
       fs.root.getFile('log.txt', {}, function(fileEntry) {
      
          // Get a File object representing the file,
          // then use FileReader to read its contents.
          fileEntry.file(function(file) {
             var reader = new FileReader();
      
             reader.onloadend = function(e) {
               var txtArea = document.createElement('textarea');
               txtArea.value = this.result;
               document.body.appendChild(txtArea);

               success(this.result);
             };
      
             reader.readAsText(file);
          }, errorHandler);
      
        }, errorHandler);
  }

  var writeFileToFs = function(fs, callback){
   
        fs.root.getFile('log.txt', {create: true}, function(fileEntry) {
    
        // Create a FileWriter object for our FileEntry (log.txt).
        fileEntry.createWriter(function(fileWriter) {
    
          fileWriter.onwriteend = function(e) {
            console.log('Write completed.');
            
            callback(fs);
           
            
          };
    
          fileWriter.onerror = function(e) {
            console.log('Write failed: ' + e.toString());
          };
    
          // Create a new Blob and write it to log.txt.
          var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
    
          fileWriter.write(blob);
    
        }, errorHandler);
    
      }, errorHandler);

  }

  writeFile = function(callback){
    initFs(function(fs){
      writeFileToFs(fs, callback);
    })
  } 

  readFile = function(callback){
    initFs(function(fs){
      readFileFromFs(fs, callback);
    })
  }    

  var initFs = function(callback){
    window.requestFileSystem(window.TEMPORARY, 5*1024*1024 /*5MB*/, callback, errorHandler);
  }

  window.fileManager = {
    readFile: readFile,
    writeFile: writeFile
  };


}(window))


