function While(expresion,sentencias){
    return{
        expresion:expresion,
        sentencias:sentencias,
        Type:instruccionesC.While
    }
}

function WhileD(Instruccion,tabSym){
    //nueva tabla de simbolos acá
    let res = null;
    probador = Instruccion;
    console.log("HOLA JEJEJEJE");
    sentencias = Instruccion.sentencias;
    condicion = Instruccion.expresion;
    let validarCondicion;
    let tipoCond;
    if (Instruccion.expresion.Type === primitivos.LLamarFuncion) {
        temp = getValor(Instruccion.expresion, tabSym);
        validarCondicion = temp.valor;
        tipoCond = temp.tipo;
    }
    else {
        validarCondicion = getValor(Instruccion.expresion, tabSym);
        tipoCond = getTipo(Instruccion.expresion, tabSym);
    }
    if(validarCondicion){
        do{
            res = arbolR(Instruccion.sentencias,tabSym);
            if(res!=null){
                if(res.Type===instruccionesC.Breik){
                    break;
                }
                else if(res.Type===instruccionesC.Continuar){
                    continue;
                }
                else if(res.Type===instruccionesC.Return){
                    return res;
                }
            }
            
            //validarCondicion = getValor(Instruccion.expresion,tabSym);
            if (Instruccion.expresion.Type === primitivos.LLamarFuncion) {
                temp = getValor(Instruccion.expresion, tabSym);
                validarCondicion = temp.valor;
                tipoCond = temp.tipo;
            }
            else {
                validarCondicion = getValor(Instruccion.expresion, tabSym);
                tipoCond = getTipo(Instruccion.expresion, tabSym);
            }

        }
        while(validarCondicion)
    }
    else console.log("NO SE ENTRA AL CICLO, NO CUMPLE");
    
}