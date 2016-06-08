var _ = require('lodash');
var nfaGenerator = {};
module.exports = nfaGenerator;

var varifyStringOfLanguage = function(stringOfLanguage){
	return /^[0-1]+$/.test(stringOfLanguage);
}

var getAllState = function(tuples,currentStates,currentAlphabet){
	return currentStates.map(function(state){
		return tuples.transitionFunction[state][currentAlphabet];
	});
}

var generateNFA_WithOutEpsilon = function(tuples,stringOfLanguage){
	var resultState = stringOfLanguage.split("").reduce(function(currentStates,currentAlphabet){
		return _.flatten(getAllState(tuples,currentStates,currentAlphabet));
	},tuples.initialState);
	return _.intersection(tuples.finalState,resultState).length > 0;
}

var generateNFA_WithEpsilon = function(tuples,stringOfLanguage){
	return 1;
}

nfaGenerator.generateNFA = function (tuples) {
	return function(stringOfLanguage){
		if(!varifyStringOfLanguage(stringOfLanguage)) return false;
		if(!_.includes(tuples.setOfAlphabet,'ε')) return generateNFA_WithOutEpsilon(tuples,stringOfLanguage);
		return generateNFA_WithEpsilon(tuples,stringOfLanguage);
	}
}

