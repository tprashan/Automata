var _ = require('lodash');
var nfaGenerator = {};
module.exports = nfaGenerator;

var varifyStringOfLanguage = function(stringOfLanguage){
	return /^[0-1]+$/.test(stringOfLanguage);
}

var getAllEpsilonStates = function(tuples,state,currentAlphabet){
	return (tuples.transitionFunction[state]['e'].map(function(epsilonState){
			return tuples.transitionFunction[epsilonState][currentAlphabet] || epsilonState;
		}));
}

var getNextStateOfAlphabet = function(tuples,state,currentAlphabet){
	return tuples.transitionFunction[state][currentAlphabet];
}

var getAllStateWithEpsilon = function(tuples,state,currentAlphabet){
	var resultEpsilonStates=[];
	if(tuples.transitionFunction[state]['e'])
		resultEpsilonStates.push(getAllEpsilonStates(tuples,state,currentAlphabet));

	if(tuples.transitionFunction[state][currentAlphabet])
		resultEpsilonStates.push(getNextStateOfAlphabet(tuples,state,currentAlphabet));
	return resultEpsilonStates;
}


nfaGenerator.generateNFA = function (tuples) {
	return function(stringOfLanguage){
		if(!varifyStringOfLanguage(stringOfLanguage)) return false;
		var resultState = stringOfLanguage.split("").reduce(function(currentStates,currentAlphabet){
			return _.flattenDeep(currentStates.map(function(state){
				return getAllStateWithEpsilon(tuples,state,currentAlphabet);
			}));
		},tuples.initialState)
		return _.intersection(tuples.finalState,resultState).length > 0;
	}
}

