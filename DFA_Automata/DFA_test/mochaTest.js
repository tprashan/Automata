var assert = require('chai').assert;
var dfaGenerator = require('../DFA_generator/dfa_generator')

describe('DFA_generator', function() {
  describe('a language should end with one', function () {
  	var touples = {
  		setOfState : ["q0","q1"],
  		setOfAlphabet : [0,1],
  		transitionFunction : {
  			"q0" : {
  						0 : "q0",
  						1 : "q1"
  					},
  			"q1" : {
  						0 :"q0",
  						1 :"q1"	
  					}
  		},
  		initialState : "q0",
  		finalState : ["q1"]

  	};

  	var dfaStructure = dfaGenerator.generateDFA(touples);

    it('this language of 010101 should return true', function () {		
    		var getFinalState = dfaStructure("010101");
    		assert.isTrue(getFinalState);
    });

    it('this language of 01010 should return false', function () {		
    		var getFinalState = dfaStructure("010100");
    		assert.isFalse(getFinalState);
    });


  });
});