

const primitivos = {
    Numero: 'Numero',
    Cadena: 'Cadena',
    Booleano: 'Booleano',
    Identificador: 'Identificador',
    LLamarFuncion: 'LLamarFuncion',
    AccesoMatrix: 'AccesoMatrix',
    AccesoAtributo: 'AccesoAtributo',
    Null: 'Null'

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
        let var1t;
        let var1tipot;
        if (exp.var1.Type === primitivos.LLamarFuncion) {
            temp = getValor(exp.var1, tabSym);
            var1t = temp.valor;
            var1tipot = temp.tipo;
        }
        else {
            var1t = getValor(exp.var1, tabSym);
            var1tipot = getTipo(exp.var1, tabSym);
        }
        let var2t;
        let var2tipot;
        if (exp.var2.Type === primitivos.LLamarFuncion) {
            temp = getValor(exp.var2, tabSym);
            var2t = temp.valor;
            var2tipot = temp.tipo;
        }
        else {
            var2t = getValor(exp.var2, tabSym);
            var2tipot = getTipo(exp.var2, tabSym);
        }
        let var3t;
        let var3tipot;
        if (exp.var3.Type === primitivos.LLamarFuncion) {
            temp = getValor(exp.var3, tabSym);
            var3t = temp.valor;
            var3tipot = temp.tipo;
        }
        else {
            var3t = getValor(exp.var3, tabSym);
            var3tipot = getTipo(exp.var3, tabSym);
        }
        const var1 = var1t;
        const var1tipo = var1tipot;
        const var2 = var2t;
        const var2tipo = var2tipot;//obtenido el valor y tipo de los operandos
        const var3 = var3t;
        const var3tipo = var3tipot;
        if (exp.Type === operacion.Ternario) {
            //console.log("ESTOY EN EL TERNARIO");
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
                    //console.log("ERROR - NO SE PUEDE SUMAR UN NUMERO CON UN BOOLEANO");
                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE SUMAR UN NUMERO Y BOOL', exp.Row, exp.Column);
                    Horrores.push(error);
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
                //console.log("ERROR DE TIPOS - NO SE PUEDE SUMAR UN BOOL Y NUMERO");
                const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE SUMAR UN BOOL Y NUMERO', exp.Row, exp.Column);
                Horrores.push(error);

            }
            else if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Cadena) {//booleano + cadena
                varR = var1 + var2;
                return varR;
            }
            else if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Booleano) {//booleano + booleano
                //console.log("Error - No se puede operar booleanos con el simbolo +");
                const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDEN OPERAR BOOLEANOS CON EL SIGNO +', exp.Row, exp.Column);
                Horrores.push(error);

            }
            else if (var1tipo === primitivos.Booleano && var2tipo === primitivos.Identificador) {//booleano + ident
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero" || simbolingo.tipo === "Booleano") {
                    //console.log("ERROR - NO SE PUEDE SUMAR UN BOOLEANO CON UN NUMERO");
                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE SUMAR UN BOOL Y NUMERO', exp.Row, exp.Column);
                    Horrores.push(error);
                }
                else if (simbolingo.tipo === "Cadena") {
                    varR = var1 + simbolingo.value;
                    return varR;

                }
                else {
                    //console.log("ERROR - NO SE PUEDE SUMAR UN NUMERO CON UN BOOLEANO");
                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE SUMAR UN NUMERO Y BOOL', exp.Row, exp.Column);
                    Horrores.push(error);
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
                    //console.log("Error - no se pueden sumar un booleano con un numero");
                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE SUMAR UN BOOL Y NUMERO', exp.Row, exp.Column);
                    Horrores.push(error);
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
                    //console.log("ERROR - NO SE PUEDE SUMAR UN NUMBER/BOOLEANO Y UN BOOLEANO");
                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE SUMAR UN BOOL/NUMERO Y BOOL', exp.Row, exp.Column);
                    Horrores.push(error);
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
                        //console.log("ERROR - NO SE PUEDEN SUMAR ENTEROS CON BOOLEANOS");
                        const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE SUMAR UN NUMERO Y BOOL', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("ERROR - NO SE PUEDEN SUMAR NUMEROS CON BOOLEANOS");
                        const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE SUMAR NUMEROS CON BOOLEANOS', exp.Row, exp.Column);
                        Horrores.push(error);
                    }
                    else if (simbolingo2.tipo === "Cadena") {
                        varR = simbolingo1.value + simbolingo2.value;
                        return varR;
                    }
                    else if (simbolingo2.tipo === "Booleano") {
                        //console.log("ERROR - NO SE PUEDEN SUMAR BOOLEANOS");
                        const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE SUMAR BOOLEANOS', exp.Row, exp.Column);
                        Horrores.push(error);

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
                //console.log("ERROR - NO SE PUEDE RESTAR UN NUMERO Y UNA CADENA");
                const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE RESTAR UN NUMERO Y UNA CADENA', exp.Row, exp.Column);
                Horrores.push(error);
            }
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Booleano) {//number-booleano
                //console.log("ERROR - NO SE PUEDE RESTAR UN NUMERO Y UN BOOLEANO");
                const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE RESTAR UN NUMERO Y UN BOOLEANO', exp.Row, exp.Column);
                Horrores.push(error);
            }
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {//number-identi
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    varR = Number(var1) - Number(simbolingo.value);
                    return varR;

                }
                else if (simbolingo.tipo === "Booleano" || simbolingo.tipo === "Cadena") {
                    //console.log("ERROR - NO SE PUEDEN RESTAR UN ENTERO Y UN BOOLEANO O CADENA");
                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE RESTAR UN ENTERO Y UN BOOLEANO/CADENA', exp.Row, exp.Column);
                    Horrores.push(error);
                }

            }
            //TERMINAN VALIDACIONES PARA VAR1 COMO NUMBER
            else if (var1tipo === primitivos.Cadena || var1tipo === primitivos.Booleano) {//cadena o bool -Error-
                //console.log("ERROR - NO SE PUEDEN RESTAR LAS CADENAS Y BOOLEANOS");
                const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE RESTAR CADENAS Y BOOLEANOS', exp.Row, exp.Column);
                Horrores.push(error);
            }
            else if (var1tipo === primitivos.Identificador && var2tipo === primitivos.Numero) {//identi-number
                simbolingo = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo.tipo === "Numero") {
                    varR = Number(simbolingo.value) - Number(var2);
                    return varR;

                }
                else if (simbolingo.tipo === "Booleano" || simbolingo.tipo === "Cadena") {
                    //console.log("ERROR - NO SE PUEDEN RESTAR UN ENTERO Y UN BOOLEANO O CADENA");
                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE RESTAR UN ENTERO Y BOOLEANO/CADENA', exp.Row, exp.Column);
                    Horrores.push(error);
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
                        //console.log("ERROR - NO SE PUEDE RESTAR UN STRING O BOOL A UN ENTERO");
                        const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE RESTAR UN STRING/BOOL A UN ENTERO', exp.Row, exp.Column);
                        Horrores.push(error);
                    }
                }
                else {
                    //console.log("ERROR - NO SE LE PUEDE RESTAR A UN STRING O BOOL");
                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE RESTAR ENTRE UN STRING Y UN BOOL', exp.Row, exp.Column);
                    Horrores.push(error);
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
                    //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN MULTIPLICAR");
                    const error = Error('Semantico', 'ERROR DE TIPOS - SOLO NUMEROS SE PUEDEN MULTIPLICAR', exp.Row, exp.Column);
                    Horrores.push(error);
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
                            //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN MULTIPLICAR");
                            const error = Error('Semantico', 'ERROR DE TIPOS - SOLO NUMEROS SE PUEDEN MULTIPLICAR', exp.Row, exp.Column);
                            Horrores.push(error);
                        }
                    }
                    else {
                        //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN MULTIPLICAR");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO NUMEROS SE PUEDEN MULTIPLICAR', exp.Row, exp.Column);
                        Horrores.push(error);
                    }
                }
                else {
                    //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN MULTIPLICAR");
                    const error = Error('Semantico', 'ERROR DE TIPOS - SOLO NUMEROS SE PUEDEN MULTIPLICAR', exp.Row, exp.Column);
                    Horrores.push(error);
                }

            }
            else {
                //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN MULTIPLICAR");
                const error = Error('Semantico', 'ERROR DE TIPOS - SOLO NUMEROS SE PUEDEN MULTIPLICAR', exp.Row, exp.Column);
                Horrores.push(error);
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
                    //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                    const error = Error('Semantico', 'ERROR DE TIPOS - SOLO NUMEROS SE PUEDEN DIVIDIR', exp.Row, exp.Column);
                    Horrores.push(error);
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
                            //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                            const error = Error('Semantico', 'ERROR DE TIPOS - SOLO NUMEROS SE PUEDEN DIVIDIR', exp.Row, exp.Column);
                            Horrores.push(error);
                        }
                    }
                    else {
                        //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO NUMEROS SE PUEDEN DIVIDIR', exp.Row, exp.Column);
                        Horrores.push(error);
                    }
                }
                else {
                    //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                    const error = Error('Semantico', 'ERROR DE TIPOS - SOLO NUMEROS SE PUEDEN DIVIDIR', exp.Row, exp.Column);
                    Horrores.push(error);
                }

            }
            else {
                //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                const error = Error('Semantico', 'ERROR DE TIPOS - SOLO NUMEROS SE PUEDEN DIVIDIR', exp.Row, exp.Column);
                Horrores.push(error);
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
                    //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN ELEVAR");
                    const error = Error('Semantico', 'ERROR DE TIPOS - SOLO NUMEROS SE PUEDEN ELEVAR', exp.Row, exp.Column);
                    Horrores.push(error);
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
                            //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN ELEVAR");
                            const error = Error('Semantico', 'ERROR DE TIPOS - SOLO NUMEROS SE PUEDEN ELEVAR', exp.Row, exp.Column);
                            Horrores.push(error);
                        }
                    }
                    else {
                        //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN ELEVAR");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO NUMEROS SE PUEDEN ELEVAR', exp.Row, exp.Column);
                        Horrores.push(error);
                    }
                }
                else {
                    //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN ELEVAR");
                    const error = Error('Semantico', 'ERROR DE TIPOS - SOLO NUMEROS SE PUEDEN ELEVAR', exp.Row, exp.Column);
                    Horrores.push(error);
                }

            }
            else {
                //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN ELEVAR");
                const error = Error('Semantico', 'ERROR DE TIPOS - SOLO NUMEROS SE PUEDEN ELEVAR', exp.Row, exp.Column);
                Horrores.push(error);
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
                    //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                    const error = Error('Semantico', 'ERROR DE TIPOS - MODULO SOLO FUNCIONA CON NUMEROS', exp.Row, exp.Column);
                    Horrores.push(error);
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
                            //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                            const error = Error('Semantico', 'ERROR DE TIPOS - MODULO SOLO FUNCIONA CON NUMEROS', exp.Row, exp.Column);
                            Horrores.push(error);
                        }
                    }
                    else {
                        //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                        const error = Error('Semantico', 'ERROR DE TIPOS - MODULO SOLO FUNCIONA CON NUMEROS', exp.Row, exp.Column);
                        Horrores.push(error);
                    }
                }
                else {
                    //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                    const error = Error('Semantico', 'ERROR DE TIPOS - MODULO SOLO FUNCIONA CON NUMEROS', exp.Row, exp.Column);
                    Horrores.push(error);
                }

            }
            else {
                //console.log("ERROR DE TIPOS, SOLO NUMEROS SE PUEDEN DIVIDIR");
                const error = Error('Semantico', 'ERROR DE TIPOS - MODULO SOLO FUNCIONA CON NUMEROS', exp.Row, exp.Column);
                Horrores.push(error);
            }
        }
        //MAYOR ----------------------------------------------------------------------------------------------------
        else if (exp.Type === operacion.Mayor) {
            //console.log("ESTOY EN MAYOR!");
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
                        //console.log("NO SE PUEDE COMPARAR UN ENTERO CON UN BOOL O CADENA");
                        const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE COMPARAR UN ENTERO CON BOOL/CADENA', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("BOOL NO SE PUEDE COMPARAR CON UNA CADENA O NUMERO");
                        const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE COMPARAR UNA CADENA CON BOOL/NUMERO', exp.Row, exp.Column);
                        Horrores.push(error);
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Cadena) {
                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE COMPARAR UN BOOL CON NUMERO/CADENA', exp.Row, exp.Column);
                    Horrores.push(error);
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
                        //console.log("CADENA NO SE PUEDE COMPARAR CON BOOL O NUMERO");
                        const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE COMPARAR UNA CADENA CON BOOL/NUMERO', exp.Row, exp.Column);
                        Horrores.push(error);
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Booleano) {
                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE COMPARAR UNA CADENA CON BOOL/NUMERO', exp.Row, exp.Column);
                    Horrores.push(error);
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
                        //console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS")
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
                    }

                }
            }


        }
        //MENOR -----------------------------------------------------------------------------------
        else if (exp.Type === operacion.Menor) {
            //console.log("ESTOY EN MENOR!");
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
                        //console.log("NO SE PUEDE COMPARAR UN ENTERO CON UN BOOL O CADENA");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR UN ENTERO CON BOOL/CADENA', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("BOOL NO SE PUEDE COMPARAR CON UNA CADENA O NUMERO");
                        const error = Error('Semantico', 'ERROR DE TIPOS - BOOL NO SE PUEDE COMPARAR CON UNA CADENA/NUMERO', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("CADENA NO SE PUEDE COMPARAR CON BOOL O NUMERO");
                        const error = Error('Semantico', 'ERROR DE TIPOS - CADENA NO SE PUEDE COMPARAR CON BOOL/NUMERO', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);

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
                        //console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS")
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
                    }

                }
            }


        }
        //MAYOR IGUAL -----------------------------------------------------------------------------------------------
        else if (exp.Type === operacion.MayorIgual) {
           // console.log("ESTOY EN MAYOR!");
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
                        //console.log("NO SE PUEDE COMPARAR UN ENTERO CON UN BOOL O CADENA");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("BOOL NO SE PUEDE COMPARAR CON UNA CADENA O NUMERO");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("CADENA NO SE PUEDE COMPARAR CON BOOL O NUMERO");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS")
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
                    }

                }
            }
        }
        //MENOR IGUAL ----------------------------------------------------------------------------------
        else if (exp.Type === operacion.MenorIgual) {
            //console.log("ESTOY EN MAYOR!");
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
                        //console.log("NO SE PUEDE COMPARAR UN ENTERO CON UN BOOL O CADENA");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("BOOL NO SE PUEDE COMPARAR CON UNA CADENA O NUMERO");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("CADENA NO SE PUEDE COMPARAR CON BOOL O NUMERO");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS")
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
                    }

                }
            }
        }
        //IGUAL------------------------------------------------------------------------------------------------
        else if (exp.Type === operacion.Igual) {

            //console.log("ESTOY EN MAYOR!");
            if (var1 === null && var2 === null) {
                return true;
            }
            else if (var1 === null) {
                if (var2 === null) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (var2 === null) {
                if (var1 === null) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (var1tipo === primitivos.Numero) {//numero > 
                if (var2tipo === primitivos.Numero) {       //numero
                    if (Number(var1) === Number(var2)) {

                        return true;
                    }
                    else {

                        return false;
                    }
                }
                else if (var2tipo === primitivos.Booleano) {//error de comparación entre un number y bool
                    const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                    Horrores.push(error);
                }
                else if (var2tipo === primitivos.Cadena) {//error de comparación entre un number y cadena
                    const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                    Horrores.push(error);
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
                        //console.log("NO SE PUEDE COMPARAR UN ENTERO CON UN BOOL O CADENA");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("BOOL NO SE PUEDE COMPARAR CON UNA CADENA O NUMERO");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Cadena) {
                    const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                    Horrores.push(error);
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
                        //console.log("CADENA NO SE PUEDE COMPARAR CON BOOL O NUMERO");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Booleano) {
                    const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                    Horrores.push(error);
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
                        //console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS")
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
                    }

                }
            }
        }
        //DIFERENTE ---------------------------------------------------------------------------
        else if (exp.Type === operacion.Difer) {
            //console.log("ESTOY EN MAYOR!");
            if(var1tipo === null && var2tipo === null){
                return false;
            }
            else if(var1tipo===null && var2tipo!=null){

                return true;
            }
            else if(var2tipo===null && var2tipo!=null){
                return true;
            }
            else if (var1tipo === primitivos.Numero) {//numero > 
                if (var2tipo === primitivos.Numero) {       //numero
                    if (Number(var1) != Number(var2)) {

                        return true;
                    }
                    else {

                        return false;
                    }
                }
                else if (var2tipo === primitivos.Booleano) {//error de comparación entre un number y bool
                    const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                    Horrores.push(error);
                }
                else if (var2tipo === primitivos.Cadena) {//error de comparación entre un number y cadena
                    const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                    Horrores.push(error);
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
                        //console.log("NO SE PUEDE COMPARAR UN ENTERO CON UN BOOL O CADENA");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("BOOL NO SE PUEDE COMPARAR CON UNA CADENA O NUMERO");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Cadena) {
                    const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                    Horrores.push(error);
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
                        //console.log("CADENA NO SE PUEDE COMPARAR CON BOOL O NUMERO");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
                    }
                }
                else if (var2tipo === primitivos.Numero || var2tipo === primitivos.Booleano) {
                    const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                    Horrores.push(error);
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
                        //console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS")
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
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
                        //console.log("SOLO SE PUEDEN COMPARAR LOS MISMOS TIPOS");
                        const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDE COMPARAR LOS MISMOS TIPOS', exp.Row, exp.Column);
                        Horrores.push(error);
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
                else if (simbolingo.tipo === "Numero") {
                    if (Number(simbolingo.value) > 0) {
                        return false;
                    }
                    else {
                        return true;
                    }

                }
                else if (simbolingo.tipo === "Cadena") {
                    if (simbolingo.value.length > 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }

            }
            else if (var2tipo === primitivos.Numero) {
                if (Number(var2) > 0) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else if (var2tipo === primitivos.Cadena) {
                if (var2.length > 0) {
                    return false;
                }
                else {
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
                //console.log("ERROR - NO SE PUEDE PASAR A NEGATIVO UN STRING");
                const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE NEGAR UN STRING', exp.Row, exp.Column);
                Horrores.push(error);
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
                    //console.log("ERROR - NO SE PUEDE PASAR A NEGATIVO UN STRING");
                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE NEGAR UN STRING', exp.Row, exp.Column);
                    Horrores.push(error);
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

        }
        else if (exp.Type === operacion.And) {
            //VAR1 ---- NUMERO
            if (var1tipo === primitivos.Numero) {
                if (var2tipo === primitivos.Numero) {
                    return Number(var1) && Number(var2);
                }
                else if (var2tipo === primitivos.Booleano) {
                    return Number(var1) && var2;
                }
                else if (var2tipo === primitivos.Cadena) {
                    return Number(var1) && var2;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        return Number(var1) && Number(simbolingo.value);
                    }
                    else if (simbolingo.tipo === "Cadena") {
                        return Number(var1) && Number(simbolingo.value);
                    }
                    else if (simbolingo.tipo === "Booleano") {
                        return Number(var1) && Number(simbolingo.value);
                    }
                }

            }
            //VAR1 ------ CADENA
            else if (var1tipo === primitivos.Cadena) {
                if (var2tipo === primitivos.Numero) {
                    return var1 && Number(var2);
                }
                else if (var2tipo === primitivos.Cadena) {
                    return var1 && var2;
                }
                else if (var2tipo === primitivos.Booleano) {
                    return var1 && var2;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        return var1 && Number(simbolingo.value);
                    }
                    else if (simbolingo.tipo === "Cadena") {
                        return var1 && simbolingo.value;
                    }
                    else if (simbolingo.tipo === "Booleano") {
                        return var1 && simbolingo.value;
                    }
                }
            }
            //VAR1 ---------- BOOLEANO
            else if (var1tipo === primitivos.Booleano) {
                if (var2tipo === primitivos.Booleano) {
                    return var1 && var2;
                }
                else if (var2tipo === primitivos.Numero) {
                    return var1 && Number(var2);
                }
                else if (var2tipo === primitivos.Cadena) {
                    return var1 && var2;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Booleano") {
                        return var1 && simbolingo.value;
                    }
                    else if (simbolingo.tipo === "Numero") {
                        return var1 && Number(simbolingo.value);
                    }
                    else if (simbolingo.tipo === "Cadena") {
                        return var1 && var2;
                    }
                }
            }
            //VAR1 ---------------- IDENTIFICADOR
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (var2tipo === primitivos.Numero) {
                        return Number(simbolingo1.value) && Number(var2);
                    }
                    else if (var2tipo === primitivos.Cadena) {
                        return Number(simbolingo1.value) && var2;
                    }
                    else if (var2tipo === primitivos.Booleano) {
                        return Number(simbolingo1.value) && var2;
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo2.tipo === "Numero") {
                            return Number(simbolingo1.value) && Number(simbolingo2.value);
                        }
                        else if (simbolingo2.tipo === "Cadena") {
                            return Number(simbolingo1.value) && simbolingo2.value;
                        }
                        else if (simbolingo2.tipo === "Booleano") {
                            return Number(simbolingo1.value) && simbolingo2.value;
                        }
                    }
                }
                else if (simbolingo1.tipo === "Cadena") {
                    if (var2tipo === primitivos.Numero) {
                        return Number(simbolingo1.value) && Number(var2);
                    }
                    else if (var2tipo === primitivos.Cadena) {
                        return simbolingo1.value && var2;
                    }
                    else if (var2tipo === primitivos.Booleano) {
                        return simbolingo1.value && var2;
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo2.tipo === "Numero") {
                            return simbolingo1.value && Number(simbolingo2.value);
                        }
                        else if (simbolingo2.tipo === "Cadena") {
                            return simbolingo1.value && simbolingo2.value;
                        }
                        else if (simbolingo2.tipo === "Booleano") {
                            return simbolingo1.value && simbolingo2.value;
                        }
                    }
                }
                else if (simbolingo1.tipo === "Booleano") {
                    if (var2tipo === primitivos.Numero) {
                        return simbolingo1.value && Number(var2);
                    }
                    else if (var2tipo === primitivos.Cadena) {
                        return simbolingo1.value && var2;
                    }
                    else if (var2tipo === primitivos.Booleano) {
                        return simbolingo1.value && var2;
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo2.tipo === "Numero") {
                            return simbolingo1.value && Number(simbolingo2.value);
                        }
                        else if (simbolingo2.tipo === "Cadena") {
                            return simbolingo1.value && simbolingo2.value;
                        }
                        else if (simbolingo2.tipo === "Booleano") {
                            return simbolingo1.value && simbolingo2.value;
                        }
                    }
                }

            }

        }
        else if (exp.Type === operacion.Or) {
            //VAR1 ---- NUMERO
            if (var1tipo === primitivos.Numero) {
                if (var2tipo === primitivos.Numero) {
                    return Number(var1) || Number(var2);
                }
                else if (var2tipo === primitivos.Booleano) {
                    return Number(var1) || var2;
                }
                else if (var2tipo === primitivos.Cadena) {
                    return Number(var1) || var2;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        return Number(var1) || Number(simbolingo.value);
                    }
                    else if (simbolingo.tipo === "Cadena") {
                        return Number(var1) || Number(simbolingo.value);
                    }
                    else if (simbolingo.tipo === "Booleano") {
                        return Number(var1) || Number(simbolingo.value);
                    }
                }

            }
            //VAR1 ------ CADENA
            else if (var1tipo === primitivos.Cadena) {
                if (var2tipo === primitivos.Numero) {
                    return var1 || Number(var2);
                }
                else if (var2tipo === primitivos.Cadena) {
                    return var1 || var2;
                }
                else if (var2tipo === primitivos.Booleano) {
                    return var1 || var2;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        return var1 || Number(simbolingo.value);
                    }
                    else if (simbolingo.tipo === "Cadena") {
                        return var1 || simbolingo.value;
                    }
                    else if (simbolingo.tipo === "Booleano") {
                        return var1 || simbolingo.value;
                    }
                }
            }
            //VAR1 ---------- BOOLEANO
            else if (var1tipo === primitivos.Booleano) {
                if (var2tipo === primitivos.Booleano) {
                    return var1 || var2;
                }
                else if (var2tipo === primitivos.Numero) {
                    return var1 || Number(var2);
                }
                else if (var2tipo === primitivos.Cadena) {
                    return var1 || var2;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Booleano") {
                        return var1 || simbolingo.value;
                    }
                    else if (simbolingo.tipo === "Numero") {
                        return var1 || Number(simbolingo.value);
                    }
                    else if (simbolingo.tipo === "Cadena") {
                        return var1 || var2;
                    }
                }
            }
            //VAR1 ---------------- IDENTIFICADOR
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (var2tipo === primitivos.Numero) {
                        return Number(simbolingo1.value) || Number(var2);
                    }
                    else if (var2tipo === primitivos.Cadena) {
                        return Number(simbolingo1.value) || var2;
                    }
                    else if (var2tipo === primitivos.Booleano) {
                        return Number(simbolingo1.value) || var2;
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo2.tipo === "Numero") {
                            return Number(simbolingo1.value) || Number(simbolingo2.value);
                        }
                        else if (simbolingo2.tipo === "Cadena") {
                            return Number(simbolingo1.value) || simbolingo2.value;
                        }
                        else if (simbolingo2.tipo === "Booleano") {
                            return Number(simbolingo1.value) || simbolingo2.value;
                        }
                    }
                }
                else if (simbolingo1.tipo === "Cadena") {
                    if (var2tipo === primitivos.Numero) {
                        return Number(simbolingo1.value) || Number(var2);
                    }
                    else if (var2tipo === primitivos.Cadena) {
                        return simbolingo1.value || var2;
                    }
                    else if (var2tipo === primitivos.Booleano) {
                        return simbolingo1.value || var2;
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo2.tipo === "Numero") {
                            return simbolingo1.value || Number(simbolingo2.value);
                        }
                        else if (simbolingo2.tipo === "Cadena") {
                            return simbolingo1.value || simbolingo2.value;
                        }
                        else if (simbolingo2.tipo === "Booleano") {
                            return simbolingo1.value || simbolingo2.value;
                        }
                    }
                }
                else if (simbolingo1.tipo === "Booleano") {
                    if (var2tipo === primitivos.Numero) {
                        return simbolingo1.value || Number(var2);
                    }
                    else if (var2tipo === primitivos.Cadena) {
                        return simbolingo1.value || var2;
                    }
                    else if (var2tipo === primitivos.Booleano) {
                        return simbolingo1.value || var2;
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo2.tipo === "Numero") {
                            return simbolingo1.value || Number(simbolingo2.value);
                        }
                        else if (simbolingo2.tipo === "Cadena") {
                            return simbolingo1.value || simbolingo2.value;
                        }
                        else if (simbolingo2.tipo === "Booleano") {
                            return simbolingo1.value || simbolingo2.value;
                        }
                    }
                }

            }

        }


    }
    else if (exp.Type === primitivos.AccesoMatrix) {
        elarreglo = tabSym.getArreglo(exp.Value.id);
        //console.log("ESTOY ACCEDIENDO A UN VALOR DEL VECTOR");
        if (exp.Value.dimensionval.Value === ".") {//ES LENGTH
            //console.log("SE BUSCA EL LARGO DEL ARRAY");
        }
        else {
            //console.log("es una posicion del array");
            let valor;
            let tipo;
            if (exp.Type === primitivos.LLamarFuncion) {
                temp = getValor(exp.Value.dimensionval, tabSym);
                valor = temp.valor;
                tipo = temp.tipo;
            }
            else {
                valor = getValor(exp.Value.dimensionval, tabSym);
                tipo = getTipo(exp.Value.dimensionval, tabSym);
            }
            if (elarreglo.valsdim.length > valor) {
                //console.log("la posicion existe en el arreglo, procedo a buscar el valor");
                elegido = elarreglo.valsdim[valor];
                //console.log("AVEEER");
                let valore;
                let tipoe;
                if (elegido.Type === primitivos.LLamarFuncion) {
                    temp = getValor(elegido, tabSym);
                    valore = temp.valor;
                    tipoe = temp.tipo;
                }
                else {
                    valore = getValor(elegido, tabSym);
                    tipoe = getTipo(elegido, tabSym);
                }
                xd = valore;
                return valore;
            }
        }
    }


    else if (exp.Type === primitivos.LLamarFuncion) {
        //console.log("ENCONTRE UN OPERADOR DE TIPO FUNCION");
        temp = CompilarFun(exp.Value, tabSym);
        ahora = { valor: temp.valor, tipo: temp.tipo };
        return ahora;
    }
    else if (exp.Type === primitivos.AccesoAtributo) {
        contenido = exp;
        //console.log("VIENE UN ATRIBUTO AL CUAL DBO ACCESAR");
        if (exp.Value.uno != "" && exp.Value.dos != "" && exp.Value.tres != "-1") {
            //vienen los 3 valores
            //hay que acceder a 2 tipos
            if (tabSym.Anterior === null) {
                tipo1 = tabSym.getType(exp.Value.uno);
                tipo2 = tipo1.params.getType(exp.Value.dos);
                valorFinal = tipo2.params.getSimbolo(exp.Value.tres);
                //console.log("xd");
                //DEJO ESTO A MEDIAS, TENGO QUE CAMBIAR LOS TYPES 
                //YA LO ARREGLE :V
                return valorFinal.value;
            }
            else {
                fija = tabSym;
                let res = 0;
                while (tabSym != null) {
                    res = tabSym.getTipo(exp.Value.uno);
                    if (res === "ERROR") {
                        tabSym = tabSym.Anterior;
                    }
                    else {
                        res2 = res.params.getType(exp.Value.dos);
                        valorFinal = res2.params.getSimbolo(exp.Value.tres);
                        return valorFinal.value;
                    }
                }
            }

        }
        else {
            //solo son 2 valores
            //hay que acceder a un tipo
            if (tabSym.Anterior === null) {
                tipo1 = tabSym.getType(exp.Value.uno);
                valorFinal = tipo1.params.getSimbolo(exp.Value.dos);
                return valorFinal.value;
            }
            else {
                fija = tabSym;
                while (tabSym != null) {
                    res = tabSym.getType(exp.Value.uno);
                    if (res === "ERROR") {
                        tabSym = tabSym.Anterior;
                    }
                    else {
                        res2 = res.params.getSimbolo(exp.Value.dos);
                        return res2.value;

                    }
                }
            }

        }

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
    else if (exp.Type === primitivos.Null) {
        return null;
    }
    else if (exp.Type === primitivos.Identificador) {
        if (exp.Value === "null") {
            return null;
        }
        else {
            //la tabla tiene un padre
            temporal = tabSym;
            fija = tabSym;
            while (temporal != null) {
                simbolingo = temporal.getSimbolo(exp.Value);
                if (simbolingo === "ERROR") {
                    temporal = temporal.Anterior;
                }
                else {

                    return simbolingo.value;
                }

            }
            tabSym = fija;
            temporal = fija;
            while (temporal != null) {
                type = temporal.getType(exp.Value);
                if (type === "ERROR") {
                    temporal = temporal.Anterior;
                }
                else {
                    return type;
                }
            }
            tabSym = fija;
            temporal = fija;
            while (temporal != null) {
                type = temporal.getTypeDef(exp.Value);
                if (type === "ERROR") {
                    temporal = temporal.Anterior;
                }
                else {
                    return type.params;
                }
            }
            tabSym = fija;
            temporal = fija;
            while (temporal != null) {
                arr = temporal.getArreglo(exp.Value);
                if (arr === "ERROR") {
                    temporal = temporal.Anterior;
                }
                else {
                    return arr;
                }
            }
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
                //console.log("ERROR - NO SE PUEDEN SUMAR NUMEROS Y BOOLEANOS");
                const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PEUDEN SUMAR NUMEROS Y BOOL', exp.Row, exp.Column);
                Horrores.push(error);
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
                    //console.log("ERROR - NO SE PUEDE SUMAR UN BOOLEANO Y ENTERO");
                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PEUDEN SUMAR NUMEROS Y BOOL', exp.Row, exp.Column);
                    Horrores.push(error);
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
                        //console.log("ERROR - NO SE PUEDE SUMAR UN ENTERO Y UN BOOLEANO");
                        const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PEUDEN SUMAR NUMEROS Y BOOL', exp.Row, exp.Column);
                        Horrores.push(error);
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
                            //console.log("NO SE PUEDE SUMAR UN ENTERO Y UN BOOLEANO");
                            const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PEUDEN SUMAR NUMEROS Y BOOL', exp.Row, exp.Column);
                            Horrores.push(error);
                        }
                    }
                }
                else {
                    //console.log("ERROR DE SUMA ENTRE ENTERO Y BOOLEAN");
                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PEUDEN SUMAR NUMEROS Y BOOL', exp.Row, exp.Column);
                    Horrores.push(error);
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
                    //console.log("ERROR DE TIPOS");
                    const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDEN RESTAR ENTEROS', exp.Row, exp.Column);
                    Horrores.push(error);
                }
            }
            else if (var1tipo === primitivos.Cadena || var1tipo === primitivos.Booleano) {
                //console.log("ERROR DE TIPOS");
                const error = Error('Semantico', 'ERROR DE TIPOS - SOLO SE PUEDEN RESTAR ENTEROS', exp.Row, exp.Column);
                Horrores.push(error);
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
                            //console.log("ERROR DE TIPOS EN LA RESTA!");

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
                //console.log("ERROR");
            }
            //var1 = Numero --- var2 = identificador
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    return primitivos.Numero;
                }
                else {
                    //console.log("ERROR DE TIPOS");
                }
            }
            else if (var1tipo === primitivos.Cadena || var1tipo === primitivos.Booleano) {
                //console.log("ERROR DE TIPOS");
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (var2tipo === primitivos.Numero) {
                        return primitivos.Numero;
                    }
                    else if (var2tipo === primitivos.Booleano || var2tipo === primitivos.Cadena) {
                        //console.log("NO SE LE PUEDE Multiplicar UN BOOL O STRING A UN ENTERO");
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo1.tipo === "Numero" && simbolingo2.tipo === "Numero") {
                            return primitivos.Numero;
                        }
                        else {
                            //  console.log("ERROR DE TIPOS EN LA Multi!");
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
                //console.log("ERROR");
            }
            //var1 = Numero --- var2 = identificador
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    return primitivos.Numero;
                }
                else {
                    //  console.log("ERROR DE TIPOS");
                }
            }
            else if (var1tipo === primitivos.Cadena || var1tipo === primitivos.Booleano) {
                //console.log("ERROR DE TIPOS");
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (var2tipo === primitivos.Numero) {
                        return primitivos.Numero;
                    }
                    else if (var2tipo === primitivos.Booleano || var2tipo === primitivos.Cadena) {
                        //console.log("NO SE LE PUEDE Dividir UN BOOL O STRING A UN ENTERO");
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo1.tipo === "Numero" && simbolingo2.tipo === "Numero") {
                            return primitivos.Numero;
                        }
                        else {
                            //  console.log("ERROR DE TIPOS EN LA Division!");
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
                //console.log("ERROR");
            }
            //var1 = Numero --- var2 = identificador
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    return primitivos.Numero;
                }
                else {
                    //  console.log("ERROR DE TIPOS");
                }
            }
            else if (var1tipo === primitivos.Cadena || var1tipo === primitivos.Booleano) {
                //console.log("ERROR DE TIPOS");
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (var2tipo === primitivos.Numero) {
                        return primitivos.Numero;
                    }
                    else if (var2tipo === primitivos.Booleano || var2tipo === primitivos.Cadena) {
                        //      console.log("NO SE LE PUEDE Elevar UN BOOL O STRING A UN ENTERO");
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo1.tipo === "Numero" && simbolingo2.tipo === "Numero") {
                            return primitivos.Numero;
                        }
                        else {
                            //        console.log("ERROR DE TIPOS EN LA Potencia!");
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
                //console.log("ERROR");
            }
            //var1 = Numero --- var2 = identificador
            else if (var1tipo === primitivos.Numero && var2tipo === primitivos.Identificador) {
                simbolingo = tabSym.getSimbolo(exp.var2.Value);
                if (simbolingo.tipo === "Numero") {
                    return primitivos.Numero;
                }
                else {
                    //  console.log("ERROR DE TIPOS");
                }
            }
            else if (var1tipo === primitivos.Cadena || var1tipo === primitivos.Booleano) {
                //console.log("ERROR DE TIPOS");
            }
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (var2tipo === primitivos.Numero) {
                        return primitivos.Numero;
                    }
                    else if (var2tipo === primitivos.Booleano || var2tipo === primitivos.Cadena) {
                        //      console.log("NO SE LE PUEDE Multiplicar UN BOOL O STRING A UN ENTERO");
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo1.tipo === "Numero" && simbolingo2.tipo === "Numero") {
                            return primitivos.Numero;
                        }
                        else {
                            //        console.log("ERROR DE TIPOS EN LA Multi!");
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
            else if (var1tipo === null || var2tipo === null) {
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
            else if(var1tipo===null || var2tipo===null){
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
            if (var1tipo === primitivos.Numero) {
                if (var2tipo === primitivos.Numero) {
                    return primitivos.Numero;
                }
                else if (var2tipo === primitivos.Booleano) {
                    return primitivos.Booleano;
                }
                else if (var2tipo === primitivos.Cadena) {
                    return primitivos.Cadena;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        return primitivos.Numero;
                    }
                    else if (simbolingo.tipo === "Cadena") {
                        return primitivos.Cadena;
                    }
                    else if (simbolingo.tipo === "Booleano") {
                        return primitivos.Booleano;
                    }
                }

            }
            //VAR1 ------ CADENA
            else if (var1tipo === primitivos.Cadena) {
                if (var2tipo === primitivos.Numero) {
                    return primitivos.Numero;
                }
                else if (var2tipo === primitivos.Cadena) {
                    return primitivos.Cadena;
                }
                else if (var2tipo === primitivos.Booleano) {
                    return primitivos.Booleano;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        return primitivos.Numero;
                    }
                    else if (simbolingo.tipo === "Cadena") {
                        return var1 || simbolingo.value;
                    }
                    else if (simbolingo.tipo === "Booleano") {
                        return var1 || simbolingo.value;
                    }
                }
            }
            //VAR1 ---------- BOOLEANO
            else if (var1tipo === primitivos.Booleano) {
                if (var2tipo === primitivos.Booleano) {
                    return primitivos.Booleano;
                }
                else if (var2tipo === primitivos.Numero) {
                    return primitivos.Booleano;
                }
                else if (var2tipo === primitivos.Cadena) {
                    return primitivos.Booleano;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Booleano") {
                        return primitivos.Booleano;
                    }
                    else if (simbolingo.tipo === "Numero") {
                        return primitivos.Booleano;
                    }
                    else if (simbolingo.tipo === "Cadena") {
                        return primitivos.Booleano;
                    }
                }
            }
            //VAR1 ---------------- IDENTIFICADOR
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (var2tipo === primitivos.Numero) {
                        return primitivos.Numero;
                    }
                    else if (var2tipo === primitivos.Cadena) {
                        return primitivos.Cadena;
                    }
                    else if (var2tipo === primitivos.Booleano) {
                        return primitivos.Booleano;
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo2.tipo === "Numero") {
                            return primitivos.Numero;
                        }
                        else if (simbolingo2.tipo === "Cadena") {
                            return primitivos.Cadena;
                        }
                        else if (simbolingo2.tipo === "Booleano") {
                            return primitivos.Booleano;
                        }
                    }
                }
                else if (simbolingo1.tipo === "Cadena") {
                    if (var2tipo === primitivos.Numero) {
                        return primitivos.Numero;
                    }
                    else if (var2tipo === primitivos.Cadena) {
                        return primitivos.Cadena;
                    }
                    else if (var2tipo === primitivos.Booleano) {
                        return primitivos.Booleano;
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo2.tipo === "Numero") {
                            return primitivos.Numero;
                        }
                        else if (simbolingo2.tipo === "Cadena") {
                            return primitivos.Cadena;
                        }
                        else if (simbolingo2.tipo === "Booleano") {
                            return primitivos.Booleano;
                        }
                    }
                }
                else if (simbolingo1.tipo === "Booleano") {
                    if (var2tipo === primitivos.Numero) {
                        return primitivos.Booleano;
                    }
                    else if (var2tipo === primitivos.Cadena) {
                        return primitivos.Cadena;
                    }
                    else if (var2tipo === primitivos.Booleano) {
                        return primitivos.Booleano;
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo2.tipo === "Numero") {
                            return primitivos.Numero;
                        }
                        else if (simbolingo2.tipo === "Cadena") {
                            return primitivos.Cadena;
                        }
                        else if (simbolingo2.tipo === "Booleano") {
                            return primitivos.Booleano;
                        }
                    }
                }

            }
        }
        else if (exp.Type === operacion.Or) {
            //VAR1 ---- NUMERO
            if (var1tipo === primitivos.Numero) {
                if (var2tipo === primitivos.Numero) {
                    return primitivos.Numero;
                }
                else if (var2tipo === primitivos.Booleano) {
                    return primitivos.Booleano;
                }
                else if (var2tipo === primitivos.Cadena) {
                    return primitivos.Cadena;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        return primitivos.Numero;
                    }
                    else if (simbolingo.tipo === "Cadena") {
                        return primitivos.Cadena;
                    }
                    else if (simbolingo.tipo === "Booleano") {
                        return primitivos.Booleano;
                    }
                }

            }
            //VAR1 ------ CADENA
            else if (var1tipo === primitivos.Cadena) {
                if (var2tipo === primitivos.Numero) {
                    return primitivos.Numero;
                }
                else if (var2tipo === primitivos.Cadena) {
                    return primitivos.Cadena;
                }
                else if (var2tipo === primitivos.Booleano) {
                    return primitivos.Booleano;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Numero") {
                        return primitivos.Numero;
                    }
                    else if (simbolingo.tipo === "Cadena") {
                        return var1 || simbolingo.value;
                    }
                    else if (simbolingo.tipo === "Booleano") {
                        return var1 || simbolingo.value;
                    }
                }
            }
            //VAR1 ---------- BOOLEANO
            else if (var1tipo === primitivos.Booleano) {
                if (var2tipo === primitivos.Booleano) {
                    return primitivos.Booleano;
                }
                else if (var2tipo === primitivos.Numero) {
                    return primitivos.Booleano;
                }
                else if (var2tipo === primitivos.Cadena) {
                    return primitivos.Booleano;
                }
                else if (var2tipo === primitivos.Identificador) {
                    simbolingo = tabSym.getSimbolo(exp.var2.Value);
                    if (simbolingo.tipo === "Booleano") {
                        return primitivos.Booleano;
                    }
                    else if (simbolingo.tipo === "Numero") {
                        return primitivos.Booleano;
                    }
                    else if (simbolingo.tipo === "Cadena") {
                        return primitivos.Booleano;
                    }
                }
            }
            //VAR1 ---------------- IDENTIFICADOR
            else if (var1tipo === primitivos.Identificador) {
                simbolingo1 = tabSym.getSimbolo(exp.var1.Value);
                if (simbolingo1.tipo === "Numero") {
                    if (var2tipo === primitivos.Numero) {
                        return primitivos.Numero;
                    }
                    else if (var2tipo === primitivos.Cadena) {
                        return primitivos.Cadena;
                    }
                    else if (var2tipo === primitivos.Booleano) {
                        return primitivos.Booleano;
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo2.tipo === "Numero") {
                            return primitivos.Numero;
                        }
                        else if (simbolingo2.tipo === "Cadena") {
                            return primitivos.Cadena;
                        }
                        else if (simbolingo2.tipo === "Booleano") {
                            return primitivos.Booleano;
                        }
                    }
                }
                else if (simbolingo1.tipo === "Cadena") {
                    if (var2tipo === primitivos.Numero) {
                        return primitivos.Numero;
                    }
                    else if (var2tipo === primitivos.Cadena) {
                        return primitivos.Cadena;
                    }
                    else if (var2tipo === primitivos.Booleano) {
                        return primitivos.Booleano;
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo2.tipo === "Numero") {
                            return primitivos.Numero;
                        }
                        else if (simbolingo2.tipo === "Cadena") {
                            return primitivos.Cadena;
                        }
                        else if (simbolingo2.tipo === "Booleano") {
                            return primitivos.Booleano;
                        }
                    }
                }
                else if (simbolingo1.tipo === "Booleano") {
                    if (var2tipo === primitivos.Numero) {
                        return primitivos.Booleano;
                    }
                    else if (var2tipo === primitivos.Cadena) {
                        return primitivos.Cadena;
                    }
                    else if (var2tipo === primitivos.Booleano) {
                        return primitivos.Booleano;
                    }
                    else if (var2tipo === primitivos.Identificador) {
                        simbolingo2 = tabSym.getSimbolo(exp.var2.Value);
                        if (simbolingo2.tipo === "Numero") {
                            return primitivos.Numero;
                        }
                        else if (simbolingo2.tipo === "Cadena") {
                            return primitivos.Cadena;
                        }
                        else if (simbolingo2.tipo === "Booleano") {
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
                //return console.error("error de tipos, no se puede encontrar el valor negativo a una cadena");
            }
        }




    }
    else if (exp.Type === primitivos.AccesoMatrix) {
        elarreglo = tabSym.getArreglo(exp.Value.id);
        //console.log("ESTOY ACCEDIENDO A UN VALOR DEL VECTOR");
        if (exp.Value.dimensionval.Value === ".") {//ES LENGTH
            //  console.log("SE BUSCA EL LARGO DEL ARRAY");
        }
        else {
            //console.log("es una posicion del array");
            let valor;
            let tipo;
            if (exp.Type === primitivos.LLamarFuncion) {
                temp = getValor(exp.Value.dimensionval, tabSym);
                valor = temp.valor;
                tipo = temp.tipo;
            }
            else {
                valor = getValor(exp.Value.dimensionval, tabSym);
                tipo = getTipo(exp.Value.dimensionval, tabSym);
            }
            if (elarreglo.valsdim.length > valor) {
                //  console.log("la posicion existe en el arreglo, procedo a buscar el valor");
                elegido = elarreglo.valsdim[valor];
                //console.log("AVEEER");
                let valore;
                let tipoe;
                if (elegido.Type === primitivos.LLamarFuncion) {
                    temp = getValor(elegido, tabSym);
                    valore = temp.valor;
                    tipoe = temp.tipo;
                }
                else {
                    valore = getValor(elegido, tabSym);
                    tipoe = getTipo(elegido, tabSym);
                }
                xd = tipoe;
                return tipoe;
            }
        }
    }
    else if (exp.Type === primitivos.LLamarFuncion) {
        //console.log("ENCONTRE UN OPERADOR DE TIPO FUNCION");
        ahora = getTipoFuncion(exp.Value, tabSym);
        return ahora;
        /*
        console.log("ENCONTRE UN OPERADOR DE TIPO FUNCION");
        ahora = getValorFuncion(exp.Value,tabSym);
        return ahora;
        */
    }
    else if (exp.Type === primitivos.AccesoAtributo) {
        contenido = exp;
        //console.log("VIENE UN ATRIBUTO AL CUAL DBO ACCESAR");
        if (exp.Value.uno != "" && exp.Value.dos != "" && exp.Value.tres != "-1") {
            //vienen los 3 valores
            //hay que acceder a 2 tipos
            if (tabSym.Anterior) {
                fija = tabSym;
                while (tabSym != null) {
                    tipo1 = tabSym.getType(exp.Value.uno);
                    if (tipo1 === "ERROR") {
                        tabSym = tabSym.Anterior;
                    }
                    else {
                        tipo2 = tipo1.params.getType(ex.Value.dos);
                        valorFinal = tipo2.params.getSimbolo(exp.Value.tres);
                        return valorFinal.tipo;
                    }
                }
            }
            else {
                tipo1 = tabSym.getType(exp.Value.uno);
                tipo2 = tipo1.params.getType(exp.Value.dos);
                valorFinal = tipo2.params.getSimbolo(exp.Value.tres);
                //console.log("xd");
                //DEJO ESTO A MEDIAS, TENGO QUE CAMBIAR LOS TYPES 
                //YA LO ARREGLE :V
                return valorFinal.tipo;
            }

        }
        else {
            //solo son 2 valores
            //hay que acceder a un tipo
            if (tabSym.Anterior) {
                fija = tabSym;
                while(tabSym!=null){
                    tipo1 = tabSym.getType(exp.Value.uno);
                    if(tipo1==="ERROR"){
                        tabSym = tabSym.Anterior;
                    }
                    else{
                        valorFinal = tipo1.params.getSimbolo(exp.Value.dos);
                        return valorFinal.tipo;
                    }
                }
            }
            else {
                tipo1 = tabSym.getType(exp.Value.uno);
                valorFinal = tipo1.params.getSimbolo(exp.Value.dos);
                return valorFinal.tipo;
            }
          
        }
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
    else if (exp.Type === primitivos.Null) {
        return null;
    }

    else if (exp.Type === primitivos.Identificador) {
        if (exp.Value === "null") {
            return null;
        }
        else {
            //la tabla tiene un padre
            temporal = tabSym;
            fija = tabSym;
            while (temporal != null) {
                simbolingo = temporal.getSimbolo(exp.Value);
                if (simbolingo === "ERROR") {
                    tipillo = temporal.getType(exp.Value)
                    temporal = temporal.Anterior;
                }
                else {

                    return simbolingo.tipo;
                }

            }
            tabSym = fija;
            temporal = fija;
            while (temporal != null) {
                type = temporal.getType(exp.Value);
                if (type === "ERROR") {
                    temporal = temporal.Anterior;
                }
                else {
                    return type.tipo;
                }
            }
            tabSym = fija;
            temporal = fija;
            while (temporal != null) {
                type = temporal.getTypeDef(exp.Value);
                if (type === "ERROR") {
                    temporal = temporal.Anterior;
                }
                else {
                    return type.tipo;
                }
            }
            tabSym = fija;
            temporal = fija;
            while (temporal != null) {
                arr = temporal.getArreglo(exp.Value);
                if (arr === "ERROR") {
                    temporal = temporal.Anterior;
                }
                else {
                    return "Array";
                }
            }

        }




    }
    



}

