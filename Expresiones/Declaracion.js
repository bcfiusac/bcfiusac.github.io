function Declaracion(tipoVar, id, tipoVarP, valor) {
    return {
        tipoVar: tipoVar,//si se puede editar
        id: id,
        tipoVarP: tipoVarP,//tipo de dato
        valor: valor,
        Type: instruccionesC.Declaracion

    }
}

function DeclaracionD(Instruccion, tabSym) {
    simprueba = tabSym.getSimbolo(Instruccion.id);
    if (simprueba === "ERROR") {
        tipovarP = Instruccion.tipoVarP;
        if (Instruccion.valor.Type === "Ternario") {
            console.log("VIENE UNA DECLARACIÓN TERNARIA");
            condicion = getValor(Instruccion.valor.var1, tabSym);
            condicionTipo = getTipo(Instruccion.valor.var1, tabSym);
            if (condicion && condicionTipo === "Booleano") {
                valorV = getValor(Instruccion.valor.var2, tabSym);
                tipoV = getTipo(Instruccion.valor.var2, tabSym);
                if((tipoV==="Numero"&&tipovarP==="number")||(tipoV==="Cadena"&&tipovarP==="string")||(tipoV==="Booleano"&&tipovarP==="boolean")){
                    tabSym.setearSymbol(tipoV, Instruccion.id, valorV, Instruccion.tipoVar);
                }
                else{
                    console.log("LOS TIPOS NO COINCIDEN - VARIABLE Y EXPRESION.");
                }
                
            }
            else if (condicion === false && condicionTipo === "Booleano") {
                valorF = getValor(Instruccion.valor.var3, tabSym);
                tipoF = getTipo(Instruccion.valor.var3, tabSym);
                if((tipoF==="Numero"&&tipovarP==="number")||(tipoF==="Cadena"&&tipovarP==="string")||(tipoF==="Booleano"&&tipovarP==="boolean")){
                    tabSym.setearSymbol(tipoF, Instruccion.id, valorF, Instruccion.tipoVar);
                }
                else{
                    console.log("LOS TIPOS NO COINCIDEN - VARIABLE Y EXPRESION.");
                }


            }
        } else {
            const findValor = getValor(Instruccion.valor, tabSym);//encuentro el valor de la expresion
            const findTipo = getTipo(Instruccion.valor, tabSym);//encuentro el tipo de la expresion final
            //metodos de validación para la tabla de simbolos

            if (findValor === undefined) {

            }
            else {
                if (tipovarP === 0) {
                    //console.log("NO TRAE TIPO");
                    probador = Number(findValor);
                    if (Number.isNaN(probador)) {
                        Instruccion.tipoVarP = "Cadena";
                        tabSym.setearSymbol("Cadena", Instruccion.id, findValor, Instruccion.tipoVar);
                    }
                    else if (findValor === false) {
                        Instruccion.tipoVarP = "Booleano";
                        tabSym.setearSymbol("Booleano", Instruccion.id, findValor, Instruccion.tipoVar);
                    }
                    else if (findValor === true) {
                        Instruccion.tipoVarP = "Booleano";
                        tabSym.setearSymbol("Booleano", Instruccion.id, findValor, Instruccion.tipoVar);
                    }
                    else if (!(Number.isNaN(probador))) {
                        Instruccion.tipoVarP = "Numero";
                        tabSym.setearSymbol("Numero", Instruccion.id, findValor, Instruccion.tipoVar);
                    }




                }
                else if ((tipovarP === "number"||tipovarP==="Numero") && findTipo === primitivos.Numero || (tipovarP === "string"||tipovarP==="Cadena") && findTipo === primitivos.Cadena || (tipovarP === "boolean"||tipovarP==="Booleano") && findTipo === primitivos.Booleano) {
                    console.log("coinciden los tipos");
                    tabSym.setearSymbol(findTipo, Instruccion.id, findValor, Instruccion.tipoVar);
                }
                else {
                    console.log("NO COINCIDEN LOS TIPOS");
                }

            }

        }


    }
    else {
        console.log("LA VARIABLE YA EXISTE");
    }




}