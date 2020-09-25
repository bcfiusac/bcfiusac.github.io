function Switch(expresion, casos){
    return{
        expresion:expresion,
        casos:casos,
        Type:instruccionesC.Switch
    }

}

function SwitchD(Instruccion, tabSym){
console.log("ENCONTRE UN SWITCH :v");
ValorBuscado = getValor(Instruccion.expresion,tabSym);
tipoBuscado = getTipo(Instruccion.expresion,tabSym);
console.log("hola");
contadorDefaults=0;
bandera = 0;
match = 0;
breik = -1;
for(let i = 0;i<Instruccion.casos.length;i++){
    if(Instruccion.casos[i].expresion===0){
        console.log("ENCONTRE UN DEFAULT");
        contadorDefaults++;
    }
    else{
        valorCase = getValor(Instruccion.casos[i].expresion,tabSym);
        tipoCase = getTipo(Instruccion.casos[i].expresion,tabSym);
        if(ValorBuscado===valorCase && tipoBuscado===tipoCase){
            console.log("HE ENCONTRADO UN CASE QUE HACE MATCH");
            bandera = true;//la instrucción que hace match
            //arbolR(Instruccion.casos[i].sentencias,tabSym);
            for(let x = 0;x<Instruccion.casos[i].sentencias.length;x++){
                if(Instruccion.casos[i].sentencias[x]==="break"){
                    console.log("HE ENCONTRADO UN BREAK DENTRO DEL CASE");
                    break;
                }
                else{
                    //EJECUTO LA INSTRUCCION PORQUE NO ES UN BREAK
                    arbolRSingle(Instruccion.casos[i].sentencias[x],tabSym);
                    //arbolR(Instruccion.casos[i].sentencias[x],tabSym);
                }
            }
            
        }
    }
}
if(!bandera){
    console.log("NINGUN CASE HA HECHO MATCH");
    if(contadorDefaults>0){
        console.log("PERO EXISTE UN DEFAULT POR EJECUTAR");
        //EJECUTAR SENTENCIAS DEL DEFAULT
        for(let i = 0;i<Instruccion.casos.length;i++){
            if(Instruccion.casos[i].expresion===0){
                console.log("ENCONTRE UN DEFAULT");
                arbolR(Instruccion.casos[i].sentencias,tabSym);
                
            }
        }
    }
    else{
        console.log("NO HAY DEFAULT NI CASE QUE HAGA MATCH");
    }
}
else{
    console.log("YA HIZO MATCH CON UN CASE");//falta enviar a ejectuar las sentencias de ese case :'v
}
}