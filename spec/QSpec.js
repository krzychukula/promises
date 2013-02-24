/*global describe:true beforeEach:true it:true expect:true
Q:true

*/
describe("Q", function() {

	function testPromisesError(fun, text){
		var error = '';
	  	Q.onerror = function(e){
	  		error = e;
	  		console.log('q.onerror', e);
	  		return false;
	  	}
	  	try{
	  		runs(fun);
	  	}catch(e){
	  		console.log('try catch', e);
	  		error = e;
	  	}
	    
	    waitsFor(function() {
	      return error;
	    }, "should catch error", 750);
	    
	    runs(function() {
	      expect(error).toBe('Uncaught Error: '+text);
	    });
	}

  it('shoud throw', function () {
  	var test1 = function(){
  		return Q.fcall(function(){
  			throw new Error('test1');
  		});
  	}
    expect(test1).not.toThrow();
  })

  it('shoud not throw', function () {
  	var text = 'test2';
  	var test2 = function(){
  		return Q.fcall(function(){
  			throw new Error(text);
  		}).done();
  	}

  	testPromisesError(test2, text);
  	
  })

  it('shoud throw', function () {
  	var text = 'test2';
  	var test3 = function(){
  		return Q.fcall(function(){
  			throw new Error(text);
  		});
  	}
    testPromisesError(test3, text);
  })

});