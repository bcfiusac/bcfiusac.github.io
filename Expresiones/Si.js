function Si(expr, bloque, demas){
    return{
        expr:expr,
        bloque:bloque,
        demas:demas,
        Type:instruccionesC.Si

    }
}
function SiD(Instruccion,tabSym){
    prueba = Instruccion;
    console.log("LLEGUE ACA JEJEJEJE");
    booleano = getValor(Instruccion.expr,tabSym);
    if(booleano){
        console.log("es cierto");
            arbolR(Instruccion.bloque,tabSym);
    }
    else {
        console.log("es mentira");
        if(Instruccion.demas){
            if(Instruccion.demas[0].Type==="Si"){
                SiD(Instruccion.demas,tabSym);
            }
            else{
                arbolR(Instruccion.demas,tabSym);
            }
            
        }
        
        
}

}