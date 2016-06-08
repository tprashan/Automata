var assert = require('chai').assert;
var nfaGenerator = require('../src/nfa_generator')

describe("NFA_Generator_With_Epsilon",function(){
	describe('The language 0*1*0*0 with three states(* is 0 or more)', function () {
	  	var touples = {
	  		setOfState : ["q1","q2","q3"], 
	  		setOfAlphabet : [0,1,'ε'],
	  		transitionFunction : {
	  			"q1" : {
	  					'0' : ["q1"],
	  					'1' : [],
	  					'ε' : ["q2"]
	  				},
	  			"q2" : {
	  					'0' :[],
	  					'1' :["q2"],
	  					'ε' :["q3"]
	  				},
	  			"q3" : { 
	  					'0' : ["q3"],
	  					'1' : [],
	  					'ε' : []
	  				}		
	  		},
	  		initialState : ["q1","q2"],
	  		finalState : ["q3"]

	  	};

	  	var nfaStructure = nfaGenerator.generateNFA(touples);

	    it('The NFA of 00 should return true', function () {    
	        var getValidationOfString = nfaStructure("00");
	        // assert.isTrue(getValidationOfString);
	    });

	});
})