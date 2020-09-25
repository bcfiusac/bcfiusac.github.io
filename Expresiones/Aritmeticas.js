

const primitivos = {
    Numero: 'Numero',
    Cadena: 'Cadena',
    Booleano: 'Booleano',
    Identificador: 'Identificador',
    LLamarFuncion:'LLamarFuncion'

}
const operacion = {
    //aritmeticas
    Suma: 'Suma',
    Resta: 'Resta',
    Multi: 'Multi',
    Divi: 'Divi',
    Potencia: 'Potencia',
    Modulo: 'Modulo',
    //relacionales
    Mayor: 'Mayor',
    Menor: 'Menor',
    MayorIgual: 'MayorIgual',
    MenorIgual: 'MenorIgual',
    Igual: 'Igual',
    Difer: 'Difer',
    //logicas
    And: 'And',
    Or: 'Or',
    Not: 'Not',
    Negativo: 'Negativo',
    TipoBin: 'TipoBin',
    //ternario
    Ternario: 'Ternario'





}

function AritmeticaConst(Type, Value, Row, Column) {
    //console.log("ESTOY EN ARITMETICACONST");
    return {
        Type: Type,
        Value: Value,
        Row: Row,
        Column: Column

    }
}

function Operaciones(var1, var2, var3, Type, Row, Column) {
    //console.log("ESTOY EN OPERACIONES");
    return {
        var1: var1,
        var2: var2,
        var3: var3,
        Type: Type,
        Row: Row,
        Column: Column,
        Tipo: operacion.TipoBin
    }
}

