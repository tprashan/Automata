var lodash = require('lodash');
var dfaModule = {};
module.exports = dfaModule;


dfaModule.generateDFA = function (touples) {

	return function(stringOfLanguage){
				var setOfDigits = stringOfLanguage.split("").map(function(x){return Number(x);});
				var initState = touples.initialState;
				var returnFinalState = setOfDigits.reduce(function(preValue,currentValue){
					var state = touples.transitionFunction[preValue][currentValue];
					return state;
				},initState);
				return touples.finalState.indexOf(returnFinalState) > -1;
	}
}

