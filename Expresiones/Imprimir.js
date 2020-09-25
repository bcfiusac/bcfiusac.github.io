function Imprimir(valores){
return{
    valores:valores,
    Type:instruccionesC.Imprimir
}
}

function ImprimirD(Instruccion, tabSym){
    findValor = getValor(Instruccion.valores,tabSym);
    if(findValor===undefined){
        console.log("PROBLEMA EN EL CONTENIDO A IMPRIMIR, TIPOS NO COINCIDEN");
    }
    else{
        console.log(findValor);
    }
    
}