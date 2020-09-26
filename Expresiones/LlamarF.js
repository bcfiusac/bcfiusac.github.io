function LlamarF(id, listaexp) {
    return {
        id: id,
        listaexp: listaexp,
        Type: instruccionesC.LLamarF
    }

}

function LlamarFD(Instruccion, tabSym) {

}
function getValorFuncion(Instruccion, tabSym) {
    nueva = new SymTable([], [], tabSym); //le quité la constante porque sino no puedo agregarle el return :'v
    Valores = Instruccion.listaexp.length;
    funcion = 0;
    tempo = tabSym;
    if (tempo.Anterior != null) {//NO ES LA TABLA GENERAL, TIENE PADRE
        while (tempo != null) {//BUSCA LA FUNCION EN CUALQUIER TABLA
            funcion = tempo.getFuncion(Instruccion.id);
            if (funcion != "ERROR") {
                break;
            }
            else if (tempo.Anterior != null) {
                tempo = tempo.Anterior;
            }
            else {
                break;
            }
        }
        if (funcion === "ERROR") { }
        else {
            //YA ENCONTRE LA FUNCION EN CUALQUIERA DE LAS TABLAS DE SIMBOLOS EN QUE SE ENCUENTRE
            xd = funcion;
        }
    }

    else {
        funcion = tabSym.getFuncion(Instruccion.id);
    }
    ahora = funcion;
    banderatipos = true;
    Declaraciones = [];
    //funcion.parametros[i] ---- parametros fijos de la funcion a recibir
    //Instruccion.listaexp[i] ---- parametros enviados para la funcion
    if (funcion.parametros.length === Valores) {//SI LA CANTIDAD DE PARAMETROS COINCIDEN
        for (let x = 0; x < Valores; x++) {
            const pax = getTipo(Instruccion.listaexp[x],tabSym);
            if (funcion.parametros[x].tipo === "number" && getTipo(Instruccion.listaexp[x],tabSym) === "Numero"
                || funcion.parametros[x].tipo === "string" && getTipo(Instruccion.listaexp[x],tabSym) === "Cadena" ||
                funcion.parametros[x].tipo === "boolean" && getTipo(Instruccion.listaexp[x],tabSym) === "Booleano") {
                valor = getValor(Instruccion.listaexp[x],tabSym);
                tipo = getTipo(Instruccion.listaexp[x],tabSym);
                if (valor === undefined) { }
                else {
                    Declaraciones.push(Declaracion(true, funcion.parametros[x].id, funcion.parametros[x].tipo, Instruccion.listaexp[x]));
                }

            }
            else {
                banderatipos = false;
            }
        }
        if (banderatipos) {
            console.log("COINCIDEN LA CANTIDAD DE VARIABLES Y TIPOS DE LAS MISMAS");
            //SE PROCEDE A CREAR UNA TABLA DE SIMBOLOS NUEVA DONDE SE ASIGNAN LOS PARAMETROS
            ahoraxd = Declaraciones;
            arbolR(Declaraciones, nueva);
            ahora = nueva;
            xd = arbolR(funcion.sentencias, nueva);
            //for(let x =0;x<nueva.Symbol.length;x++){
            if (xd != null && xd.Type === instruccionesC.Return) {
                //viene un return
                //valor = nueva.Symbol[x].value.Type;
                return xd.valor;
                //return getTipo(nueva.Symbol[x].value,nueva);
            }
            //if(nueva.Symbol[x].editar === 0 && nueva.Symbol[x].tipo===1){
            //viene un return
            //  valor = nueva.Symbol[x].value.Type;
            //  return getValor(nueva.Symbol[x].value,nueva);
            // }
            //}
            console.log("byron");
            //byron = nueva;
            //abc = xd;
            //aver = getValor(xd,nueva);
            //console.log("xdxdxdsd");
            //return aver;
            //xds = xd;
            //nueva ES MI TABLA DE SIMBOLOS CON LOS PARAMETROS YA AGREGADOS


        }
    }


}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//---------------------------------------------------------------------------------------------------
//¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿
function getTipoFuncion(Instruccion, tabSym) {
    const nueva = new SymTable([], [], tabSym);
    Valores = Instruccion.listaexp.length;
    funcion = 0;
    tempo = tabSym;
    if (tempo.Anterior != null) {//NO ES LA TABLA GENERAL, TIENE PADRE
        while (tempo != null) {//BUSCA LA FUNCION EN CUALQUIER TABLA
            funcion = tempo.getFuncion(Instruccion.id);
            if (funcion != "ERROR") {
                break;
            }
            else if (tempo.Anterior != null) {
                tempo = tempo.Anterior;
            }
            else {
                break;
            }
        }
        if (funcion === "ERROR") { }
        else {
            //YA ENCONTRE LA FUNCION EN CUALQUIERA DE LAS TABLAS DE SIMBOLOS EN QUE SE ENCUENTRE
            xd = funcion;
        }
    }

    else {
        funcion = tabSym.getFuncion(Instruccion.id);
    }
        ahora = funcion;
        banderatipos = true;
        Declaraciones = [];
        //funcion.parametros[i] ---- parametros fijos de la funcion a recibir
        //Instruccion.listaexp[i] ---- parametros enviados para la funcion
        if (funcion.parametros.length === Valores) {//SI LA CANTIDAD DE PARAMETROS COINCIDEN
            for (let x = 0; x < Valores; x++) {
                if (funcion.parametros[x].tipo === "number" && getTipo(Instruccion.listaexp[x],tabSym) === "Numero"
                    || funcion.parametros[x].tipo === "string" && getTipo(Instruccion.listaexp[x],tabSym) === "Cadena" ||
                    funcion.parametros[x].tipo === "boolean" && getTipo(Instruccion.listaexp[x],tabSym) === "Booleano") {
                    valor = getValor(Instruccion.listaexp[x],tabSym);
                    tipo = getTipo(Instruccion.listaexp[x],tabSym);
                    if (valor === undefined) { }
                    else {
                        Declaraciones.push(Declaracion(true, funcion.parametros[x].id, funcion.parametros[x].tipo, Instruccion.listaexp[x]));
                    }

                }
                else {
                    banderatipos = false;
                }
            }
            if (banderatipos) {
                console.log("COINCIDEN LA CANTIDAD DE VARIABLES Y TIPOS DE LAS MISMAS");
                //SE PROCEDE A CREAR UNA TABLA DE SIMBOLOS NUEVA DONDE SE ASIGNAN LOS PARAMETROS
                ahoraxd = Declaraciones;
                arbolR(Declaraciones, nueva);
                ahora = nueva;
                xd = arbolR(funcion.sentencias, nueva);
                //for(let x =0;x<nueva.Symbol.length;x++){
                //if(nueva.Symbol[x].editar === 0 && nueva.Symbol[x].tipo===1){
                if (xd != null && xd.Type === instruccionesC.Return) {
                    //viene un return
                    //valor = nueva.Symbol[x].value.Type;
                    return xd.tipo;
                    //return getTipo(nueva.Symbol[x].value,nueva);
                }
                //}
                console.log("byron");
                //byron = nueva;
                //abc = xd;
                //aver = getValor(xd,nueva);
                //console.log("xdxdxdsd");
                //return aver;
                //xds = xd;
                //nueva ES MI TABLA DE SIMBOLOS CON LOS PARAMETROS YA AGREGADOS


            }
        }
    

}