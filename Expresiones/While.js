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
    validarCondicion = getValor(Instruccion.expresion,tabSym);
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
            
        }
        while(getValor(Instruccion.expresion,tabSym))
    }
    else console.log("NO SE ENTRA AL CICLO, NO CUMPLE");
    
}