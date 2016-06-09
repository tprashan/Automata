var _ = require('lodash');
var nfaGenerator = {};
module.exports = nfaGenerator;

var varifyStringOfLanguage = function(stringOfLanguage){
	return /^[0-1]+$/.test(stringOfLanguage);
}

var getAllEpsilonStates = function(transitionFunction,states) {
	if(!Array.isArray(states)) states = _.filter([states],Boolean);
	return states.reduce(function(epsilonStates, state) {
		var  newEpsilonStates = transitionFunction[state]['e'];
		epsilonStates = _.filter(epsilonStates.concat(newEpsilonStates),Boolean);
		return epsilonStates.concat(getAllEpsilonStates(transitionFunction,newEpsilonStates));
	}, []);
}


var getNextStateOfAlphabet = function(transitionFunction,state,currentAlphabet){
	return transitionFunction[state][currentAlphabet] || [];
}

var getAllStateWithEpsilon = function(transitionFunction,state,currentAlphabet){
	var validStates=[];var validElipsonStates=[];
	validStates.push(getNextStateOfAlphabet(transitionFunction,state,currentAlphabet));	
	transitionFunction[state]['e'] && validElipsonStates.push(getAllEpsilonStates(transitionFunction,state));
	return validStates.concat(_.flattenDeep(validElipsonStates).map(function(state1){
		return getNextStateOfAlphabet(transitionFunction,state1,currentAlphabet);
	}));	
}


nfaGenerator.generateNFA = function (tuples) {
	return function(stringOfLanguage){
		var resultState = stringOfLanguage.split("").reduce(function(currentStates,currentAlphabet){
			return _.flattenDeep(currentStates.map(function(state){
				return _.flattenDeep(getAllStateWithEpsilon(tuples.transitionFunction,state,currentAlphabet));
			}));
		},tuples.initialState);

		var finalStates = _.flattenDeep(resultState.map(function(state){
			if(tuples.transitionFunction[state]['e'])
				return getAllEpsilonStates(tuples.transitionFunction,state);
			return resultState;
		}))

		return _.intersection(tuples.finalState,finalStates).length > 0;
	}
}

