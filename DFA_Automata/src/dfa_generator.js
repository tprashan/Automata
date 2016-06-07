var _ = require('lodash');
var dfaGenerator = {};
module.exports = dfaGenerator;


dfaGenerator.generateDFA = function (touples) {
	return function(stringOfLanguage){
				var setOfDigits = stringOfLanguage.split("").map(function(x){return Number(x);});
				var initState = touples.initialState;
				var returnFinalState = setOfDigits.reduce(function(currentState,currentValue){
					return touples.transitionFunction[currentState][currentValue];
				},initState);
				return _.includes(touples.finalState,returnFinalState);
	}
}

