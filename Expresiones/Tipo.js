function Tipo(id,params,tipoVarP,tipo) {
    return {
        id: id,
        params: params,
        tipoVarP:tipoVarP,
        tipo:tipo,
        Type: instruccionesC.Tipo
    }

}

function TipoD(instruccion, tabSym) {
    //console.log("TENGO UN TIPO PARA GUARDAR EN LA TABLA DE SIMBOLOS");
    //instruccion.id
    //instruccion.params
    aver = tabSym.getType(instruccion.id);
    if (aver === "ERROR") {
        //no existe un TYPE con ese nombre
        cantParams = instruccion.params.length;
        const nueva = new SymTable([], [], [], [], null);
        const mismas = [];
        for (let i = 0; i < cantParams; i++) {
            let valor;
            let tipo;
            if(instruccion.params[i].expr === "number" || instruccion.params[i].expr === "string" 
            || instruccion.params[i].expr === "boolean" ){
                //SI EL OBJETO ES DE ALGUN TIPO DEFINIDO
                if(instruccion.params[i].expr === "number"){
                    nueva.setearSymbol("Numero", instruccion.params[i].id, 0, true);
                }
                else if(instruccion.params[i].expr === "string"){
                    nueva.setearSymbol("Cadena", instruccion.params[i].id, "", true);
                }
                else{
                    nueva.setearSymbol("Booleano", instruccion.params[i].id, false, true);
                }
                

            }
            else if( instruccion.params[i].expr.Value === instruccion.id){
                //tiene un atributo del mismo tipo del type
                mismas.push(instruccion.params[i]);
            }
            
            else if (instruccion.params[i].expr.Type === primitivos.LLamarFuncion) {
                temp = getValor(instruccion.params[i].expr, tabSym);
                valor = temp.valor;
                tipo = temp.tipo;
                nueva.setearSymbol(tipo, instruccion.params[i].id, valor, true);
            }
            else if (instruccion.params[i].expr.Type === primitivos.Identificador
                && (tabSym.getSimbolo(instruccion.params[i].expr.id) === "ERROR"
                    && tabSym.getType(instruccion.params[i].expr.Value) != "ERROR")) {
                //LO QUE VIENE ES UN TIPO
                tipoAgregar = tabSym.getType(instruccion.params[i].expr.Value);
                nueva.setearTipo(instruccion.params[i].id, tipoAgregar.params,instruccion.params[i].id,instruccion.tipoVarP,instruccion.id);
            }
            else {
                valor = getValor(instruccion.params[i].expr, tabSym);
                tipo = getTipo(instruccion.params[i].expr, tabSym);
                nueva.setearSymbol(tipo, instruccion.params[i].id, valor, true);
            }
            //nueva.setearSymbol(tipo,instruccion.params[i].id,valor,true);

        }
        //YA TERMINE DE SETEAR TODAS MIS VARIABLES EN LA TABLA DE SIMBOLOS QUE LLEVA EL TIPO
        //PROCEDO A ALMACENAR EL TIPO LLENO EN MI TABLA DE SIMBOLOS ACTUAL
        //ANTES REVISO SI HAY VARIABLES DEL MISMO TIPO
        for(let o =0;o<mismas.length;o++){
            //si hay objetos del mismo tipo dentro :$
            nueva.setearTipo(mismas[o].id,nueva,true,instruccion.id);
        }
        tabSym.setearTipoDef(instruccion.id, nueva,true,instruccion.id);
        //console.log("AVEEEEEEEEER");
    }
    else {
        //console.log("YA EXISTE UN TYPE CON ESE NOMBRE");
        const error = Error('Semantico', 'YA EXISTE UN TYPE CON ESE NOMBRE: ' + Instruccion.id);
                        Horrores.push(error);
    }


}