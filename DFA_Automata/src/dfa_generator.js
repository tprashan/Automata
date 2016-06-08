var _ = require('lodash');
var dfaGenerator = {};
module.exports = dfaGenerator;

var varifyStringOfLanguage = function(stringOfLanguage){
	return /^[0-1]+$/.test(stringOfLanguage);
}


dfaGenerator.generateDFA = function (touples) {
	return function(stringOfLanguage){
				if(!varifyStringOfLanguage(stringOfLanguage)) return false;
				var returnFinalState = stringOfLanguage.split("").reduce(function(currentState,currentAlphabet){
					return touples.transitionFunction[currentState][currentAlphabet];
				},touples.initialState);
				return _.includes(touples.finalState,returnFinalState);
	}
}

