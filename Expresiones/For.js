function For(asignacion,condicion,incdec,sentencias){
    return{
        asignacion:asignacion,
        condicion:condicion,
        incdec:incdec,
        sentencias:sentencias,
        Type:instruccionesC.For
    }
}

function ForD(Instruccion,tabSym){
console.log("ESTOY EN EL FOR");
arbolRSingle(Instruccion.asignacion,tabSym);//declaro y asigno la variable
Condicion = getValor(Instruccion.condicion,tabSym);//obtengo la condicion
tipoCondicion = getTipo(Instruccion.condicion,tabSym);//obtengo el tipo de la condicion
if(Condicion && tipoCondicion==="Booleano"){
do{
    arbolR(Instruccion.sentencias,tabSym);
    arbolRSingle(Instruccion.incdec,tabSym);
}
while(getValor(Instruccion.condicion,tabSym));
}
}