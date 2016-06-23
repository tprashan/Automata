var fs = require("fs");
var main = require("./myGrammer.js").main;

var parse = function(inputFile){
	var parserObject = main(inputFile);
	return JSON.stringify(parserObject);
}

console.log(parse(process.argv.slice(1)));
