var _ = require("lodash");
var nfaGenerator = require('../src/nfa_generator');
var converter = {};
module.exports = converter;


var getNewEpsilonStates = function(transitionFunction,states){
	return _.uniq(_.flattenDeep(states.map(function(state){
		return (transitionFunction[state] && transitionFunction[state]['e']) ? [state,(transitionFunction[state]['e'])] : [];
	})));
}

var getAllEpsilonStates = function(transitionFunction,states){
	if(!Array.isArray(states)) states = [states];
	var newEpsilonStates = getNewEpsilonStates(transitionFunction,states);
	if(_.difference(newEpsilonStates, states).length ==  0 ) return newEpsilonStates;
	var unionOfEpsilonStates = _.uniq(_.flattenDeep(_.union(states,newEpsilonStates)));
	return getAllEpsilonStates(transitionFunction,unionOfEpsilonStates);
}

converter.getInitialState = function(transitionFunction,states){
	var allEpsilonState = getAllEpsilonStates(transitionFunction,states);
	return allEpsilonState;

}

converter.getAllFinalStates = function(nfaFinalState,allValidCombinationOfStates){
	var allFinalStates = [];
	nfaFinalState.forEach(function(finalState){
		allValidCombinationOfStates.map(function(states){
			if(_.includes(states,finalState)) allFinalStates.push(states);
		});
	})
	return allFinalStates;
}

converter.getAllCombinationOfStates = function(setOfState){
	var result = [];
	for (var numberOfCombination = 0; numberOfCombination < Math.pow(2, setOfState.length); numberOfCombination++) {
	    var binary = (numberOfCombination).toString(2), set = [];
	    binary = new Array((setOfState.length-binary.length)+1).join("0")+binary;

	    for (var binaryIndex = 0; binaryIndex < binary.length; binaryIndex++)
			(binary[binaryIndex] === "1") && set.push(setOfState[binaryIndex]);
		if(set.length == 0) set.push("Ø");
    	result.push(set);
	};
	return result;
}


converter.getNFAtoDFATransitionFunction = function(){
	
}

converter.convertNFAtoDFA = function(tuples){
	return function(stringOfLanguage){
		var allValidCombinationOfStates = getAllCombinaryationOfStates(tuples.setOfState);
		var finalStates = getAllFinalStates(tuples.initialStates,allValidCombinationOfStates);
		return 1;
	}
}






