var _ = require('lodash');
var nfaGenerator = {};
module.exports = nfaGenerator;

var varifyStringOfLanguage = function(stringOfLanguage){
	return /^[0-1]+$/.test(stringOfLanguage);
}

nfaGenerator.generateNFA = function (touples) {
	return function(stringOfLanguage){
		if(!varifyStringOfLanguage(stringOfLanguage)) return false;
		var resultState = stringOfLanguage.split("").reduce(function(currentState,currentAlphabet){
			var getFinalState = currentState.map(function(state){
				return touples.transitionFunction[state][currentAlphabet];
			});
			return _.flatten(getFinalState);

		},touples.initialState);
		return _.intersection(touples.finalState,resultState).length > 0;
	}
}

