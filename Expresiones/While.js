function While(expresion,sentencias){
    return{
        expresion:expresion,
        sentencias:sentencias,
        Type:instruccionesC.While
    }
}

function WhileD(Instruccion,tabSym){
    probador = Instruccion;
    console.log("HOLA JEJEJEJE");
    sentencias = Instruccion.sentencias;
    condicion = Instruccion.expresion;
    validarCondicion = getValor(Instruccion.expresion,tabSym);
    if(validarCondicion){
        do{
            arbolR(Instruccion.sentencias,tabSym);
        }
        while(getValor(Instruccion.expresion,tabSym))
    }
    else console.log("NO SE ENTRA AL CICLO, NO CUMPLE");
    
}