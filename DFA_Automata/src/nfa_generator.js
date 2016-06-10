var _ = require('lodash');
var nfaGenerator = {};
module.exports = nfaGenerator;

var varifyStringOfLanguage = function(stringOfLanguage){
	return /^[0-1]+$/.test(stringOfLanguage);
}
var getNewEpsilonStates = function(transitionFunction,states){
	return _.flattenDeep(states.map(function(state){
		if(transitionFunction[state] && transitionFunction[state]['e']) return (transitionFunction[state]['e']);
		return [];
	}));
}
var getAllEpsilonStates = function(transitionFunction,states){
	if(!Array.isArray(states)) states = _.filter([states],Boolean);
	var newEpsilonStates = getNewEpsilonStates(transitionFunction,states);
	if(_.difference(newEpsilonStates, states).length ==  0 ) return newEpsilonStates;
	var unionOfEpsilonStates = _.uniq(_.flattenDeep(_.union(states,newEpsilonStates)));
	return getAllEpsilonStates(transitionFunction,unionOfEpsilonStates);
}


var getNextStateOfAlphabet = function(transitionFunction,state,currentAlphabet){
	return transitionFunction[state] && (transitionFunction[state][currentAlphabet] || []) || [];
}

var getValidStateFromEpsilon = function(transitionFunction,allValidElipsonStates,currentAlphabet){
	return _.flattenDeep(allValidElipsonStates).map(function(state1){
		return getNextStateOfAlphabet(transitionFunction,state1,currentAlphabet);
	})
}

var getAllStateWithEpsilon = function(transitionFunction,state,currentAlphabet){
	var validStates=[];var allValidElipsonStates=[];
	validStates.push(getNextStateOfAlphabet(transitionFunction,state,currentAlphabet));	
	allValidElipsonStates.push(getAllEpsilonStates(transitionFunction,state));
		return validStates.concat(getValidStateFromEpsilon(transitionFunction,allValidElipsonStates,currentAlphabet));	
}

var getFinalMachineStateByHandelFinalEpsilon = function(tuples,resultState){
	return resultState.concat(_.flattenDeep(resultState.map(function(state){
			if(tuples.transitionFunction[state] && tuples.transitionFunction[state]['e']) {
				return getAllEpsilonStates(tuples.transitionFunction,state);
			}
			return resultState;
		})));
}

nfaGenerator.generateNFA = function (tuples) {
	return function(stringOfLanguage){
		var resultState = stringOfLanguage.split("").reduce(function(currentStates,currentAlphabet){
			return _.flattenDeep(currentStates.map(function(state){
				return _.flattenDeep(getAllStateWithEpsilon(tuples.transitionFunction,state,currentAlphabet));
			}));
		},tuples.initialState);
		var finalMachineStates = getFinalMachineStateByHandelFinalEpsilon(tuples,resultState);
		return _.intersection(tuples.finalState,finalMachineStates).length > 0;
	}
}

