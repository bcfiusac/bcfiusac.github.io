/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex

%options case-sensitive

%%
/* Espacios en blanco */
\s+                                 // se ignoran espacios en blanco
"//".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas
[ \r\t]+            {}
\n                  {}

\'[^\']*\'|\"[^\"]*\"|\`[^\`]*\`            { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }

"Evaluar"           return 'REVALUAR';
";"                 return 'PTCOMA';
"("                 return 'PARIZQ';
")"                 return 'PARDER';
"["                 return 'CORIZQ';
"]"                 return 'CORDER';
"{"					return 'LlaveI';
"}"					return 'LLaveD';
","					return 'Coma';
"<="				return 'MenorIgual';
">="				return 'MayorIgual';
"<"					return 'Menor';
">"					return 'Mayor';
"!="				return 'Diferente';
"?"					return 'Ternario';
"++"				return 'Incremento';
"--"				return 'Decremento';
"+="				return 'MasI'
"+"                 return 'MAS';
"-"                 return 'MENOS';
"*"                 return 'POR';
"/"                 return 'DIVIDIDO';
"^"					return 'Potencia';
"%"					return 'Modulo';
"\""				return 'ComillaDoble';
"\\"				return 'BarraInv';
"=="				return 'Comparacion';
"="					return 'Igual';
":"					return 'DosPuntos';
"&&"				return 'And';
"||"				return 'Or';
"!"					return 'Not';


"void"				return 'Void';
"let"				return 'Let';
"const"				return 'Const';
"string"			return 'String';
"number"			return 'Number';
"boolean"			return 'Boolean';
"true"				return 'Trues';
"false"				return 'Falses';
"push"				return 'Push';
"pop"				return 'Pop';
"length"			return 'Length';
"console"			return 'Console';
"log"				return 'Log';
"."					return 'Punto';
"function"			return 'Function';
"return"			return 'Return';
"if"				return 'If';
"else"				return 'Else';
"switch"			return 'Switch';
"break"				return 'Break';
"case"				return 'Case';
"continue"			return 'Continue';
"do"				return 'Do';
"while"				return 'While';
"for"				return 'For';
"of"				return 'Of';
"in"				return 'In';
"graficar_ts"		return 'Graficar';
"type"				return 'Type';
"default"			return 'Default';









([a-zA-Z])[a-zA-Z0-9_]* return 'IDENTIFICADOR';

[0-9]+("."[0-9]+)?\b    return 'DECIMAL';
[0-9]+\b                return 'ENTERO';

<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

/* Asociación de operadores y precedencia */
%left Ternario
%left And Or
%left Comparacion Diferente
%nonassoc Menor Mayor MenorIgual MayorIgual 
%left 'MAS' 'MENOS' 'DosPuntos'
%left 'POR' 'DIVIDIDO' 'Modulo'
%left 'Potencia' 
%left PARIZQ PARDER 
  
%left UMENOS Not

//%start ini
%start inicio


%% /* Definición de la gramática */
inicio: sentencias EOF {return $1;};
//inicio: expresion EOF {console.log("EL VALOR ES ---> " + getValor($1));};
sentencias: sentencias sentencia {$1.push($2);$$ = $1;}| sentencia {$$ = [$1];}| error {console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);};
//-------------ASIGNACION - DECLARACIÓN DE VARIABLES SIMPLES
TipoVar : Let {$$ = true;}| Const {$$ = false;};
TiposVars: Number | Boolean | String | IDENTIFICADOR | Void;
sentencia: decAsign PTCOMA {$$ = $1;} | Asignacion {$$ = $1;} | Print{$$ = $1;} | Funcion {$$=$1;} | Retorno {$$=$1;} | IFS {$$=$1;} | SUICH {$$=$1;} | Breik {$$=$1;} | LLamadaEjec PTCOMA {$$=$1;} | Continuar {$$=$1;}
		| IncDec PTCOMA {$$=$1;} | Wail {$$=$1;} |DuWail{$$=$1;} | ForNormal {$$=$1;} |ForOfIn| Grafica | MatrixSen | Tipos;
Grafica: Graficar PARIZQ PARDER PTCOMA;
																		//TIPOVAR - ID - TIPO - EXPRESION
decAsign: TipoVar IDENTIFICADOR DosPuntos Number Igual expresion   {$$ = Declaracion($1, $2, $4, $6);}
			|TipoVar IDENTIFICADOR DosPuntos Boolean Igual expresion  {$$ = Declaracion($1, $2, $4, $6);}
			|TipoVar IDENTIFICADOR DosPuntos String Igual expresion  {$$=Declaracion($1, $2, $4, $6);}
			|TipoVar IDENTIFICADOR Igual expresion  {$$=Declaracion($1,$2,0,$4);}
			|TipoVar IDENTIFICADOR DosPuntos TiposVars Dimensiones Igual Dimension PTCOMA;

