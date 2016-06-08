var assert = require('chai').assert;
var nfaGenerator = require('../src/nfa_generator')

describe("NFA_Generator_With_Epsilon",function(){
	describe('The language 0*1*0*0 with three states(* is 0 or more)', function () {
	  	var touples = {
	  		setOfState : ["q1","q2","q3"], 
	  		setOfAlphabet : [0,1],
	  		transitionFunction : {
	  			"q1" : {
	  					'0' : ["q1"],
	  					'e' : ["q2"]
	  				},
	  			"q2" : {
	  					'1' :["q2"],
	  					'0' :["q3"]
	  				},
	  			"q3" : { 
	  					'0' : ["q3"]
	  				}		
	  		},
	  		initialState : ["q1"],
	  		finalState : ["q3"]

	  	};

	  	var nfaStructure = nfaGenerator.generateNFA(touples);

	    it('The NFA of 00 should return true', function () {    
	        var getValidationOfString = nfaStructure("00");
	        assert.isTrue(getValidationOfString);
	    });

	    it('The NFA of 0 should return true', function () {    
	        var getValidationOfString = nfaStructure("0");
	        assert.isTrue(getValidationOfString);
	    });

	    it('The NFA of 001 should return true', function () {    
	        var getValidationOfString = nfaStructure("001");
	        assert.isTrue(getValidationOfString);
	    });

	});

	describe('The language {w| w contains an even number of 0s or exactly two 1s} with six states', function () {
	  	var touples = {
	  		setOfState : ["q1","q2","q3","q4","q5","q6"], 
	  		setOfAlphabet : [0,1],
	  		transitionFunction : {
	  			"q1" : {
	  					'e' : ["q2","q4"]
	  				},
	  			"q2" : {
	  					'0' :["q3"],
	  					'1' :["q2"]
	  				},
	  			"q3" : { 
	  					'0' : ["q2"],
	  					'1' : ["q3"]
	  				},
	  			"q4" : {
	  					'1' : ["q5"]
	  				},
	  			"q5" : {
	  					'1' :["q6"]
	  				},
	  			"q6" : { 
	  					'0' : ["q6"]
	  				}		
	  		},
	  		initialState : ["q1"],
	  		finalState : ["q2","q6"]

	  	};

	  	var nfaStructure = nfaGenerator.generateNFA(touples);

	    it('The NFA of 00 should return true', function () {    
	        var getValidationOfString = nfaStructure("00");
	        assert.isTrue(getValidationOfString);
	    });

	    it('The NFA of 11 should return true', function () {    
	        var getValidationOfString = nfaStructure("11");
	        assert.isTrue(getValidationOfString);
	    });

	    it('The NFA of 0000000000 should return true', function () {    
	        var getValidationOfString = nfaStructure("0000000000");
	        assert.isTrue(getValidationOfString);
	    });

	    it('The NFA of 0101 should return true', function () {    
	        var getValidationOfString = nfaStructure("0101");
	        assert.isTrue(getValidationOfString);
	    });

	    it('The NFA of 10101 should return true', function () {    
	        var getValidationOfString = nfaStructure("10101");
	        assert.isTrue(getValidationOfString);
	    });

	    it('The NFA of 1010101110 should return true', function () {    
	        var getValidationOfString = nfaStructure("1010101110");
	        assert.isTrue(getValidationOfString);
	    });

	    it('The NFA of 101010111001 should return false', function () {    
	        var getValidationOfString = nfaStructure("101010111001");
	        assert.isFalse(getValidationOfString);
	    });

	    it('The NFA of 1000 should return false', function () {    
	        var getValidationOfString = nfaStructure("1000");
	        assert.isFalse(getValidationOfString);
	    });

	    it('The NFA of 11000 should return true', function () {    
	        var getValidationOfString = nfaStructure("11000");
	        assert.isTrue(getValidationOfString);
	    });

	    it('The NFA of 110001 should return false', function () {    
	        var getValidationOfString = nfaStructure("110001");
	        assert.isFalse(getValidationOfString);
	    });
	});
})