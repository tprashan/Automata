var _ = require("lodash");
// var nfaGenerator = require('../src/nfa_generator');
// var dfaGenerator = require('../src/dfa_generator');
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
		allValidCombinationOfStates.forEach(function(states){
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


var getObjectReadyWithAlphabet = function(tuple){
	var linkFromState = {};
	tuple.setOfAlphabet.forEach(function(alpha){
		linkFromState[alpha]=[];
	});
	return linkFromState;
}

var getAllLocationToReach = function(tuple,stateSet){
	var linkFromState = getObjectReadyWithAlphabet(tuple);
	tuple.setOfAlphabet.forEach(function(alphabet){
		stateSet.forEach(function(state){
			var currentState = tuple.transitionFunction[state];
			if(currentState){
				var epsilonState = getAllEpsilonStates(tuple.transitionFunction,currentState[alphabet]);
				if(epsilonState.length>0) 
					linkFromState[alphabet] = _.uniq(linkFromState[alphabet].concat(epsilonState)).sort();
				linkFromState[alphabet] = _.uniq(linkFromState[alphabet].concat(currentState[alphabet] || [])).sort();
			}
		})
	})
	return linkFromState;
}

converter.getNFAtoDFATransitionFunction = function(tuple,allCombinationsOfStates){
	var NFAtoDFATransitionFunction = {};
	var allPossibleLink = allCombinationsOfStates.forEach(function(stateSet){
		var allLocationToReach = getAllLocationToReach(tuple,stateSet);
		NFAtoDFATransitionFunction[stateSet] = allLocationToReach;
	});
	return NFAtoDFATransitionFunction;
}

var getNfaToDfaTuple = function(tuples,NFAtoDFATransitionFunction,initialStateOfNFAtoDFA,finalStates){
	return {
				setOfState : tuples.setOfState,
				setOfAlphabet : tuples.setOfAlphabet,
				transitionFunction : NFAtoDFATransitionFunction,
				initialState : initialStateOfNFAtoDFA,
				finalState : finalStates
			}
}

var generateDFA = function(tuples){
	return function(stringOfLanguage){
		console.log("tuples",tuples);
				var returnFinalState = stringOfLanguage.split("").reduce(function(currentState,currentAlphabet){
					// if(tuples.transitionFunction[currentState] == []) tuples.transitionFunction[currentState].concat("Ø");
					return tuples.transitionFunction[currentState+""][currentAlphabet];
				},tuples.initialState);
				return _.includes(JSON.stringify(tuples.finalState),JSON.stringify(returnFinalState));
	}
}

converter.convertNFAtoDFA = function(tuples){

	return function(stringOfLanguage){
		// console.log(tuples);
		var allValidCombinationOfStates = converter.getAllCombinationOfStates(tuples.setOfState).sort();
		var finalStates = converter.getAllFinalStates(tuples.finalState,allValidCombinationOfStates);
		var NFAtoDFATransitionFunction = converter.getNFAtoDFATransitionFunction(tuples,allValidCombinationOfStates);
		var initialStateOfNFAtoDFA = converter.getInitialState(tuples.transitionFunction,tuples.initialState);
		var nfaToDfaTuple = getNfaToDfaTuple(tuples,NFAtoDFATransitionFunction,initialStateOfNFAtoDFA,finalStates);
		var dfaStructure = generateDFA(nfaToDfaTuple);

		return dfaStructure(stringOfLanguage);
	}
}






