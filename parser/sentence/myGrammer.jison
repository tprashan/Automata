
/* description: Parses and change SENTENCES */

/* lexical grammar */
%lex
%%

\s+                      		  																	/* skip whitespace */
("Ram"|"Sita"|"Shyam")          																return 'NOUN'
("He"|"She"|"It")        			 																	return 'PRONOUN'
("likes"|"hates"|"eats"|"runs")    	    												return 'VERB'
("fruit"|"fast"|"tea"|"coffee"|"butter"|"cheese")        			  return 'OBJECT'
.                     			    																return 'DOT'
<<EOF>>                 			  																return 'EOF'


/lex

%start PARAGRAPH

%% /* language grammar */

PARAGRAPH: EOF
	{console.log("There is no text in the file.")}
	|SENTENCES EOF
		{return $1;}
	;

SENTENCES: SENTENCE
			{$$ = [{'sentence': $1}]}
		| SENTENCES SENTENCE
			{$$ = $1.concat([{'sentence':$2}])}
		;

SENTENCE:
    SUBJECT VERB DOT
    {$$ = [{'SUBJECT':$1, 'VERB':$2,'DOT':$3}]}

    | SUBJECT VERB OBJECT DOT
    {$$ = [{'SUBJECT':$1, 'VERB':$2, 'OBJECT':$3,'DOT':$4}]}
    ;


SUBJECT: NOUN
		{$$ = {'noun':$1}}
	| PRONOUN
	  {$$ = {'pronoun':$1}}
	;
