function DoWhile(sentencias,expresion){
    return{
        sentencias:sentencias,
        expresion:expresion,
        Type:instruccionesC.DoWhile
    }
}

function DoWhileD(Instruccion,tabSym){
    probador = Instruccion;
    console.log("HOLA JEJEJEJE");
    sentencias = Instruccion.expresion;//aqui hay un error jejeje pero funca :v
    condicion = Instruccion.sentencias;//aqui tambien obviamente :'v
    
        do{
            arbolR(Instruccion.sentencias,tabSym);
        }
        while(getValor(Instruccion.expresion,tabSym))

    
    
}