function Imprimir(valores){
return{
    valores:valores,
    Type:instruccionesC.Imprimir
}
}

function ImprimirD(Instruccion, tabSym){
    let findValor ;
    let findTipo;
    if (Instruccion.valores.Type === primitivos.LLamarFuncion) {
        temp = getValor(Instruccion.valores, tabSym);
        findValor = temp.valor;
        findTipo = temp.tipo;
    }
    else {
        findValor = getValor(Instruccion.valores, tabSym);
        findTipo = getTipo(Instruccion.valores, tabSym);
    }
    if(findValor===undefined){
        console.log("PROBLEMA EN EL CONTENIDO A IMPRIMIR, TIPOS NO COINCIDEN");
    }
    else{
        console.log(findValor);
        return findValor;
    }
    
}