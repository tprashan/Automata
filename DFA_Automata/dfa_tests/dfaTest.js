var assert = require('chai').assert;
var dfaGenerator = require('../src/dfa_generator')

describe('DFA_generator', function() {
  describe('a language that end with one', function () {
  	var touples = {
  		setOfState : ["q0","q1"], 
  		setOfAlphabet : [0,1],
  		transitionFunction : {
  			"q0" : {
  						'0' : "q0",
  						'1' : "q1"
  					},
  			"q1" : {
  						'0' :"q0",
  						'1' :"q1"	
  					}
  		},
  		initialState : "q0",
  		finalState : ["q1"]

  	};

  	var dfaStructure = dfaGenerator.generateDFA(touples);

    it('The DFA of 010101 should return true', function () {    
        var getFinalState = dfaStructure("010101");
        assert.isTrue(getFinalState);
    });

    it('The DFA of 01010201 should return false', function () {    
        var getFinalState = dfaStructure("01010201");
        assert.isFalse(getFinalState);
    });

    it('The DFA of 01010a01 should return false', function () {    
        var getFinalState = dfaStructure("01010a01");
        assert.isFalse(getFinalState);
    });

    it('The DFA of 01010 should return false', function () {		
    		var getFinalState = dfaStructure("010100");
    		assert.isFalse(getFinalState);
    });

    it('The DFA of 01000000000000000 should return false', function () {    
        var getFinalState = dfaStructure("01000000000000000");
        assert.isFalse(getFinalState);
    });

    it('The DFA of 0100001111111111111 should return true', function () {    
        var getFinalState = dfaStructure("0100001111111111111");
        assert.isTrue(getFinalState);
    });
  });

  describe('a language that start with one one and end with one one And inbetween of one one the number of zeros should be even', function () {
    var touples = {
      setOfState : ["q1","q2","q3","q4","q5","q6","q7","q8"],
      setOfAlphabet : [0,1],
      transitionFunction : { 
        "q1" : {
              '0' : "q5",
              '1' : "q2"
            },
        "q2" : {
              '0' : "q5",
              '1' : "q3" 
            },
        "q3" : {
              '0' : "q6",
              '1' : "q4"
            },
        "q4" : {
              '0' : "q6",
              '1' : "q4" 
            },
        "q5" : {
              '0' : "q5",
              '1' : "q5"
            },
        "q6" : {
              '0' : "q7",
              '1' : "q5" 
            },
        "q7" : {
              '0' : "q6",
              '1' : "q8"
            },
        "q8" : {
              '0' : "q6",
              '1' : "q4"
            }             

      },
      initialState : "q1",
      finalState : ["q3","q4"]

    };

    var dfaStructure = dfaGenerator.generateDFA(touples);

    it('The DFA of 11 should return true', function () {    
        var getFinalState = dfaStructure("11");
        assert.isTrue(getFinalState);
    });

    it('The DFA of 111 should return true', function () {    
        var getFinalState = dfaStructure("111");
        assert.isTrue(getFinalState);
    });

    it('The DFA of 1111 should return true', function () {    
        var getFinalState = dfaStructure("1111");
        assert.isTrue(getFinalState);
    });

    it('The DFA of 101 should return false', function () {    
        var getFinalState = dfaStructure("101");
        assert.isFalse(getFinalState);
    });

    it('The DFA of 1101 should return false', function () {    
        var getFinalState = dfaStructure("1101");
        assert.isFalse(getFinalState);
    });

    it('The DFA of 11011 should return false', function () {    
        var getFinalState = dfaStructure("11011");
        assert.isFalse(getFinalState);
    });

    it('The DFA of 1100110011 should return true', function () {    
        var getFinalState = dfaStructure("1100110011");
        assert.isTrue(getFinalState);
    });

    it('The DFA of 1110010010011 should return true', function () {    
        var getFinalState = dfaStructure("1110010010011");
        assert.isTrue(getFinalState);
    });

    it('The DFA of 110010010010011 should return true', function () {    
        var getFinalState = dfaStructure("110010010010011");
        assert.isTrue(getFinalState);
    });

    it('The DFA of  11000110110010001011 should return true', function () {    
        var getFinalState = dfaStructure("110000110011001000010011");
        assert.isTrue(getFinalState);
    });

  });

  describe('a language that-s length is divisible by two or three', function () {
    var touples = {
      setOfState : ["q1","q2","q3","q4","q5","q6"],
      setOfAlphabet : [0,1],
      transitionFunction : {
        "q1" : {
              '0' : "q2",
              '1' : "q2"
            },
        "q2" : {
              '0' :"q3",
              '1' :"q3" 
            },
        "q3" : {
              '0' : "q4",
              '1' : "q4"
            },
        "q4" : {
              '0' :"q5",
              '1' :"q5" 
            },
        "q5" : {
              '0' : "q6",
              '1' : "q6"
            },
        "q6" : {
              '0' :"q1",
              '1' :"q1" 
            }       
      },
      initialState : "q1",
      finalState : ["q1","q3","q4","q5"]

    };

    var dfaStructure = dfaGenerator.generateDFA(touples);

    it('The DFA of 01 should return true', function () {    
        var getFinalState = dfaStructure("01");
        assert.isTrue(getFinalState);
    });

    it('The DFA of 10101 should return false', function () {    
        var getFinalState = dfaStructure("10101");
        assert.isFalse(getFinalState);
    });

    it('The DFA of 01010101010101010 should return false', function () {    
        var getFinalState = dfaStructure("01000000000000000");
        assert.isFalse(getFinalState);
    });

    it('The DFA of 011010010011011011011010 should return true', function () {    
        var getFinalState = dfaStructure("011010010011011011011010");
        assert.isTrue(getFinalState);
    });
  });


});