//exp es toda la operacion 
function getValor(exp, tabSym) {
    //console.log("ESTOY EN GET VALOR");
    if (exp.Tipo === operacion.TipoBin) {
        const var1 = getValor(exp.var1, tabSym);
        const var1tipo = getTipo(exp.var1, tabSym);
        const var2 = getValor(exp.var2, tabSym);
        const var2tipo = getTipo(exp.var2, tabSym);//obtenido el valor y tipo de los operandos
        const var3 = getValor(exp.var3,tabSym);
        const var3tipo=getTipo(exp.var3,tabSym);
        if(exp.Type===operacion.Ternario){
            console.log("ESTOY EN EL TERNARIO");
        }
        else if (exp.Type === operacion.Suma) {//verifico que tipo de operacion es
            //console.log("viene una suma");

            //COMIENZA LA VALIDACION ENTRE TIPOS
            //console.log("primero de tipo-> " + var1tipo + " segundo de tipo-> " + var2tipo);
            if (var1tipo === primitivos.Numero && var2tipo === primitivos.Numero) {//number + number
                //console.log("numero y numero");
                varR = Number(var1) + Number(var2);
                //console.log("Resultado: " + varR);

                return varR;

            }
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Cadena) {//number + cadena
                varR = var1 + var2;
                //tipo cadena
                return varR;
            }
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Booleano) {//number + booleano
                //console.log("numero y booleano");
                if (var2 === 'true') {
                    varR = var1 + 1;
                    //tipo number
                    return varR; c
                }
                else {
                    varR = var1;
                    //tipo number
                    return varR;
                }
            }
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {//number + identificador
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    varR = Number(var1) + Number(simbolingo.value);
                    return varR;
                }
                else if (simbolingo.tipo === "Cadena") {
                    varR = var1 + simbolingo.value;
                    return varR;
                }
                else {
                    console.log("ERROR - NO SE PUEDE SUMAR UN NUMERO CON UN BOOLEANO");
                }

            }
            //SE ACABARON LAS VALIDACIONES PARA NUMBER COMO VAR1
            else if (var1tipo === primitivos.Cadena && var2tipo === primitivos.Numero) {//cadena + number
                varR = var1 + var2;
                return varR;
            }
            else if (var1tipo === primitivos.Cadena && var2tipo === primitivos.Cadena) {//cadena + cadena
                varR = var1 + var2;
                //tipo cadena
                return varR;
            }
            else if (var1tipo === primitivos.Cadena && var2tipo === primitivos.Booleano) {//cadena + booleano
                varR = var1 + var2;
                //tipo cadena
                return varR;
            }
            else if (var1tipo === primitivos.Cadena && var2tipo === primitivos.Identificador) {//cadena + identificador
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero" || simbolingo.tipo === "Cadena" || simbolingo.tipo === "Booleano") {
                    varR = var1 + simbolingo.value;
                    return varR;
                }


            }
            //SE ACABARON LAS VALIDACIONES PARA CADENA COMO VAR1
            else if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Numero) {//booleano + number
                console.log("ERROR DE TIPOS - NO SE PUEDE SUMAR UN BOOL Y NUMERO");

            }
            else if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Cadena) {//booleano + cadena
                varR = var1 + var2;
                return varR;
            }
            else if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Booleano) {//booleano + booleano
                console.log("Error - No se puede operar booleanos con el simbolo +");

            }
            else if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Identificador) {//booleano + ident
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero" || simbolingo.tipo === "Booleano") {
                    console.log("ERROR - NO SE PUEDE SUMAR UN BOOLEANO CON UN NUMERO")
                }
                else if (simbolingo.tipo === "Cadena") {
                    varR = var1 + simbolingo.value;
                    return varR;

                }
                else {
                    console.log("ERROR - NO SE PUEDE SUMAR UN NUMERO CON UN BOOLEANO");
                }
            }
            //SE ACABARON LAS VALIDACIONES COMO BOOLEANO PARA VAR1
            else if (var1tipo === primitivos.Identificador && var2tipo === primitivos.Numero) {//identif + number
                simbolingo = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo.tipo === "Numero") {
                    varR = Number(simbolingo.value) + Number(var2);
                    return varR;
                }
                else if (simbolingo.tipo === "Cadena") {
                    varR = simbolingo.value + var2;
                    return varR;
                }
                else if (simbolingo.tipo === "Booleano") {
                    console.log("Error - no se pueden sumar un booleano con un numero");
                }

            }
            else if (var1tipo === primitivos.Identificador && var2tipo === primitivos.Cadena) {//identif + cadena
                simbolingo = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo.tipo === "Numero") {
                    varR = simbolingo.value + var2;
                    return varR;
                }
                else if (simbolingo.tipo === "Cadena") {
                    varR = simbolingo.value + var2;
                    return varR;
                }
                else if (simbolingo.tipo === "Booleano") {
                    varR = simbolingo.value + var2;
                    return varR;
                }
            }
            else if (var1tipo === primitivos.Identificador && var2tipo === primitivos.Booleano) {//identif + number
                //todavia no tengo mi tabla de simbolos :'v
                simbolingo = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo.tipo === "Numero" || simbolingo.tipo === "Booleano") {
                    console.log("ERROR - NO SE PUEDE SUMAR UN NUMBER/BOOLEANO Y UN BOOLEANO");
                }
                else if (simbolingo.tipo === "Cadena") {
                    varR = simbolingo.value + var2;
                    return varR;
                }

            }
            else if (var1tipo === primitivos.Identificador && var2tipo === primitivos.Identificador) {//identif + ident   
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (simbolingo2.tipo === "Numero") {
                        varR = Number(simbolingo1.value) + Number(simbolingo2.value);
                        return varR;
                    }
                    else if (simbolingo2.tipo === "Cadena") {
                        varR = simbolingo1.value + simbolingo2.value;
                        return varR;
                    }
                    else if (simbolingo2.tipo === "Booleano") {
                        console.log("ERROR - NO SE PUEDEN SUMAR ENTEROS CON BOOLEANOS");
                    }
                }
                else if (simbolingo1.tipo === "Cadena") {
                    if (simbolingo2.tipo === "Numero") {
                        varR = simbolingo1.value + simbolingo2.value;
                        return varR;
                    }
                    else if (simbolingo2.tipo === "Cadena") {
                        varR = simbolingo1.value + simbolingo2.value;
                        return varR;
                    }
                    else if (simbolingo2.tipo === "Booleano") {
                        varR = simbolingo1.value + simbolingo2.value;
                        return varR;
                    }
                }
                else if (simbolingo1.tipo === "Booleano") {
                    if (simbolingo2.tipo === "Numero") {
                        console.log("ERROR - NO SE PUEDEN SUMAR NUMEROS CON BOOLEANOS");
                    }
                    else if (simbolingo2.tipo === "Cadena") {
                        varR = simbolingo1.value + simbolingo2.value;
                        return varR;
                    }
                    else if (simbolingo2.tipo === "Booleano") {
                        console.log("ERROR - NO SE PUEDEN SUMAR BOOLEANOS");

                    }
                }
            }




        }
        else if (exp.Type === operacion.Resta) {
            //validaciones para la resta

            if (var1tipo === primitivos.Numero && var2tipo === primitivos.Numero) {//number-number

                varR = var1 - var2;
                return varR;
            }
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Cadena) {//number-cadena
                console.log("ERROR - NO SE PUEDE RESTAR UN NUMERO Y UNA CADENA");
            }
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Booleano) {//number-booleano
                console.log("ERROR - NO SE PUEDE RESTAR UN NUMERO Y UN BOOLEANO");
            }
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {//number-identi
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    varR = Number(var1) - Number(simbolingo.value);
                    return varR;

                }
                else if (simbolingo.tipo === "Booleano" || simbolingo.tipo === "Cadena") {
                    console.log("ERROR - NO SE PUEDEN RESTAR UN ENTERO Y UN BOOLEANO O CADENA");
                }

            }
            //TERMINAN VALIDACIONES PARA VAR1 COMO NUMBER
            else if (var1tipo === primitivos.Cadena || var1tipo === primitivos.Booleano) {//cadena o bool -Error-
                console.log("ERROR - NO SE PUEDEN RESTAR LAS CADENAS Y BOOLEANOS");
            }
            else if (var1tipo === primitivos.Identificador && var2tipo === primitivos.Numero) {//identi-number
                simbolingo = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo.tipo === "Numero") {
                    varR = Number(simbolingo.value) - Number(var2);
                    return varR;

                }
                else if (simbolingo.tipo === "Booleano" || simbolingo.tipo === "Cadena") {
                    console.log("ERROR - NO SE PUEDEN RESTAR UN ENTERO Y UN BOOLEANO O CADENA");
                }
            }
            else if (var1tipo === primitivos.Identificador && var2tipo === primitivos.Identificador) {//identis
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo1.tipo === "Numero") {//primer id = numero
                    if (simbolingo2.tipo === "Numero") {//segundo id = numero
                        varR = Number(simbolingo1.value) - Number(simbolingo2.value);
                        return varR;
                    }
                    else {
                        console.log("ERROR - NO SE PUEDE RESTAR UN STRING O BOOL A UN ENTERO");
                    }
                }
                else {
                    console.log("ERROR - NO SE LE PUEDE RESTAR A UN STRING O BOOL");
                }
            }
        }
        else if (exp.Type === operacion.Multi) {
            //validaciones para la multiplicacion

            if (var1tipo === primitivos.Numero) {//si el primero es number
                if (var2tipo === primitivos.Numero) {
                    varR = Number(var1) * Number(var2);
                    return varR;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        varR = Number(var1) * Number(simbolingo.value);
                        return varR;
                    }


                }
                else {
                    console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN MULTIPLICAR");
                }
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (var2tipo === primitivos.Numero) {
                        varR = Number(simbolingo1.value) * Number(var2);
                        return varR;
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo2.tipo === "Numero") {
                            varR = Number(simbolingo1.value) * Number(simbolingo2.value);
                            return varR;
                        }
                        else {
                            console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN MULTIPLICAR");
                        }
                    }
                    else {
                        console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN MULTIPLICAR");
                    }
                }
                else {
                    console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN MULTIPLICAR");
                }

            }
            else {
                console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN MULTIPLICAR");
            }
        }
        else if (exp.Type === operacion.Divi) {
            //validaciones para la division
            if (var1tipo === primitivos.Numero) {//si el primero es number
                if (var2tipo === primitivos.Numero) {
                    varR = Number(var1) / Number(var2);
                    return varR;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        varR = Number(var1) / Number(simbolingo.value);
                        return varR;
                    }


                }
                else {
                    console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                }
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (var2tipo === primitivos.Numero) {
                        varR = Number(simbolingo1.value) / Number(var2);
                        return varR;
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo2.tipo === "Numero") {
                            varR = Number(simbolingo1.value) / Number(simbolingo2.value);
                            return varR;
                        }
                        else {
                            console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                        }
                    }
                    else {
                        console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                    }
                }
                else {
                    console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                }

            }
            else {
                console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
            }
        }
        else if (exp.Type === operacion.Potencia) {
            //validaciones para la potencia

            if (var1tipo === primitivos.Numero) {//si el primero es number
                if (var2tipo === primitivos.Numero) {
                    varR = Math.pow(Number(var1), Number(var2));
                    return varR;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        varR = Math.pow(Number(var1), Number(simbolingo.value));
                        return varR;
                    }


                }
                else {
                    console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN ELEVAR");
                }
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (var2tipo === primitivos.Numero) {
                        varR = Math.pow(Number(simbolingo1.value), Number(var2));
                        return varR;
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo2.tipo === "Numero") {
                            varR = Math.pow(Number(simbolingo1.value), Number(simbolingo2.value));
                            return varR;
                        }
                        else {
                            console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN ELEVAR");
                        }
                    }
                    else {
                        console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN ELEVAR");
                    }
                }
                else {
                    console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN ELEVAR");
                }

            }
            else {
                console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN ELEVAR");
            }
        }
        else if (exp.Type === operacion.Modulo) {
            //validaciones para el modulo

            if (var1tipo === primitivos.Numero) {//si el primero es number
                if (var2tipo === primitivos.Numero) {
                    varR = Number(var1) % Number(var2);
                    return varR;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        varR = Number(var1) % Number(simbolingo.value);
                        return varR;
                    }


                }
                else {
                    console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                }
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (var2tipo === primitivos.Numero) {
                        varR = Number(simbolingo1.value) % Number(var2);
                        return varR;
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo2.tipo === "Numero") {
                            varR = Number(simbolingo1.value) % Number(simbolingo2.value);
                            return varR;
                        }
                        else {
                            console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                        }
                    }
                    else {
                        console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                    }
                }
                else {
                    console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                }

            }
            else {
                console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
            }
        }
        //MAYOR ----------------------------------------------------------------------------------------------------
        else if (exp.Type === operacion.Mayor) {
            console.log("ESTOY EN MAYOR!");
            if (var1tipo === primitivos.Numero) {//numero > 
                if (var2tipo === primitivos.Numero) {       //numero
                    if (Number(var1) > Number(var2)) {

                        return true;
                    }
                    else {

                        return false;
                    }
                }
                else if (var2tipo === primitivos.Booleano) {//error de comparación entre un number y bool
                    varR = 'Error de tipos';
                    return varR;
                }
                else if (var2tipo === primitivos.Cadena) {//error de comparación entre un number y cadena
                    varR = 'Error de tipos';
                    return varR;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        if (Number(var1) > Number(simbolingo.value)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("NO SE PUEDE COMPARAR UN ENTERO CON UN BOOL O CADENA");
                    }
                }
            }
            else if (var1tipo === primitivos.Booleano) {//booleano > 
                if (var2tipo === primitivos.Booleano) {
                    if (var1 > var2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Booleano") {
                        if (var1 > simbolingo.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("BOOL NO SE PUEDE COMPARAR CON UNA CADENA O NUMERO");
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Cadena) {
                    return 'Error';
                }
            }
            else if (var1tipo === primitivos.Cadena) {
                if (var2tipo === primitivos.Cadena) {
                    if (var1 > var2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Cadena") {
                        if (var2 > simbolingo.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("CADENA NO SE PUEDE COMPARAR CON BOOL O NUMERO");
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Booleano) {
                    return 'Error';
                }
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo2.tipo === "Numero") {
                        if (Number(simbolingo1.value) > Number(simbolingo2.value)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {

                    }
                }
                else if (simbolingo1.tipo === "Cadena") {
                    if (simbolingo2.tipo === "Cadena") {
                        if (simbolingo1.value > simbolingo2.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS")
                    }
                }
                else if (simbolingo1.tipo === "Booleano") {
                    if (simbolingo2.tipo === "Booleano") {
                        if (simbolingo1.value > simbolingo2.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS");
                    }

                }
            }


        }
        //MENOR -----------------------------------------------------------------------------------
        else if (exp.Type === operacion.Menor) {
            console.log("ESTOY EN MENOR!");
            if (var1tipo === primitivos.Numero) {//numero > 
                if (var2tipo === primitivos.Numero) {       //numero
                    if (Number(var1) < Number(var2)) {

                        return true;
                    }
                    else {

                        return false;
                    }
                }
                else if (var2tipo === primitivos.Booleano) {//error de comparación entre un number y bool
                    varR = 'Error de tipos';
                    return varR;
                }
                else if (var2tipo === primitivos.Cadena) {//error de comparación entre un number y cadena
                    varR = 'Error de tipos';
                    return varR;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        if (Number(var1) < Number(simbolingo.value)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("NO SE PUEDE COMPARAR UN ENTERO CON UN BOOL O CADENA");
                    }
                }
            }
            else if (var1tipo === primitivos.Booleano) {//booleano > 
                if (var2tipo === primitivos.Booleano) {
                    if (var1 < var2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Booleano") {
                        if (var1 < simbolingo.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("BOOL NO SE PUEDE COMPARAR CON UNA CADENA O NUMERO");
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Cadena) {
                    return 'Error';
                }
            }
            else if (var1tipo === primitivos.Cadena) {
                if (var2tipo === primitivos.Cadena) {
                    if (var1 < var2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Cadena") {
                        if (var2 < simbolingo.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("CADENA NO SE PUEDE COMPARAR CON BOOL O NUMERO");
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Booleano) {
                    return 'Error';
                }
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo2.tipo === "Numero") {
                        if (Number(simbolingo1.value) < Number(simbolingo2.value)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {

                    }
                }
                else if (simbolingo1.tipo === "Cadena") {
                    if (simbolingo2.tipo === "Cadena") {
                        if (simbolingo1.value < simbolingo2.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS")
                    }
                }
                else if (simbolingo1.tipo === "Booleano") {
                    if (simbolingo2.tipo === "Booleano") {
                        if (simbolingo1.value < simbolingo2.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS");
                    }

                }
            }


        }
        //MAYOR IGUAL -----------------------------------------------------------------------------------------------
        else if (exp.Type === operacion.MayorIgual) {
            console.log("ESTOY EN MAYOR!");
            if (var1tipo === primitivos.Numero) {//numero > 
                if (var2tipo === primitivos.Numero) {       //numero
                    if (Number(var1) >= Number(var2)) {

                        return true;
                    }
                    else {

                        return false;
                    }
                }
                else if (var2tipo === primitivos.Booleano) {//error de comparación entre un number y bool
                    varR = 'Error de tipos';
                    return varR;
                }
                else if (var2tipo === primitivos.Cadena) {//error de comparación entre un number y cadena
                    varR = 'Error de tipos';
                    return varR;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        if (Number(var1) >= Number(simbolingo.value)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("NO SE PUEDE COMPARAR UN ENTERO CON UN BOOL O CADENA");
                    }
                }
            }
            else if (var1tipo === primitivos.Booleano) {//booleano > 
                if (var2tipo === primitivos.Booleano) {
                    if (var1 >= var2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Booleano") {
                        if (var1 >= simbolingo.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("BOOL NO SE PUEDE COMPARAR CON UNA CADENA O NUMERO");
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Cadena) {
                    return 'Error';
                }
            }
            else if (var1tipo === primitivos.Cadena) {
                if (var2tipo === primitivos.Cadena) {
                    if (var1 >= var2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Cadena") {
                        if (var2 >= simbolingo.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("CADENA NO SE PUEDE COMPARAR CON BOOL O NUMERO");
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Booleano) {
                    return 'Error';
                }
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo2.tipo === "Numero") {
                        if (Number(simbolingo1.value) >= Number(simbolingo2.value)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {

                    }
                }
                else if (simbolingo1.tipo === "Cadena") {
                    if (simbolingo2.tipo === "Cadena") {
                        if (simbolingo1.value >= simbolingo2.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS")
                    }
                }
                else if (simbolingo1.tipo === "Booleano") {
                    if (simbolingo2.tipo === "Booleano") {
                        if (simbolingo1.value >= simbolingo2.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS");
                    }

                }
            }
        }
        //MENOR IGUAL ----------------------------------------------------------------------------------
        else if (exp.Type === operacion.MenorIgual) {
            console.log("ESTOY EN MAYOR!");
            if (var1tipo === primitivos.Numero) {//numero > 
                if (var2tipo === primitivos.Numero) {       //numero
                    if (Number(var1) <= Number(var2)) {

                        return true;
                    }
                    else {

                        return false;
                    }
                }
                else if (var2tipo === primitivos.Booleano) {//error de comparación entre un number y bool
                    varR = 'Error de tipos';
                    return varR;
                }
                else if (var2tipo === primitivos.Cadena) {//error de comparación entre un number y cadena
                    varR = 'Error de tipos';
                    return varR;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        if (Number(var1) <= Number(simbolingo.value)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("NO SE PUEDE COMPARAR UN ENTERO CON UN BOOL O CADENA");
                    }
                }
            }
            else if (var1tipo === primitivos.Booleano) {//booleano > 
                if (var2tipo === primitivos.Booleano) {
                    if (var1 <= var2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Booleano") {
                        if (var1 <= simbolingo.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("BOOL NO SE PUEDE COMPARAR CON UNA CADENA O NUMERO");
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Cadena) {
                    return 'Error';
                }
            }
            else if (var1tipo === primitivos.Cadena) {
                if (var2tipo === primitivos.Cadena) {
                    if (var1 <= var2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Cadena") {
                        if (var2 <= simbolingo.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("CADENA NO SE PUEDE COMPARAR CON BOOL O NUMERO");
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Booleano) {
                    return 'Error';
                }
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo2.tipo === "Numero") {
                        if (Number(simbolingo1.value) <= Number(simbolingo2.value)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {

                    }
                }
                else if (simbolingo1.tipo === "Cadena") {
                    if (simbolingo2.tipo === "Cadena") {
                        if (simbolingo1.value <= simbolingo2.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS")
                    }
                }
                else if (simbolingo1.tipo === "Booleano") {
                    if (simbolingo2.tipo === "Booleano") {
                        if (simbolingo1.value > simbolingo2.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS");
                    }

                }
            }
        }
        //IGUAL------------------------------------------------------------------------------------------------
        else if (exp.Type === operacion.Igual) {
            console.log("ESTOY EN MAYOR!");
            if (var1tipo === primitivos.Numero) {//numero > 
                if (var2tipo === primitivos.Numero) {       //numero
                    if (Number(var1) === Number(var2)) {

                        return true;
                    }
                    else {

                        return false;
                    }
                }
                else if (var2tipo === primitivos.Booleano) {//error de comparación entre un number y bool
                    varR = 'Error de tipos';
                    return varR;
                }
                else if (var2tipo === primitivos.Cadena) {//error de comparación entre un number y cadena
                    varR = 'Error de tipos';
                    return varR;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        if (Number(var1) === Number(simbolingo.value)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("NO SE PUEDE COMPARAR UN ENTERO CON UN BOOL O CADENA");
                    }
                }
            }
            else if (var1tipo === primitivos.Booleano) {//booleano > 
                if (var2tipo === primitivos.Booleano) {
                    if (var1 === var2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Booleano") {
                        if (var1 === simbolingo.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("BOOL NO SE PUEDE COMPARAR CON UNA CADENA O NUMERO");
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Cadena) {
                    return 'Error';
                }
            }
            else if (var1tipo === primitivos.Cadena) {
                if (var2tipo === primitivos.Cadena) {
                    if (var1 === var2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Cadena") {
                        if (var2 === simbolingo.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("CADENA NO SE PUEDE COMPARAR CON BOOL O NUMERO");
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Booleano) {
                    return 'Error';
                }
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo2.tipo === "Numero") {
                        if (Number(simbolingo1.value) === Number(simbolingo2.value)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {

                    }
                }
                else if (simbolingo1.tipo === "Cadena") {
                    if (simbolingo2.tipo === "Cadena") {
                        if (simbolingo1.value > simbolingo2.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS")
                    }
                }
                else if (simbolingo1.tipo === "Booleano") {
                    if (simbolingo2.tipo === "Booleano") {
                        if (simbolingo1.value === simbolingo2.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS");
                    }

                }
            }
        }
        //DIFERENTE ---------------------------------------------------------------------------
        else if (exp.Type === operacion.Difer) {
            console.log("ESTOY EN MAYOR!");
            if (var1tipo === primitivos.Numero) {//numero > 
                if (var2tipo === primitivos.Numero) {       //numero
                    if (Number(var1) != Number(var2)) {

                        return true;
                    }
                    else {

                        return false;
                    }
                }
                else if (var2tipo === primitivos.Booleano) {//error de comparación entre un number y bool
                    varR = 'Error de tipos';
                    return varR;
                }
                else if (var2tipo === primitivos.Cadena) {//error de comparación entre un number y cadena
                    varR = 'Error de tipos';
                    return varR;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        if (Number(var1) != Number(simbolingo.value)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("NO SE PUEDE COMPARAR UN ENTERO CON UN BOOL O CADENA");
                    }
                }
            }
            else if (var1tipo === primitivos.Booleano) {//booleano > 
                if (var2tipo === primitivos.Booleano) {
                    if (var1 != var2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Booleano") {
                        if (var1 != simbolingo.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("BOOL NO SE PUEDE COMPARAR CON UNA CADENA O NUMERO");
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Cadena) {
                    return 'Error';
                }
            }
            else if (var1tipo === primitivos.Cadena) {
                if (var2tipo === primitivos.Cadena) {
                    if (var1 != var2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Cadena") {
                        if (var2 != simbolingo.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("CADENA NO SE PUEDE COMPARAR CON BOOL O NUMERO");
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Booleano) {
                    return 'Error';
                }
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo2.tipo === "Numero") {
                        if (Number(simbolingo1.value) != Number(simbolingo2.value)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {

                    }
                }
                else if (simbolingo1.tipo === "Cadena") {
                    if (simbolingo2.tipo === "Cadena") {
                        if (simbolingo1.value != simbolingo2.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS")
                    }
                }
                else if (simbolingo1.tipo === "Booleano") {
                    if (simbolingo2.tipo === "Booleano") {
                        if (simbolingo1.value != simbolingo2.value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS");
                    }

                }
            }
        }
        //NOT ----------------------------------------------------------------------------------------------------------
        else if (exp.Type === operacion.Not) {
            console.log("ESTOY EN UN NOT");
            if (var2tipo === primitivos.Booleano) {
                return !var2;
            }
            else if (var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo.tipo === "Booleano") {
                    return !simbolingo.value;
                }
                else if(simbolingo.tipo==="Numero") {
                    if(Number(simbolingo.value)>0){
                        return false;
                    }
                    else{
                        return true;
                    }
                    
                }
                else if(simbolingo.tipo==="Cadena"){
                    if(simbolingo.value.length>0){
                        return false;
                    }
                    else{
                        return true;
                    }
                }

            }
            else if (var2tipo === primitivos.Numero ) {
                if(Number(var2)>0){
                    return false;
                }
                else{
                    return true;
                }
            }
            else if(var2tipo === primitivos.Cadena){
                if(var2.length>0){
                    return false;
                }
                else{
                    return true;
                }
            }
            //NEGATIVO ----------------------------------------------------------------------------------------------------
        }
        else if (exp.Type === operacion.Negativo) {
            if (var2tipo === primitivos.Numero) {
                return -Number(var2);
            }
            else if (var2tipo === primitivos.Cadena) {
                console.log("ERROR - NO SE PUEDE PASAR A NEGATIVO UN STRING");
            }
            else if (var2tipo === primitivos.Booleano) {
                if (var2tipo) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
            else if (var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo = "Numero") {
                    return -Number(simbolingo.value);
                }
                else if (simbolingo.tipo === "Cadena") {
                    console.log("ERROR - NO SE PUEDE PASAR A NEGATIVO UN STRING");
                }
                else if (simbolingo.tipo === "Booleano") {
                    if (simbolingo.value) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                }
            }


            /*console.log("estoy en un negativo");
            varFinal = getValor(exp.var1, tabSym);
            varFinalTipo = getTipo(exp.var1, tabSym);
            if (varFinalTipo === primitivos.Numero) {
                return -varFinal;
            }
            else if (varFinalTipo === primitivos.Booleano) {
                if (varFinal === true) {
                    return -1;
                }
                else {
                    return 0;
                }
            }*/
        }
        else if (exp.Type === operacion.And) {
            //VAR1 ---- NUMERO
            if(var1tipo=== primitivos.Numero){
                if(var2tipo===primitivos.Numero){
                    return Number(var1) && Number (var2);
                }
                else if(var2tipo===primitivos.Booleano){
                    return Number(var1) && var2;
                }
                else if(var2tipo===primitivos.Cadena){
                    return Number(var1) && var2;
                }
                else if(var2tipo===primitivos.Identificador){
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if(simbolingo.tipo==="Numero"){
                        return Number(var1) && Number(simbolingo.value);
                    }
                    else if(simbolingo.tipo==="Cadena"){
                        return Number(var1) && Number(simbolingo.value);
                    }
                    else if(simbolingo.tipo==="Booleano"){
                        return Number(var1) && Number(simbolingo.value);
                    }
                }
                
            }
            //VAR1 ------ CADENA
            else if(var1tipo===primitivos.Cadena){
                if(var2tipo === primitivos.Numero){
                    return var1 && Number(var2);
                }
                else if(var2tipo===primitivos.Cadena){
                    return var1 && var2;
                }
                else if(var2tipo===primitivos.Booleano){
                    return var1 && var2;
                }
                else if(var2tipo===primitivos.Identificador){
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if(simbolingo.tipo==="Numero"){
                        return var1 && Number(simbolingo.value);
                    }
                    else if(simbolingo.tipo==="Cadena"){
                        return var1 && simbolingo.value;
                    }
                    else if(simbolingo.tipo==="Booleano"){
                        return var1 && simbolingo.value;
                    }
                }
            }
            //VAR1 ---------- BOOLEANO
            else if (var1tipo === primitivos.Booleano) {
                if (var2tipo === primitivos.Booleano) {
                    return var1 && var2;
                }
                else if(var2tipo===primitivos.Numero){
                    return var1 && Number(var2);
                }
                else if(var2tipo===primitivos.Cadena){
                    return var1 && var2;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if(simbolingo.tipo==="Booleano"){
                        return var1 && simbolingo.value;
                    }
                    else if(simbolingo.tipo==="Numero"){
                        return var1 && Number(simbolingo.value);
                    }
                    else if(simbolingo.tipo==="Cadena"){
                        return var1 && var2;
                    }
                }
            }
            //VAR1 ---------------- IDENTIFICADOR
            else if(var1tipo===primitivos.Identificador){
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if(simbolingo1.tipo==="Numero"){
                    if(var2tipo===primitivos.Numero){
                        return Number(simbolingo1.value) && Number(var2);
                    }
                    else if(var2tipo===primitivos.Cadena){
                        return Number(simbolingo1.value) && var2;
                    }
                    else if(var2tipo===primitivos.Booleano){
                        return Number(simbolingo1.value) && var2;
                    }
                    else if(var2tipo===primitivos.Identificador){
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if(simbolingo2.tipo==="Numero"){
                            return Number(simbolingo1.value) && Number(simbolingo2.value);
                        }
                        else if(simbolingo2.tipo==="Cadena"){
                            return Number(simbolingo1.value) && simbolingo2.value;
                        }
                        else if(simbolingo2.tipo==="Booleano"){
                            return Number(simbolingo1.value) && simbolingo2.value;
                        }
                    }
                }
                else if(simbolingo1.tipo==="Cadena"){
                    if(var2tipo===primitivos.Numero){
                        return Number(simbolingo1.value) && Number(var2);
                    }
                    else if(var2tipo===primitivos.Cadena){
                        return simbolingo1.value && var2;
                    }
                    else if(var2tipo===primitivos.Booleano){
                        return simbolingo1.value && var2;
                    }
                    else if(var2tipo===primitivos.Identificador){
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if(simbolingo2.tipo==="Numero"){
                            return simbolingo1.value && Number(simbolingo2.value);
                        }
                        else if(simbolingo2.tipo==="Cadena"){
                            return simbolingo1.value && simbolingo2.value;
                        }
                        else if(simbolingo2.tipo==="Booleano"){
                            return simbolingo1.value && simbolingo2.value;
                        }
                    }
                }
                else if(simbolingo1.tipo==="Booleano"){
                    if(var2tipo===primitivos.Numero){
                        return simbolingo1.value && Number(var2);
                    }
                    else if(var2tipo===primitivos.Cadena){
                        return simbolingo1.value && var2;
                    }
                    else if(var2tipo===primitivos.Booleano){
                        return simbolingo1.value && var2;
                    }
                    else if(var2tipo===primitivos.Identificador){
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if(simbolingo2.tipo==="Numero"){
                            return simbolingo1.value && Number(simbolingo2.value);
                        }
                        else if(simbolingo2.tipo==="Cadena"){
                            return simbolingo1.value && simbolingo2.value;
                        }
                        else if(simbolingo2.tipo==="Booleano"){
                            return simbolingo1.value && simbolingo2.value;
                        }
                    }
                }
                
            }

        }
        else if (exp.Type === operacion.Or) {
            //VAR1 ---- NUMERO
            if(var1tipo=== primitivos.Numero){
                if(var2tipo===primitivos.Numero){
                    return Number(var1) || Number (var2);
                }
                else if(var2tipo===primitivos.Booleano){
                    return Number(var1) || var2;
                }
                else if(var2tipo===primitivos.Cadena){
                    return Number(var1) || var2;
                }
                else if(var2tipo===primitivos.Identificador){
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if(simbolingo.tipo==="Numero"){
                        return Number(var1) || Number(simbolingo.value);
                    }
                    else if(simbolingo.tipo==="Cadena"){
                        return Number(var1) || Number(simbolingo.value);
                    }
                    else if(simbolingo.tipo==="Booleano"){
                        return Number(var1) || Number(simbolingo.value);
                    }
                }
                
            }
            //VAR1 ------ CADENA
            else if(var1tipo===primitivos.Cadena){
                if(var2tipo === primitivos.Numero){
                    return var1 || Number(var2);
                }
                else if(var2tipo===primitivos.Cadena){
                    return var1 || var2;
                }
                else if(var2tipo===primitivos.Booleano){
                    return var1 || var2;
                }
                else if(var2tipo===primitivos.Identificador){
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if(simbolingo.tipo==="Numero"){
                        return var1 || Number(simbolingo.value);
                    }
                    else if(simbolingo.tipo==="Cadena"){
                        return var1 || simbolingo.value;
                    }
                    else if(simbolingo.tipo==="Booleano"){
                        return var1 || simbolingo.value;
                    }
                }
            }
            //VAR1 ---------- BOOLEANO
            else if (var1tipo === primitivos.Booleano) {
                if (var2tipo === primitivos.Booleano) {
                    return var1 || var2;
                }
                else if(var2tipo===primitivos.Numero){
                    return var1 || Number(var2);
                }
                else if(var2tipo===primitivos.Cadena){
                    return var1 || var2;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if(simbolingo.tipo==="Booleano"){
                        return var1 || simbolingo.value;
                    }
                    else if(simbolingo.tipo==="Numero"){
                        return var1 || Number(simbolingo.value);
                    }
                    else if(simbolingo.tipo==="Cadena"){
                        return var1 || var2;
                    }
                }
            }
            //VAR1 ---------------- IDENTIFICADOR
            else if(var1tipo===primitivos.Identificador){
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if(simbolingo1.tipo==="Numero"){
                    if(var2tipo===primitivos.Numero){
                        return Number(simbolingo1.value) || Number(var2);
                    }
                    else if(var2tipo===primitivos.Cadena){
                        return Number(simbolingo1.value) || var2;
                    }
                    else if(var2tipo===primitivos.Booleano){
                        return Number(simbolingo1.value) || var2;
                    }
                    else if(var2tipo===primitivos.Identificador){
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if(simbolingo2.tipo==="Numero"){
                            return Number(simbolingo1.value) || Number(simbolingo2.value);
                        }
                        else if(simbolingo2.tipo==="Cadena"){
                            return Number(simbolingo1.value) || simbolingo2.value;
                        }
                        else if(simbolingo2.tipo==="Booleano"){
                            return Number(simbolingo1.value) || simbolingo2.value;
                        }
                    }
                }
                else if(simbolingo1.tipo==="Cadena"){
                    if(var2tipo===primitivos.Numero){
                        return Number(simbolingo1.value) || Number(var2);
                    }
                    else if(var2tipo===primitivos.Cadena){
                        return simbolingo1.value || var2;
                    }
                    else if(var2tipo===primitivos.Booleano){
                        return simbolingo1.value || var2;
                    }
                    else if(var2tipo===primitivos.Identificador){
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if(simbolingo2.tipo==="Numero"){
                            return simbolingo1.value || Number(simbolingo2.value);
                        }
                        else if(simbolingo2.tipo==="Cadena"){
                            return simbolingo1.value || simbolingo2.value;
                        }
                        else if(simbolingo2.tipo==="Booleano"){
                            return simbolingo1.value || simbolingo2.value;
                        }
                    }
                }
                else if(simbolingo1.tipo==="Booleano"){
                    if(var2tipo===primitivos.Numero){
                        return simbolingo1.value || Number(var2);
                    }
                    else if(var2tipo===primitivos.Cadena){
                        return simbolingo1.value || var2;
                    }
                    else if(var2tipo===primitivos.Booleano){
                        return simbolingo1.value || var2;
                    }
                    else if(var2tipo===primitivos.Identificador){
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if(simbolingo2.tipo==="Numero"){
                            return simbolingo1.value || Number(simbolingo2.value);
                        }
                        else if(simbolingo2.tipo==="Cadena"){
                            return simbolingo1.value || simbolingo2.value;
                        }
                        else if(simbolingo2.tipo==="Booleano"){
                            return simbolingo1.value || simbolingo2.value;
                        }
                    }
                }
                
            }

        }


    }


    else if(exp.Type===primitivos.LLamarFuncion){
        console.log("ENCONTRE UN OPERADOR DE TIPO FUNCION");
        ahora = getValorFuncion(exp.Value,tabSym);
        return ahora;
    }

    else if (exp.Type === primitivos.Numero) {
        return Number(exp.Value);
    }
    else if (exp.Type === primitivos.Cadena) {
        return exp.Value;
    }
    else if (exp.Type === primitivos.Booleano) {
        return exp.Value;
    }
    else if (exp.Type === primitivos.Identificador) {
        if(tabSym.Anterior){
            //la tabla tiene un padre
            temporal = tabSym;
            while(temporal!=null){
                simbolingo = temporal.getSimbolo(exp.Value);
                if(simbolingo==="ERROR"){
                    temporal = temporal.Anterior;
                }
                else{
                    
                    return simbolingo.value;
                }
                
            }
            /*temporalprueba = temporal;
            simbolillo = temporal.getSimbolo(exp.Value);
            if(simbolillo) {
                return simbolillo.value;
            }
            else{
                console.log("VARIABLE TODAVIA NO DECLARADA EN LOS ENTORNOS ACTUALES");
            }*/
        }
        else{
            //es la tabla global
            simbolingo = tabSym.getSimbolo(exp.Value);
            return simbolingo.value;
        }
        
    }




}
//---------------------------------------------------------------------------------------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//---------------------------------------------------------------------------------------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//---------------------------------------------------------------------------------------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//---------------------------------------------------------------------------------------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//---------------------------------------------------------------------------------------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function getTipo(exp, tabSym) {
    if (exp.Tipo === operacion.TipoBin) {

        var1tipo = getTipo(exp.var1, tabSym);

        var2tipo = getTipo(exp.var2, tabSym);//obtenido el valor y tipo de los operandos

        if (exp.Type === operacion.Suma) {
            //COMIENZA NUMERO ---- SUMA
            if (var1tipo === primitivos.Numero && var2tipo === primitivos.Numero) {
                return primitivos.Numero;
            }
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    return primitivos.Numero;
                }
                else if (simbolingo.tipo === "Cadena") {
                    return primitivos.Cadena;
                }

            }
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Cadena) {
                return primitivos.Cadena;
            }
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Booleano
                || var1tipo === primitivos.Booleano && var2tipo === primitivos.Numero) {
                console.log("ERROR - NO SE PUEDEN SUMAR NUMEROS Y BOOLEANOS");
            }
            //TERMINA NUMERO ---- SUMA
            //COMIENZA CADENA ---- SUMA
            else if (var1tipo === primitivos.Cadena && var2tipo === primitivos.Identificador
                || var1tipo === primitivos.Cadena && var2tipo === primitivos.Numero
                || var1tipo === primitivos.Cadena && var2tipo === primitivos.Cadena
                || var1tipo === primitivos.Cadena && var2tipo === primitivos.Booleano) {
                return primitivos.Cadena
            }
            //TERMINA CADENA ---- SUMA
            //COMIENZA BOOLEANO ---- SUMA
            else if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero" || simbolingo.tipo === "Booleano") {
                    console.log("ERROR - NO SE PUEDE SUMAR UN BOOLEANO Y ENTERO");
                }
                else if (simbolingo.tipo === "Cadena") {
                    return primitivos.Cadena;
                }
            }
            //TERMINA BOOLEANO ---- SUMA
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (var2tipo === primitivos.Numero) {
                    if (simbolingo1.tipo === "Numero") {
                        return primitivos.Numero;
                    }
                    else if (simbolingo1.tipo === "Cadena") {
                        return primitivos.Cadena;
                    }
                    else {
                        console.log("ERROR - NO SE PUEDE SUMAR UN ENTERO Y UN BOOLEANO");
                    }

                }
                else if (var2tipo === primitivos.Cadena) {
                    return primitivos.Cadena;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo1.tipo === "Cadena" || simbolingo2.tipo === "Cadena") {
                        return primitivos.Cadena;
                    }
                    else if (simbolingo1.tipo === "Numero") {
                        if (simbolingo2.tipo === "Numero") {
                            return primitivos.Numero;
                        }
                        else if (simbolingo2.tipo === "Booleano") {
                            console.log("NO SE PUEDE SUMAR UN ENTERO Y UN BOOLEANO");
                        }
                    }
                }
                else {
                    console.log("ERROR DE SUMA ENTRE ENTERO Y BOOLEAN");
                }
            }

        }
        //COMIENZA ---- RESTA
        else if (exp.Type === operacion.Resta) {
            //var1 = Numero --- var2 = Numero
            if (var1tipo === primitivos.Numero && var2tipo === primitivos.Numero) {
                return primitivos.Numero;
            }
            //var1 = Numero --- var2=Cadena || Bool
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Cadena
                || var1tipo === primitivos.Numero && var2tipo === primitivos.Booleano) {
                console.log("ERROR");
            }
            //var1 = Numero --- var2 = identificador
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    return primitivos.Numero;
                }
                else {
                    console.log("ERROR DE TIPOS");
                }
            }
            else if (var1tipo === primitivos.Cadena || var1tipo === primitivos.Booleano) {
                console.log("ERROR DE TIPOS");
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (var2tipo === primitivos.Numero) {
                        return primitivos.Numero;
                    }
                    else if (var2tipo === primitivos.Booleano || var2tipo === primitivos.Cadena) {
                        console.log("NO SE LE PUEDE RESTAR UN BOOL O STRING A UN ENTERO");
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo1.tipo === "Numero" && simbolingo2.tipo === "Numero") {
                            return primitivos.Numero;
                        }
                        else {
                            console.log("ERROR DE TIPOS EN LA RESTA!");
                        }
                    }
                }


            }
        }
        //TERMINA ---- RESTA

        //COMIENZA ---- MULTIPLICACION
        else if (exp.Type === operacion.Multi) {
            if (var1tipo === primitivos.Numero && var2tipo === primitivos.Numero) {
                return primitivos.Numero;
            }
            //var1 = Numero --- var2=Cadena || Bool
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Cadena
                || var1tipo === primitivos.Numero && var2tipo === primitivos.Booleano) {
                console.log("ERROR");
            }
            //var1 = Numero --- var2 = identificador
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    return primitivos.Numero;
                }
                else {
                    console.log("ERROR DE TIPOS");
                }
            }
            else if (var1tipo === primitivos.Cadena || var1tipo === primitivos.Booleano) {
                console.log("ERROR DE TIPOS");
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (var2tipo === primitivos.Numero) {
                        return primitivos.Numero;
                    }
                    else if (var2tipo === primitivos.Booleano || var2tipo === primitivos.Cadena) {
                        console.log("NO SE LE PUEDE Multiplicar UN BOOL O STRING A UN ENTERO");
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo1.tipo === "Numero" && simbolingo2.tipo === "Numero") {
                            return primitivos.Numero;
                        }
                        else {
                            console.log("ERROR DE TIPOS EN LA Multi!");
                        }
                    }
                }


            }


        }
        //COMIENZA LA DIVISION
        else if (exp.Type === operacion.Divi) {
            if (var1tipo === primitivos.Numero && var2tipo === primitivos.Numero) {
                return primitivos.Numero;
            }
            //var1 = Numero --- var2=Cadena || Bool
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Cadena
                || var1tipo === primitivos.Numero && var2tipo === primitivos.Booleano) {
                console.log("ERROR");
            }
            //var1 = Numero --- var2 = identificador
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    return primitivos.Numero;
                }
                else {
                    console.log("ERROR DE TIPOS");
                }
            }
            else if (var1tipo === primitivos.Cadena || var1tipo === primitivos.Booleano) {
                console.log("ERROR DE TIPOS");
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (var2tipo === primitivos.Numero) {
                        return primitivos.Numero;
                    }
                    else if (var2tipo === primitivos.Booleano || var2tipo === primitivos.Cadena) {
                        console.log("NO SE LE PUEDE Dividir UN BOOL O STRING A UN ENTERO");
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo1.tipo === "Numero" && simbolingo2.tipo === "Numero") {
                            return primitivos.Numero;
                        }
                        else {
                            console.log("ERROR DE TIPOS EN LA Division!");
                        }
                    }
                }


            }


        }
        //COMIENZA LA POTENCIA ------------TIPOS--------------------------------------------------------------------
        else if (exp.Type === operacion.Potencia) {
            if (var1tipo === primitivos.Numero && var2tipo === primitivos.Numero) {
                return primitivos.Numero;
            }
            //var1 = Numero --- var2=Cadena || Bool
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Cadena
                || var1tipo === primitivos.Numero && var2tipo === primitivos.Booleano) {
                console.log("ERROR");
            }
            //var1 = Numero --- var2 = identificador
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    return primitivos.Numero;
                }
                else {
                    console.log("ERROR DE TIPOS");
                }
            }
            else if (var1tipo === primitivos.Cadena || var1tipo === primitivos.Booleano) {
                console.log("ERROR DE TIPOS");
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (var2tipo === primitivos.Numero) {
                        return primitivos.Numero;
                    }
                    else if (var2tipo === primitivos.Booleano || var2tipo === primitivos.Cadena) {
                        console.log("NO SE LE PUEDE Elevar UN BOOL O STRING A UN ENTERO");
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo1.tipo === "Numero" && simbolingo2.tipo === "Numero") {
                            return primitivos.Numero;
                        }
                        else {
                            console.log("ERROR DE TIPOS EN LA Potencia!");
                        }
                    }
                }


            }


        }
        //COMIENZA EL MODULO ------------TIPOS--------------------------------------------------------------------------
        else if (exp.Type === operacion.Modulo) {
            if (var1tipo === primitivos.Numero && var2tipo === primitivos.Numero) {
                return primitivos.Numero;
            }
            //var1 = Numero --- var2=Cadena || Bool
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Cadena
                || var1tipo === primitivos.Numero && var2tipo === primitivos.Booleano) {
                console.log("ERROR");
            }
            //var1 = Numero --- var2 = identificador
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    return primitivos.Numero;
                }
                else {
                    console.log("ERROR DE TIPOS");
                }
            }
            else if (var1tipo === primitivos.Cadena || var1tipo === primitivos.Booleano) {
                console.log("ERROR DE TIPOS");
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (var2tipo === primitivos.Numero) {
                        return primitivos.Numero;
                    }
                    else if (var2tipo === primitivos.Booleano || var2tipo === primitivos.Cadena) {
                        console.log("NO SE LE PUEDE Multiplicar UN BOOL O STRING A UN ENTERO");
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo1.tipo === "Numero" && simbolingo2.tipo === "Numero") {
                            return primitivos.Numero;
                        }
                        else {
                            console.log("ERROR DE TIPOS EN LA Multi!");
                        }
                    }
                }


            }


        }
        else if (exp.Type === operacion.Mayor) {
            if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Booleano
                || var1tipo === primitivos.Numero && var2tipo === primitivos.Numero
                || var1tipo === primitivos.Cadena && var2tipo === primitivos.Cadena) {
                return primitivos.Booleano;
            }
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    return primitivos.Booleano
                }
            }
            else if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Booleano") {
                    return primitivos.Booleano
                }
            }
            else if (var1tipo === primitivos.Cadena && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Cadena") {
                    return primitivos.Booleano
                }
            }


        }
        else if (exp.Type === operacion.Menor) {
            if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Booleano
                || var1tipo === primitivos.Numero && var2tipo === primitivos.Numero
                || var1tipo === primitivos.Cadena && var2tipo === primitivos.Cadena) {
                return primitivos.Booleano;
            }
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    return primitivos.Booleano
                }
            }
            else if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Booleano") {
                    return primitivos.Booleano
                }
            }
            else if (var1tipo === primitivos.Cadena && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Cadena") {
                    return primitivos.Booleano
                }
            }
        }
        else if (exp.Type === operacion.MayorIgual) {
            if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Booleano
                || var1tipo === primitivos.Numero && var2tipo === primitivos.Numero
                || var1tipo === primitivos.Cadena && var2tipo === primitivos.Cadena) {
                return primitivos.Booleano;
            }
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    return primitivos.Booleano
                }
            }
            else if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Booleano") {
                    return primitivos.Booleano
                }
            }
            else if (var1tipo === primitivos.Cadena && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Cadena") {
                    return primitivos.Booleano
                }
            }
        }
        else if (exp.Type === operacion.MenorIgual) {
            if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Booleano
                || var1tipo === primitivos.Numero && var2tipo === primitivos.Numero
                || var1tipo === primitivos.Cadena && var2tipo === primitivos.Cadena) {
                return primitivos.Booleano;
            }
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    return primitivos.Booleano
                }
            }
            else if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Booleano") {
                    return primitivos.Booleano
                }
            }
            else if (var1tipo === primitivos.Cadena && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Cadena") {
                    return primitivos.Booleano
                }
            }
        }
        else if (exp.Type === operacion.Igual) {
            if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Booleano
                || var1tipo === primitivos.Numero && var2tipo === primitivos.Numero
                || var1tipo === primitivos.Cadena && var2tipo === primitivos.Cadena) {
                return primitivos.Booleano;
            }
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    return primitivos.Booleano
                }
            }
            else if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Booleano") {
                    return primitivos.Booleano
                }
            }
            else if (var1tipo === primitivos.Cadena && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Cadena") {
                    return primitivos.Booleano
                }
            }
        }
        else if (exp.Type === operacion.Diferente) {
            if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Booleano
                || var1tipo === primitivos.Numero && var2tipo === primitivos.Numero
                || var1tipo === primitivos.Cadena && var2tipo === primitivos.Cadena) {
                return primitivos.Booleano;
            }
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    return primitivos.Booleano
                }
            }
            else if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Booleano") {
                    return primitivos.Booleano
                }
            }
            else if (var1tipo === primitivos.Cadena && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Cadena") {
                    return primitivos.Booleano
                }
            }
        }
        else if (exp.Type === operacion.And) {
            //VAR1 ---- NUMERO
            if(var1tipo=== primitivos.Numero){
                if(var2tipo===primitivos.Numero){
                    return primitivos.Numero;
                }
                else if(var2tipo===primitivos.Booleano){
                    return primitivos.Booleano;
                }
                else if(var2tipo===primitivos.Cadena){
                    return primitivos.Cadena;
                }
                else if(var2tipo===primitivos.Identificador){
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if(simbolingo.tipo==="Numero"){
                        return primitivos.Numero;
                    }
                    else if(simbolingo.tipo==="Cadena"){
                        return primitivos.Cadena;
                    }
                    else if(simbolingo.tipo==="Booleano"){
                        return primitivos.Booleano;
                    }
                }
                
            }
            //VAR1 ------ CADENA
            else if(var1tipo===primitivos.Cadena){
                if(var2tipo === primitivos.Numero){
                    return primitivos.Numero;
                }
                else if(var2tipo===primitivos.Cadena){
                    return primitivos.Cadena;
                }
                else if(var2tipo===primitivos.Booleano){
                    return primitivos.Booleano;
                }
                else if(var2tipo===primitivos.Identificador){
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if(simbolingo.tipo==="Numero"){
                        return primitivos.Numero;
                    }
                    else if(simbolingo.tipo==="Cadena"){
                        return var1 || simbolingo.value;
                    }
                    else if(simbolingo.tipo==="Booleano"){
                        return var1 || simbolingo.value;
                    }
                }
            }
            //VAR1 ---------- BOOLEANO
            else if (var1tipo === primitivos.Booleano) {
                if (var2tipo === primitivos.Booleano) {
                    return primitivos.Booleano;
                }
                else if(var2tipo===primitivos.Numero){
                    return primitivos.Booleano;
                }
                else if(var2tipo===primitivos.Cadena){
                    return primitivos.Booleano;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if(simbolingo.tipo==="Booleano"){
                        return primitivos.Booleano;
                    }
                    else if(simbolingo.tipo==="Numero"){
                        return primitivos.Booleano;
                    }
                    else if(simbolingo.tipo==="Cadena"){
                        return primitivos.Booleano;
                    }
                }
            }
            //VAR1 ---------------- IDENTIFICADOR
            else if(var1tipo===primitivos.Identificador){
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if(simbolingo1.tipo==="Numero"){
                    if(var2tipo===primitivos.Numero){
                        return primitivos.Numero;
                    }
                    else if(var2tipo===primitivos.Cadena){
                        return primitivos.Cadena;
                    }
                    else if(var2tipo===primitivos.Booleano){
                        return primitivos.Booleano;
                    }
                    else if(var2tipo===primitivos.Identificador){
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if(simbolingo2.tipo==="Numero"){
                            return primitivos.Numero;
                        }
                        else if(simbolingo2.tipo==="Cadena"){
                            return primitivos.Cadena;
                        }
                        else if(simbolingo2.tipo==="Booleano"){
                            return primitivos.Booleano;
                        }
                    }
                }
                else if(simbolingo1.tipo==="Cadena"){
                    if(var2tipo===primitivos.Numero){
                        return primitivos.Numero;
                    }
                    else if(var2tipo===primitivos.Cadena){
                        return primitivos.Cadena;
                    }
                    else if(var2tipo===primitivos.Booleano){
                        return primitivos.Booleano;
                    }
                    else if(var2tipo===primitivos.Identificador){
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if(simbolingo2.tipo==="Numero"){
                            return primitivos.Numero;
                        }
                        else if(simbolingo2.tipo==="Cadena"){
                            return primitivos.Cadena;
                        }
                        else if(simbolingo2.tipo==="Booleano"){
                            return primitivos.Booleano;
                        }
                    }
                }
                else if(simbolingo1.tipo==="Booleano"){
                    if(var2tipo===primitivos.Numero){
                        return primitivos.Booleano;
                    }
                    else if(var2tipo===primitivos.Cadena){
                        return primitivos.Cadena;
                    }
                    else if(var2tipo===primitivos.Booleano){
                        return primitivos.Booleano;
                    }
                    else if(var2tipo===primitivos.Identificador){
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if(simbolingo2.tipo==="Numero"){
                            return primitivos.Numero;
                        }
                        else if(simbolingo2.tipo==="Cadena"){
                            return primitivos.Cadena;
                        }
                        else if(simbolingo2.tipo==="Booleano"){
                            return primitivos.Booleano;
                        }
                    }
                }
                
            }
        }
        else if (exp.Type === operacion.Or) {
            //VAR1 ---- NUMERO
            if(var1tipo=== primitivos.Numero){
                if(var2tipo===primitivos.Numero){
                    return primitivos.Numero;
                }
                else if(var2tipo===primitivos.Booleano){
                    return primitivos.Booleano;
                }
                else if(var2tipo===primitivos.Cadena){
                    return primitivos.Cadena;
                }
                else if(var2tipo===primitivos.Identificador){
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if(simbolingo.tipo==="Numero"){
                        return primitivos.Numero;
                    }
                    else if(simbolingo.tipo==="Cadena"){
                        return primitivos.Cadena;
                    }
                    else if(simbolingo.tipo==="Booleano"){
                        return primitivos.Booleano;
                    }
                }
                
            }
            //VAR1 ------ CADENA
            else if(var1tipo===primitivos.Cadena){
                if(var2tipo === primitivos.Numero){
                    return primitivos.Numero;
                }
                else if(var2tipo===primitivos.Cadena){
                    return primitivos.Cadena;
                }
                else if(var2tipo===primitivos.Booleano){
                    return primitivos.Booleano;
                }
                else if(var2tipo===primitivos.Identificador){
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if(simbolingo.tipo==="Numero"){
                        return primitivos.Numero;
                    }
                    else if(simbolingo.tipo==="Cadena"){
                        return var1 || simbolingo.value;
                    }
                    else if(simbolingo.tipo==="Booleano"){
                        return var1 || simbolingo.value;
                    }
                }
            }
            //VAR1 ---------- BOOLEANO
            else if (var1tipo === primitivos.Booleano) {
                if (var2tipo === primitivos.Booleano) {
                    return primitivos.Booleano;
                }
                else if(var2tipo===primitivos.Numero){
                    return primitivos.Booleano;
                }
                else if(var2tipo===primitivos.Cadena){
                    return primitivos.Booleano;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if(simbolingo.tipo==="Booleano"){
                        return primitivos.Booleano;
                    }
                    else if(simbolingo.tipo==="Numero"){
                        return primitivos.Booleano;
                    }
                    else if(simbolingo.tipo==="Cadena"){
                        return primitivos.Booleano;
                    }
                }
            }
            //VAR1 ---------------- IDENTIFICADOR
            else if(var1tipo===primitivos.Identificador){
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if(simbolingo1.tipo==="Numero"){
                    if(var2tipo===primitivos.Numero){
                        return primitivos.Numero;
                    }
                    else if(var2tipo===primitivos.Cadena){
                        return primitivos.Cadena;
                    }
                    else if(var2tipo===primitivos.Booleano){
                        return primitivos.Booleano;
                    }
                    else if(var2tipo===primitivos.Identificador){
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if(simbolingo2.tipo==="Numero"){
                            return primitivos.Numero;
                        }
                        else if(simbolingo2.tipo==="Cadena"){
                            return primitivos.Cadena;
                        }
                        else if(simbolingo2.tipo==="Booleano"){
                            return primitivos.Booleano;
                        }
                    }
                }
                else if(simbolingo1.tipo==="Cadena"){
                    if(var2tipo===primitivos.Numero){
                        return primitivos.Numero;
                    }
                    else if(var2tipo===primitivos.Cadena){
                        return primitivos.Cadena;
                    }
                    else if(var2tipo===primitivos.Booleano){
                        return primitivos.Booleano;
                    }
                    else if(var2tipo===primitivos.Identificador){
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if(simbolingo2.tipo==="Numero"){
                            return primitivos.Numero;
                        }
                        else if(simbolingo2.tipo==="Cadena"){
                            return primitivos.Cadena;
                        }
                        else if(simbolingo2.tipo==="Booleano"){
                            return primitivos.Booleano;
                        }
                    }
                }
                else if(simbolingo1.tipo==="Booleano"){
                    if(var2tipo===primitivos.Numero){
                        return primitivos.Booleano;
                    }
                    else if(var2tipo===primitivos.Cadena){
                        return primitivos.Cadena;
                    }
                    else if(var2tipo===primitivos.Booleano){
                        return primitivos.Booleano;
                    }
                    else if(var2tipo===primitivos.Identificador){
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if(simbolingo2.tipo==="Numero"){
                            return primitivos.Numero;
                        }
                        else if(simbolingo2.tipo==="Cadena"){
                            return primitivos.Cadena;
                        }
                        else if(simbolingo2.tipo==="Booleano"){
                            return primitivos.Booleano;
                        }
                    }
                }
                
            }
        }
        else if (exp.Type === operacion.Not) {
            return primitivos.Booleano;
        }
        else if (exp.Type === operacion.Negativo) {
            if (var1tipo === primitivos.Numero || var1tipo === primitivos.Booleano) {
                return primitivos.Numero;
            }
            else if (var1tipo === primitivos.Cadena) {
                return console.error("error de tipos, no se puede encontrar el valor negativo a una cadena");
            }
        }
        



    }
    else if(exp.Type===primitivos.LLamarFuncion){
        //console.log("ENCONTRE UN OPERADOR DE TIPO FUNCION");
        ahora = getTipoFuncion(exp.Value,tabSym);
        return ahora;
        /*
        console.log("ENCONTRE UN OPERADOR DE TIPO FUNCION");
        ahora = getValorFuncion(exp.Value,tabSym);
        return ahora;
        */
    }
    else if (exp.Type === primitivos.Numero) {
        return exp.Type;
    }
    else if (exp.Type === primitivos.Cadena) {
        return exp.Type;
    }
    else if (exp.Type === primitivos.Booleano) {
        return exp.Type;
    }
    else if (exp.Type === primitivos.Identificador) {
        if(tabSym.Anterior){
            //la tabla tiene un padre
            temporal = tabSym;
            while(temporal!=null){
                simbolingo = temporal.getSimbolo(exp.Value);
                if(simbolingo==="ERROR"){
                    temporal = temporal.Anterior;
                }
                else{
                    
                    return simbolingo.tipo;
                }
                
            }
            /*temporalprueba = temporal;
            simbolillo = temporal.getSimbolo(exp.Value);
            if(simbolillo) {
                return simbolillo.tipo;
            }
            else{
                console.log("VARIABLE TODAVIA NO DECLARADA EN LOS ENTORNOS ACTUALES");
            }*/
        }
        else{
            //es la tabla global
            simbolingo = tabSym.getSimbolo(exp.Value);
            return simbolingo.tipo;
        }
    }



}

