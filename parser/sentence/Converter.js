var fs = require("fs");
var _ = require('lodash');
var main = require("./myGrammer.js").main;

var getCompoundSentence  = function(obj){
	var subjects = Object.keys(obj);
	var semanticSentence = subjects.map(function(sub){
		var keys = Object.keys(obj[sub]);
		return keys.map(function(key){
			var OBJECTS = obj[sub][key];
			if(OBJECTS.length > 1) OBJECTS.splice(OBJECTS.length-1,0,'and');
			return sub+" "+key+" "+OBJECTS.join(' ')+".";
		})
	})
	return _.flattenDeep(semanticSentence).join('\n');
}

var getSentenceObjectTree = function(parserObject){
	var obj = {};
	parserObject.forEach(function(sentence){
		if(obj[sentence['SUBJECT']]==undefined) obj[sentence['SUBJECT']] = {};
		if(obj[sentence['SUBJECT']][sentence['VERB']]==undefined) obj[sentence['SUBJECT']][sentence['VERB']] = [];
		obj[sentence['SUBJECT']][sentence['VERB']] = obj[sentence['SUBJECT']][sentence['VERB']].concat(sentence['OBJECT']);
	})
	return obj;
}

var checkSemanticError = function(parserObject){
	if(parserObject=='semanticError') return "semanticError";
}

var parseLanguage = function(inputFile){
	var parserObject = main(inputFile);
	if(checkSemanticError(parserObject)) return "semanticError";
	var sentenceObjectTree = getSentenceObjectTree(parserObject);
	var semanticGrammer = getCompoundSentence (sentenceObjectTree);
	return semanticGrammer;
}

console.log(parseLanguage(process.argv.slice(1)));
