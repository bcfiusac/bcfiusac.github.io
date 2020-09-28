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
let Condicion ;//obtengo la condicion
let tipoCondicion ;
if (Instruccion.condicion.Type === primitivos.LLamarFuncion) {
    temp = getValor(Instruccion.condicion, tabSym);
    condicion = temp.valor;
    tipoCondicion = temp.tipo;
}
else {
    Condicion = getValor(Instruccion.condicion, tabSym);
    tipoCondicion = getTipo(Instruccion.condicion, tabSym);
}
//obtengo el tipo de la condicion
if(Condicion && tipoCondicion==="Booleano"){
do{
    //arbolR(Instruccion.sentencias,tabSym);
    arbolR(Instruccion.incdec,tabSym);

    res = arbolR(Instruccion.sentencias,tabSym);
            if(res!=null){
                if(res.Type===instruccionesC.Breik){
                    break;
                }
                else if(res.Type===instruccionesC.Continuar){
                    arbolR([Instruccion.incdec],tabSym);
                    continue;
                }
                else if(res.Type===instruccionesC.Return){
                    return res;
                }
            }
            arbolR([Instruccion.incdec],tabSym);
            if (Instruccion.condicion.Type === primitivos.LLamarFuncion) {
                temp = getValor(Instruccion.condicion, tabSym);
                condicion = temp.valor;
                tipoCondicion = temp.tipo;
            }
            else {
                Condicion = getValor(Instruccion.condicion, tabSym);
                tipoCondicion = getTipo(Instruccion.condicion, tabSym);
            }
}
while(Condicion);
}
}