//Expresiones: tipoBool | expresion | CADENA;
//tipoBool: Trues | Falses;
//BoolValues: tipoBool | expresion;
//StringValues: CADENA | expresion;
TipoDef:Number | Boolean | String;
ParamTipo: IDENTIFICADOR DosPuntos expresion | IDENTIFICADOR DosPuntos TipoDef;
ParamsTipo: ParamsTipo Coma ParamTipo | ParamTipo;
Tipos: Type IDENTIFICADOR Igual LlaveI ParamsTipo LLaveD PTCOMA;
IncDec: IDENTIFICADOR signIncDec {$$ = IncDec($1,$2);};
signIncDec: Incremento | Decremento;
Asignacion: IDENTIFICADOR IgualMasIgual expresion PTCOMA {$$=Asignacion($1,$2,$3);};
IgualMasIgual: Igual | MasI;
Print : Console Punto Log PARIZQ expresion PARDER PTCOMA {$$ = Imprimir($5);};
//Anidados: Anidados MAS Anidado {$1.push($3);$$ = $1;} | Anidado sentencia {$$ = [$1];};
//Anidado: ENTERO | DECIMAL | CADENA | IDENTIFICADOR | LLamadaEjec;
Funcion: Function IDENTIFICADOR PARIZQ ParamsEntrada PARDER DosPuntos TiposVars LlaveI sentencias LLaveD
		{$$=Funcion($2,$4,$7,$9);};//agregar tipo de funcion
Retorno: Return ContReturn PTCOMA {$$=Return($2);};
ContReturn: expresion {$$=$1;}| ;
Continuar: Continue PTCOMA {$$=Continuar();};

//Arreglo: Let IDENTIFICADOR DosPuntos TiposVars Dimensiones igual CORIZQ CORDER;
Dimensiones: Dimensiones Dimension | Dimension;
Dimension: CORIZQ CORDER;
FuncionExp: IDENTIFICADOR PARIZQ Parametros PARDER;
Parametros: Parametros Coma expresion | expresion;
ParamsEntrada: ParamsEntrada Coma ParamEntrada {$1.push($3);$$=$1;} | ParamEntrada {$$=[$1];}|;
ParamEntrada: IDENTIFICADOR DosPuntos TiposVars {$$=ParamE($1,$3);}| IDENTIFICADOR DosPuntos TiposVars Dimensiones ;//arreglar orden de estos parametro
BloqueSentencias: LlaveI sentencias LLaveD {$$=$2;}|LlaveI LLaveD {$$=0;};

//-----------SENTENCIA IF--------------------------------
IFS: If PARIZQ expresion PARDER BloqueSentencias Else IFS {$$=Si($3,$5,[$7]);}
	|If PARIZQ expresion PARDER BloqueSentencias Else BloqueSentencias {$$=Si($3,$5,$7);}
	|If PARIZQ expresion PARDER BloqueSentencias {$$=Si($3,$5);};
//-----------SENTENCIA IF TERNARIO-----------------------
IFT: expresion Ternario expresion DosPuntos expresion PTCOMA {$1.push($3);$1.push($5);$$ = $1;};
//-----------SENTENCIA SWITCH -----------------------------------
SUICH: Switch PARIZQ expresion PARDER LlaveI Casos LLaveD {$$=Switch($3,$6);};
//CasosDef: Casos Defaultt {$1.push($2);$$=$1;}| Casos {$$=[$1];}| Defaultt {$$=[$1];}|;
//Defaultt: Default DosPuntos LlaveI sentencias LLaveD {$$=Caso($4,0);};
Casos: Casos Caso {$1.push($2);$$=$1;}| Caso {$$=[$1];};
Caso: Case expresion DosPuntos LlaveI sentencias LLaveD {$$ = Caso($2,$5);console.log($$);}
	| Default DosPuntos LlaveI sentencias LLaveD {$$=Caso(0,$4);};
Breik: Break PTCOMA {$$=Breik();};
//------------SENTENCIA WHILE
Wail: While PARIZQ expresion PARDER LlaveI sentencias LLaveD {$$=While($3,$6);};
//------------SENTENCIA DO WHILE
DuWail: Do LlaveI sentencias LLaveD While PARIZQ expresion PARDER PTCOMA {$$=DoWhile($3,$7);};
//------------SENTENCIA FOR
//Four: ForNormal; //| ForOfIn;
ForNormal: For PARIZQ decAsign PTCOMA expresion PTCOMA IncDec PARDER LlaveI sentencias LLaveD {$$=For($3,$5,$7,$10);};
ForOfIn: For PARIZQ TipoVar IDENTIFICADOR OfIn IDENTIFICADOR PARDER LlaveI sentencias LLaveD;
OfIn: Of | In;
primero
		: Var IDENTIFICADOR DosPuntos expresion PTCOMA BarraInv EOF;
