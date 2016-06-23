var assert = require('chai').assert;
var converter = require('../src/converter');

describe('TDD of converter',function(){
	describe('get all combination of the set of states',function(){
		var setOfState = ["q1","q2","q3"];
		var DFAConverter = converter.convertNFAtoDFA(setOfState);

		it('The setOfState ["q1","q2","q3"] should return length 8', function () {    
		    var setOfState = ["q1","q2","q3"];
			var getCombinationOfStates = converter.getAllCombinationOfStates(setOfState);

			assert.equal(getCombinationOfStates.length,8);

		});

		it('The setOfState ["q1","q2","q3","q4"] should return result length 16', function () {    
		    var setOfState = ["q1","q2","q3","q4"];
			var getCombinationOfStates = converter.getAllCombinationOfStates(setOfState);
			assert.equal(getCombinationOfStates.length,16);

		});

		it('The setOfState ["q1","q2","q3","q4","q5"] should return result length 32', function () {    
		    var setOfState = ["q1","q2","q3","q4","q5"];
			var getCombinationOfStates = converter.getAllCombinationOfStates(setOfState);
			assert.equal(getCombinationOfStates.length,32);

		});

		// it('The setOfState 15 state should return result length 32768', function () {    
		//     var setOfState = ["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10","q11","q12","q13","q14","q15"];
		// 	var getCombinationOfStates = converter.getAllCombinationOfStates(setOfState);
		// 	assert.equal(getCombinationOfStates.length,32768);

		// });
	});

	describe('get all final set of states',function(){
		var getAllCombinationOfStates = [ [ 'Ø' ],[ 'q3' ],[ 'q2' ],[ 'q1' ],
										  [ 'q2', 'q3' ],[ 'q1', 'q3' ],
										  [ 'q1', 'q2' ],[ 'q1', 'q2', 'q3' ] 
										];
		var finalNfaState = ['q1'];
		var expectedFinalStates = [['q1'],[ 'q1', 'q3' ],[ 'q1', 'q2' ],[ 'q1', 'q2', 'q3' ]]

		it('The finalState ["q1"] should return length 4', function () {    
		    var setOfState = ["q1","q2","q3"];
			var getFinalStates = converter.getAllFinalStates(finalNfaState,getAllCombinationOfStates);
			assert.equal(getFinalStates.length,4);
			assert.deepEqual(getFinalStates,expectedFinalStates);

		});
	});

	describe('get initial states',function(){

		var transitionFunction =  {
	  			"q1" : {
	  					'1' : ["q2"],
	  					'e' : ["q3"]
	  				},
	  			"q2" : {
	  					'0' :["q2"],
	  					'1' :["q3"]
	  				},
	  			"q3" : { 
	  					'0' : ["q1"]
	  				}		
	  		};

		var initialNfaState = ['q1'];
		var expectedStates = [ 'q1', 'q3' ]

		it('The initialState should return [q1,q3]', function () {    
			var getInitialStates = converter.getInitialState(transitionFunction,initialNfaState);
			assert.deepEqual(getInitialStates,expectedStates);

		});
	});

	describe('get initial states for more than one epsilon',function(){

		var transitionFunction =  {
	  			"q1" : {
	  					'1' : ["q2"],
	  					'e' : ["q3"]
	  				},
	  			"q2" : {
	  					'0' :["q2"],
	  					'1' :["q3"]
	  				},
	  			"q3" : { 
	  					'0' : ["q1"],
	  					'e' : ["q4"]
	  				}		
	  		};

		var initialNfaState = ['q1'];
		var expectedStates = [ 'q1', 'q3' ,'q4']

		it('The initialState should return [q1,q3,q4]', function () {    
			var getInitialStates = converter.getInitialState(transitionFunction,initialNfaState);
			assert.equal(getInitialStates.length,3);
			assert.deepEqual(getInitialStates,expectedStates);
		});
	});

	describe('get initial states for more than two epsilon',function(){

		var transitionFunction =  {
	  			"q1" : {
	  					'1' : ["q4"],
	  					'e' : ["q2","q3"]
	  				},
	  			"q2" : {
	  					'0' :["q2"],
	  					'1' :["q3"]
	  				},
	  			"q3" : { 
	  					'0' : ["q1"],
	  					'e' : ["q4"]
	  				}		
	  		};

		var initialNfaState = ['q1'];
		var expectedStates = [ 'q1', 'q2','q3' ,'q4']

		it('The initialState should return [q1,q2,q3,q4]', function () {    
			var getInitialStates = converter.getInitialState(transitionFunction,initialNfaState);
			assert.equal(getInitialStates.length,4);
			assert.deepEqual(getInitialStates,expectedStates);

		});
	});

	describe('get NFA to DAFA transitionFunction',function(){
		var tuples = {
	  		setOfState : ["q1","q2","q3"], 
	  		setOfAlphabet : [0,1],
	  		transitionFunction : {
	  			"q1" : {
	  					'1' : ["q2"],
	  					'e' : ["q3"]
	  				},
	  			"q2" : {
	  					'0' : ["q2","q3"],
	  					'1' : ["q3"]
	  				},
	  			"q3" : {
	  					'0' : ["q1"]
	  			}		
	  		},
	  		initialState : ["q1"],
	  		finalState : ["q1"]

	  	};

		var expectedTransitionFunction = {'q1': { '0': [], '1': [ 'q2' ] },
										  'q1,q2': { '0': [ 'q2', 'q3' ], '1': [ 'q2', 'q3' ] },
										  'q1,q2,q3': { '0': [ 'q1', 'q2', 'q3' ], '1': [ 'q2', 'q3' ] },
										  'q1,q3': { '0': [ 'q1', 'q3' ], '1': [ 'q2' ] },
										  'q2': { '0': [ 'q2', 'q3' ], '1': [ 'q3' ] },
										  'q2,q3': { '0': [ 'q1', 'q2', 'q3' ], '1': [ 'q3' ] },
										  'q3': { '0': [ 'q1', 'q3' ], '1': [] },
										  'Ø': { '0': [], '1': [] } }

		it('The NFA transition function should return DFA transition function', function () { 
			var combinationOfState = converter.getAllCombinationOfStates(tuples.setOfState).sort();   
			var nfaToDfaTransitionFunction = converter.getNFAtoDFATransitionFunction(tuples,combinationOfState);
console.log(nfaToDfaTransitionFunction);
			assert.deepEqual(expectedTransitionFunction,nfaToDfaTransitionFunction);
		});
	})

	describe('check of nfa to dfa of faltu transition function',function(){
	  	var tuples = {
	  		setOfState : ["q1","q2","q3"], 
	  		setOfAlphabet : [0,1],
	  		transitionFunction : {
	  			"q1" : {
	  					'1' : ["q2"],
	  					'e' : ["q3"]
	  				},
	  			"q2" : {
	  					'0' : ["q2","q3"],
	  					'1' : ["q3"]
	  				},
	  			"q3" : {
	  					'0' : ["q1"]
	  			}		
	  		},
	  		initialState : ["q1"],
	  		finalState : ["q1"]

	  	};

		it('The converter should pass 1100100 and fail 110011', function () {    
			var convertedStructureFromNFAtoDFA = converter.convertNFAtoDFA(tuples);

			assert.isTrue(convertedStructureFromNFAtoDFA("1010"));
			assert.isFalse(convertedStructureFromNFAtoDFA("1010101"));
			assert.isFalse(convertedStructureFromNFAtoDFA("110011"));
			assert.isTrue(convertedStructureFromNFAtoDFA("1100100"));

		});
	});
})
	