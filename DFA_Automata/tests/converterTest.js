var assert = require('chai').assert;
var converter = require('../src/converter');

describe('Convert NFA to DFA',function(){
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

	  	var convertedDFA = converter.convertNFAtoDFA(touples);

	    // it('The NFA of 010100 should return true', function () {    
	    //     var getValidationOfString = convertedDFA("010100");
	    //     assert.isTrue(getValidationOfString);
	    // });

	});

})