function IncDec(id, signo) {
    return {
        id: id,
        signo: signo,
        Type: instruccionesC.IncDec
    }
}
function IncDecD(Instruccion, tabSym) {
    //findValor = getValor(Instruccion.valor,tabSym);
    temporal = tabSym;
    if (tabSym.Anterior) {
        temporal = tabSym;
        while (temporal != null) {
            simbolillo = temporal.getSimbolo(Instruccion.id);
            if (simbolillo === "ERROR") {
                temporal = temporal.Anterior;
            }
            else break;
        }
        if (simbolillo != "ERROR") {
            //console.log("SI SE PUEDE HACER :V");
            if (simbolillo.editar) {
                if (simbolillo.tipo === "Numero") {
                    if (Instruccion.signo === "++") {//incremento
                        simbolillo.value = Number(simbolillo.value) + 1;
                        temporal.ActSimbolo(simbolillo.id, simbolillo);
                    }
                    else {//Decremento
                        simbolillo.value = Number(simbolillo.value) - 1;
                        temporal.ActSimbolo(simbolillo.id, simbolillo);
                    }

                }
                else {
                    //console.log("NO SE PUEDE INCREMENTAR/DECREMENTAR UNA CADENA O BOOL");
                    const error = Error('Semantico', 'NO SE PUEDE INCREMENTAR/DECREMENTAR UNA CADENA O BOOL: ' + Instruccion.id);
                        Horrores.push(error);
                    
                }
            }
        }
        else {
            //console.log("NO SE CUENTRA LA VARIABLE A INCREMENTAR/DECREMENTAR");
            const error = Error('Semantico', 'NO SE ENCUENTRA LA VARIABLE: ' + Instruccion.id);
                        Horrores.push(error);
        }


    }
    else {
        findVar = tabSym.getSimbolo(Instruccion.id);
        if (findVar === undefined) { }
        else {
            if (findVar.editar) {
                if (findVar.tipo === "Numero") {
                    if (Instruccion.signo === "++") {//incremento
                        findVar.value = Number(findVar.value) + 1;
                        tabSym.ActSimbolo(findVar.id, findVar);
                    }
                    else {//Decremento
                        findVar.value = Number(findVar.value) - 1;
                        tabSym.ActSimbolo(findVar.id, findVar);
                    }

                }
                else {
                    //console.log("NO SE PUEDE INCREMENTAR/DECREMENTAR UNA CADENA O BOOL");
                    const error = Error('Semantico', 'NO SE PUEDE INCREMENTAR/DECREMENTAR UNA CADENA O BOOL: ' + Instruccion.id);
                        Horrores.push(error);
                }
            }

        }

    }

}

