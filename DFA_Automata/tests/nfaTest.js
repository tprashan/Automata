var assert = require('chai').assert;
var nfaGenerator = require('../src/nfa_generator')


describe("NFA_generator ",function (){
	describe('a language that end with zero zero', function () {
	  	var touples = {
	  		setOfState : ["q1","q2","q3"], 
	  		setOfAlphabet : [0,1],
	  		transitionFunction : {
	  			"q1" : {
	  					'0' : ["q1","q2"],
	  					'1' : ["q1"]
	  				},
	  			"q2" : {
	  					'0' :["q3"]
	  				},
	  			"q3" : { 
	  				}		
	  		},
	  		initialState : ["q1"],
	  		finalState : ["q3"]

	  	};

	  	var nfaStructure = nfaGenerator.generateNFA(touples);

	  	it('The NFA of 1001201 should return false', function () {    
	        var getValidationOfString = nfaStructure("1001201");
	        assert.isFalse(getValidationOfString);
	    });

	    it('The NFA of 10a1201 should return false', function () {    
	        var getValidationOfString = nfaStructure("10a1201");
	        assert.isFalse(getValidationOfString);
	    });

	    it('The NFA of 010100 should return true', function () {    
	        var getValidationOfString = nfaStructure("010100");
	        assert.isTrue(getValidationOfString);
	    });

	    it('The NFA of 00 should return true', function () {    
	        var getValidationOfString = nfaStructure("00");
	        assert.isTrue(getValidationOfString);
	    });

	    it('The NFA of 010110110011 should return false', function () {    
	        var getValidationOfString = nfaStructure("010110110011");
	        assert.isFalse(getValidationOfString);
	    });

	    it('The NFA of 1001 should return false', function () {    
	        var getValidationOfString = nfaStructure("1001");
	        assert.isFalse(getValidationOfString);
	    });

	    it('The NFA of 101010010 should return false', function () {    
	        var getValidationOfString = nfaStructure("101010010");
	        assert.isFalse(getValidationOfString);
	    });

	    it('The NFA of 111100000000000 should return true', function () {    
	        var getValidationOfString = nfaStructure("111100000000000");
	        assert.isTrue(getValidationOfString);
	    });

	    it('The NFA of 00000000000001 should return false', function () {    
	        var getValidationOfString = nfaStructure("00000000000001");
	        assert.isFalse(getValidationOfString);
	    });

	});

	describe('The language {w| w contains the substring 0101}', function () {
	  	var touples = {
	  		setOfState : ["q1","q2","q3","q4","q5"], 
	  		setOfAlphabet : [0,1],
	  		transitionFunction : {
	  			"q1" : {
	  					'0' : ["q1","q2"],
	  					'1' : ["q1"]
	  				},
	  			"q2" : {
	  					'1' :["q3"]
	  				},
	  			"q3" : { 
	  					'0' : ["q4"],
	  				},
	  			"q4" : { 
	  					'1' : ["q5"]
	  				},
	  			"q5" : { 
	  					'0' : ["q5"],
	  					'1' : ["q5"]
	  				}					
	  		},
	  		initialState : ["q1"],
	  		finalState : ["q5"]

	  	};

	  	var nfaStructure = nfaGenerator.generateNFA(touples);

	    it('The NFA of 010100 should return true', function () {    
	        var getValidationOfString = nfaStructure("010100");
	        assert.isTrue(getValidationOfString);
	    });

	    it('The NFA of 00 should return false', function () {    
	        var getValidationOfString = nfaStructure("00");
	        assert.isFalse(getValidationOfString);
	    });

	    it('The NFA of 1001 should return false', function () {    
	        var getValidationOfString = nfaStructure("1001");
	        assert.isFalse(getValidationOfString);
	    });

	    it('The NFA of 101010010 should return true', function () {    
	        var getValidationOfString = nfaStructure("101010010");
	        assert.isTrue(getValidationOfString);
	    });

	    it('The NFA of 111100000000000 should return false', function () {    
	        var getValidationOfString = nfaStructure("111100000000000");
	        assert.isFalse(getValidationOfString);
	    });

	    it('The NFA of 010000000000001 should return false', function () {    
	        var getValidationOfString = nfaStructure("010000000000001");
	        assert.isFalse(getValidationOfString);
	    });

	    it('The NFA of 01000001010000001 should return true', function () {    
	        var getValidationOfString = nfaStructure("01000001010000001");
	        assert.isTrue(getValidationOfString);
	    });
	});	

})