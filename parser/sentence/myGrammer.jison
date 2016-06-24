
/* description: Parses and change SENTENCES */

/* lexical grammar */
%lex
%%

\s+                      		  																							/* skip whitespace */
("Ram"|"Sita"|"Shyam")          																						return 'NOUN'
("He"|"She"|"It")        			 																							return 'PRONOUN'
("also")                                                                    return 'ADVERB'
("likes"|"hates"|"eats"|"runs")    	    																		return 'VERB'
("fruit"|"fast"|"tea"|"coffee"|"butter"|"cheese"|"biscuits")                return 'OBJECT'
.                     			    																						return 'DOT'
<<EOF>>                 			  																						return 'EOF'


/lex

%start PARAGRAPH

%% /* language grammar */

PARAGRAPH: EOF
	{console.log("There is no text in the file.")}
	|SENTENCES EOF
		{return $1;}
	;

SENTENCES: SENTENCE
			{if($1.ADVERB == 'also') return "semanticError" ;$$ = [$1]}
		| SENTENCES SENTENCE
			{$$ = $1.concat([$2])}
		;

SENTENCE:
    NOUN VERB DOT
    {$$ = {'SUBJECT':$1, 'VERB':$2,'DOT':$3}}
		|NOUN VERB NOUN DOT
		{$$ = {'SUBJECT':$1, 'VERB':$2,'OBJECT':$3,'DOT':$4}}
    | NOUN VERB OBJECT DOT
    {$$ = {'SUBJECT':$1, 'VERB':$2, 'OBJECT':$3,'DOT':$4}}
		| NOUN ADVERB VERB OBJECT DOT
		{$$ = {'SUBJECT':$1,'ADVERB':$2 ,'VERB':$3, 'OBJECT':$4,'DOT':$5}}
		| NOUN ADVERB VERB NOUN DOT
		{$$ = {'SUBJECT':$1,'ADVERB':$2 ,'VERB':$3, 'OBJECT':$4,'DOT':$5}}
    ;


/*SUBJECT: NOUN
		{$$ = {'noun':$1}}
	| PRONOUN
	  {$$ = {'pronoun':$1}}
	;*/
