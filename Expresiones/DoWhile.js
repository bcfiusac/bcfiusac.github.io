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