ini
	: instrucciones EOF
;

/*instrucciones
	: instruccion instrucciones
	| instruccion
	| error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

instruccion
	: REVALUAR CORIZQ expresion CORDER PTCOMA {
		console.log('El valor de la expresión es: ' + $3);)
	}
;*/

ExpComa: ExpComa Coma expresion | expresion;

expresion
	: MENOS expresion %prec UMENOS  { $$ = Operaciones($2,$2,0,operacion.Negativo,this._$.first_line,this._$.first_column ); }
	| expresion MAS expresion       { $$ = Operaciones($1, $3,0, operacion.Suma,this._$.first_line,this._$.first_column ); }
	| expresion MENOS expresion     { $$ = Operaciones($1, $3,0, operacion.Resta,this._$.first_line,this._$.first_column ); } 
	| expresion POR expresion       { $$ = Operaciones($1, $3,0, operacion.Multi,this._$.first_line,this._$.first_column ); }
	| expresion DIVIDIDO expresion  { $$ = Operaciones($1, $3,0, operacion.Divi,this._$.first_line,this._$.first_column ); }
	| expresion Potencia expresion	{ $$ = Operaciones($1, $3,0, operacion.Potencia,this._$.first_line,this._$.first_column ); }
	| expresion Modulo expresion	{ $$ = Operaciones($1, $3,0, operacion.Modulo,this._$.first_line,this._$.first_column ); }
	| expresion Menor expresion		{ $$ = Operaciones($1, $3,0, operacion.Menor,this._$.first_line,this._$.first_column ); }
	| expresion Mayor expresion		{ $$ = Operaciones($1, $3,0, operacion.Mayor,this._$.first_line,this._$.first_column ); }
	| expresion MenorIgual expresion	{ $$ = Operaciones($1,$3,0, operacion.MenorIgual,this._$.first_line,this._$.first_column ); }
	| expresion MayorIgual expresion	{ $$ = Operaciones($1,$3,0, operacion.MayorIgual,this._$.first_line,this._$.first_column ); }
	| expresion Diferente expresion		{ $$ = Operaciones($1,$3,0, operacion.Difer,this._$.first_line,this._$.first_column ); }
	| expresion Comparacion expresion	{ $$ = Operaciones($1,$3,0, operacion.Igual,this._$.first_line,this._$.first_column ); }
	| expresion And expresion		{ $$ = Operaciones($1, $3,0, operacion.And,this._$.first_line,this._$.first_column ); }
	| expresion Or expresion		{ $$ = Operaciones($1, $3,0, operacion.Or,this._$.first_line,this._$.first_column ); }
	| Not expresion					{ $$ = Operaciones($2,$2,0,operacion.Not,this._$.first_line,this._$.first_column ); }
	| ENTERO                        { $$ = AritmeticaConst(primitivos.Numero,$1,this._$.first_line,this._$.first_column); }
	| DECIMAL                       { $$ = AritmeticaConst(primitivos.Numero,$1,this._$.first_line,this._$.first_column); }
	| IDENTIFICADOR					{ $$ = AritmeticaConst(primitivos.Identificador,$1,this._$.first_line,this._$.first_column); }
	| LLamadaEjec					{ $$ = AritmeticaConst(primitivos.LLamarFuncion,$1,this._$.first_line,this._$.first_column); }	
	| AccesoMatrix
	| AccesoAtributo
	| CADENA						{ $$ = AritmeticaConst(primitivos.Cadena,$1,this._$.first_line,this._$.first_column); }
	| Trues							{ $$ = AritmeticaConst(primitivos.Booleano,true,this._$.first_line,this._$.first_column); }
	| Falses						{ $$ = AritmeticaConst(primitivos.Booleano,false,this._$.first_line,this._$.first_column); }
	| PARIZQ expresion PARDER       { $$ = $2; }
	| expresion Ternario expresion DosPuntos expresion {$$= Operaciones($1,$3,$5, operacion.Ternario,this._$.first_line,this._$.first_column);}
;

ListaExp: ListaExp Coma expresion {$1.push($3);$$=$1;} | expresion {$$=[$1];} | ;
LLamadaEjec: IDENTIFICADOR PARIZQ ListaExp PARDER {$$=LlamarF($1,$3);};
AccesoMatrix: IDENTIFICADOR DimensionesVal | IDENTIFICADOR Punto Length | IDENTIFICADOR DimensionesVal Punto Length;
AccesoAtributo: IDENTIFICADOR Punto IDENTIFICADOR;
DimensionesVal: DimensionesVal DimensionVal|DimensionVal;
DimensionVal: CORIZQ expresion CORDER;
MatrixSen: IDENTIFICADOR DimensionesVal Igual Dimensiones PTCOMA | IDENTIFICADOR DimensionesVal Igual expresion PTCOMA; 

