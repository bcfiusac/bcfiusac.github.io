function Declaracion(tipoVar, id, tipoVarP, valor) {
    return {
        tipoVar: tipoVar,//si se puede editar
        id: id,
        tipoVarP: tipoVarP,//tipo de dato
        valor: valor,
        Type: instruccionesC.Declaracion

    }
}

function DeclaracionD(Instruccion, tabSym) {
    tabSymfija = tabSym;
    simprueba = tabSym.getSimbolo(Instruccion.id);
    if (simprueba === "ERROR") {
        tipovarP = Instruccion.tipoVarP;
        if (Instruccion.valor.Type === "Ternario") {
            //console.log("VIENE UNA DECLARACIÓN TERNARIA");
            let condicion;
            let condicionTipo;
            if (Instruccion.valor.var1.Type === primitivos.LLamarFuncion) {
                temp = getValor(Instruccion.valor.var1, tabSym);
                condicion = temp.valor;
                condicionTipo = temp.tipo;
            }
            else {
                condicion = getValor(Instruccion.valor.var1, tabSym);
                condicionTipo = getTipo(Instruccion.valor.var1, tabSym);
            }

            if (condicion && condicionTipo === "Booleano") {
                let valorV;
                let tipoV;
                if (Instruccion.valor.var2.Type === primitivos.LLamarFuncion) {
                    temp = getValor(Instruccion.valor.var2, tabSym);
                    valorV = temp.valor;
                    tipoV = temp.tipo;
                }
                else {
                    valorV = getValor(Instruccion.valor.var2, tabSym);
                    tipoV = getTipo(Instruccion.valor.var2, tabSym);
                }

                if ((tipoV === "Numero" && tipovarP === "number") || (tipoV === "Cadena" && tipovarP === "string") || (tipoV === "Booleano" && tipovarP === "boolean")) {
                    tabSym.setearSymbol(tipoV, Instruccion.id, valorV, Instruccion.tipoVar);
                }
                else if (tipovarP === 0) {
                    tabSym.setearSymbol(tipoV, Instruccion.id, valorV, Instruccion.tipoVar);
                }
                else {
                    //console.log("LOS TIPOS NO COINCIDEN - VARIABLE Y EXPRESION.");
                    const error = Error('Semantico', 'LOS TIPOS NO COINCIDEN - VARIABLE Y EXPRESION: ' + Instruccion.id);
                        Horrores.push(error);
                }

            }
            else if (condicion === false && condicionTipo === "Booleano") {
                let valorF;
                let tipoF;
                if (Instruccion.valor.var3.Type === primitivos.LLamarFuncion) {
                    temp = getValor(Instruccion.valor.var3, tabSym);
                    valorF = temp.valor;
                    tipoF = temp.tipo;
                }
                else {
                    valorF = getValor(Instruccion.valor.var3, tabSym);
                    tipoF = getTipo(Instruccion.valor.var3, tabSym);
                }

                if ((tipoF === "Numero" && tipovarP === "number") || (tipoF === "Cadena" && tipovarP === "string") || (tipoF === "Booleano" && tipovarP === "boolean")) {
                    tabSym.setearSymbol(tipoF, Instruccion.id, valorF, Instruccion.tipoVar);
                }
                else if (tipovarP === 0) {
                    tabSym.setearSymbol(tipoF, Instruccion.id, valorF, Instruccion.tipoVar);
                }
                else {
                    //console.log("LOS TIPOS NO COINCIDEN - VARIABLE Y EXPRESION.");
                    const error = Error('Semantico', 'LOS TIPOS NO COINCIDEN - VARIABLE Y EXPRESION: ' + Instruccion.id);
                        Horrores.push(error);
                }


            }
        }

        else if (Instruccion.valor.length > 0) {
            //viene un identificador
            //console.log("ES UN TYPE");
            simpruebas = tabSym.getType(Instruccion.id);
            if (simpruebas === "ERROR") {
                //----------------------------------------------------------------------------------
                while (tabSym.Anterior != null) {
                    tabSym = tabSym.Anterior;
                }
                tipoYa = tabSym.getTypeDef(Instruccion.tipoVarP);
                if (tipoYa === "ERROR") {
                    console.log("NO EXISTE EL TIPO DE TYPE");
                    const error = Error('Semantico', 'NO EXISTE EL TYPE: ' + Instruccion.tipoVarP);
                        Horrores.push(error);
                }
                else {
                    let copia = Object.assign({}, tipoYa);
                    copia.id = Instruccion.id;
                    let copias = Object.assign({},copia);
                    nueva = new SymTable([],[],[],[],[],null);
                    let newParams =[];
                    for (let i = 0; i < Instruccion.valor.length; i++) {
                        xd =copias.params.getSimbolo(Instruccion.valor[i].id);
                        if (xd === "ERROR") {
                            xds = copias.params.getType(Instruccion.valor[i].id);
                            if (xds === "ERROR") {
                                //console.log("NO SE ENCUENTRA LA VARIABLE BUSCADA");
                            }
                            else {
                                //aca tengo el type
                                xdss = Object.assign({},xds);
                                let valor;
                                let tipo;
                                if (Instruccion.valor[i].expr.Type === primitivos.LLamarFuncion) {
                                    temp = getValor(Instruccion.valor[i].expr, tabSym);
                                    valor = temp.valor;
                                    tipo = temp.tipo;
                                }
                                else {
                                    valor = getValor(Instruccion.valor[i].expr, tabSym);
                                    tipo = getTipo(Instruccion.valor[i].expr, tabSym);
                                }
                                xdss.params = valor;
                                //xdss.tipo = tipo;
                                nueva.setearTipo(xdss.id,xdss.params,Instruccion.tipoVar,xdss.tipo);

                            }
                        }
                        else {
                            //aca tengo el symbol
                            xdd = Object.assign({},xd);
                            let valor;
                            let tipo;
                            if (Instruccion.valor[i].expr.Type === primitivos.LLamarFuncion) {
                                temp = getValor(Instruccion.valor[i].expr, tabSym);
                                valor = temp.valor;
                                tipo = temp.tipo;
                            }
                            else {
                                valor = getValor(Instruccion.valor[i].expr, tabSym);
                                tipo = getTipo(Instruccion.valor[i].expr, tabSym);
                            }
                            //console.log("aver");
                            if(xd.tipo === tipo || tipo===null){
                                xdd.tipo = tipo;
                                xdd.value = valor;
                                nueva.setearSymbol(xdd.tipo,xdd.id,xdd.value,xdd.editar);
                            }
                        }
                    }
                    tabSym = tabSymfija;
                    tabSym.setearTipo(copias.id,nueva,Instruccion.tipoVar,Instruccion.tipoVarP);




                    /*tabSym = tabSymfija;
                    cantParams = Instruccion.valor.length;
                    const nueva = new SymTable([], [], [], [], [], null);
                    const mismas = [];
                    for (let i = 0; i < cantParams; i++) {
                        let valor;
                        let tipo;
                        if (Instruccion.valor[i].expr === "number" || Instruccion.valor[i].expr === "string"
                            || Instruccion.valor[i].expr === "boolean") {
                            //SI EL OBJETO ES DE ALGUN TIPO DEFINIDO
                            if (Instruccion.valor[i].expr === "number") {
                                nueva.setearSymbol("Numero", Instruccion.valor[i].id, 0, true);
                            }
                            else if (Instruccion.valor[i].expr === "string") {
                                nueva.setearSymbol("Cadena", Instruccion.valor[i].id, "", true);
                            }
                            else {
                                nueva.setearSymbol("Booleano", Instruccion.valor[i].id, false, true);
                            }


                        }
                        else if (Instruccion.valor[i].expr.Value === Instruccion.id) {
                            //tiene un atributo del mismo tipo del type
                            mismas.push(Instruccion.valor[i]);
                        }

                        else if (Instruccion.valor[i].expr.Type === primitivos.LLamarFuncion) {
                            temp = getValor(Instruccion.valor[i].expr, tabSym);
                            valor = temp.valor;
                            tipo = temp.tipo;
                            nueva.setearSymbol(tipo, Instruccion.valor[i].id, valor, true);
                        }
                        else if (Instruccion.valor[i].expr.Type === primitivos.Identificador
                            && (tabSym.getSimbolo(Instruccion.valor[i].expr.id) === "ERROR"
                                && tabSym.getType(Instruccion.valor[i].expr.Value) != "ERROR")) {
                            //LO QUE VIENE ES UN TIPO
                            tipoAgregar = tabSym.getType(Instruccion.valor[i].expr.Value);
                            nueva.setearTipo(Instruccion.valor[i].id, tipoAgregar.params);
                        }
                        else {
                            valor = getValor(Instruccion.valor[i].expr, tabSym);
                            tipo = getTipo(Instruccion.valor[i].expr, tabSym);
                            nueva.setearSymbol(tipo, Instruccion.valor[i].id, valor, true);
                        }
                        //nueva.setearSymbol(tipo,Instruccion.valor[i].id,valor,true);

                    }
                    //YA TERMINE DE SETEAR TODAS MIS VARIABLES EN LA TABLA DE SIMBOLOS QUE LLEVA EL TIPO
                    //PROCEDO A ALMACENAR EL TIPO LLENO EN MI TABLA DE SIMBOLOS ACTUAL
                    //ANTES REVISO SI HAY VARIABLES DEL MISMO TIPO
                    for (let o = 0; o < mismas.length; o++) {
                        //si hay objetos del mismo tipo dentro :$
                        nueva.setearTipo(mismas[o].id, nueva, Instruccion.tipoVar, Instruccion.tipoVarP);
                    }
                    tabSym.setearTipo(Instruccion.id, nueva, Instruccion.tipoVar, Instruccion.tipoVarP);
                    console.log("AVEEEEEEEEER");

                    //----------------------------------------------------------------------------------
                        */
                }

            }
            else {
                //console.log("YA EXISTE EL TIPO");
                const error = Error('Semantico', 'YA EXISTE EL TIPO: ' + Instruccion.id);
                        Horrores.push(error);
            }

        }


        else {
            let valor;
            let tipo;
            if (Instruccion.valor.Type === primitivos.LLamarFuncion) {
                temp = getValor(Instruccion.valor, tabSym);
                valor = temp.valor;
                tipo = temp.tipo;
            }
            else {
                valor = getValor(Instruccion.valor, tabSym);
                tipo = getTipo(Instruccion.valor, tabSym);
            }
            const findValor = valor;//encuentro el valor de la expresion
            const findTipo = tipo;//encuentro el tipo de la expresion final
            //metodos de validación para la tabla de simbolos

            if (findValor === undefined) {

            }
            else {
                if(findTipo==="Type"){
                    copia = Object.assign({}, findValor);
                    tabSym.setearTipo(Instruccion.id,copia.params,Instruccion.tipoVar,copia.tipo);

                }
                else if(findTipo==="Array"){
                    copia = Object.assign({}, findValor);
                    tabSym.setearArreglo(Instruccion.tipoVar,Instruccion.id,copia.tipo,copia.valsdim);
                }
                else if (tipovarP === 0) {
                    //console.log("NO TRAE TIPO");
                    probador = Number(findValor);
                    if (Number.isNaN(probador)) {
                        Instruccion.tipoVarP = "Cadena";
                        tabSym.setearSymbol("Cadena", Instruccion.id, findValor, Instruccion.tipoVar);
                    }
                    else if (findValor === false) {
                        Instruccion.tipoVarP = "Booleano";
                        tabSym.setearSymbol("Booleano", Instruccion.id, findValor, Instruccion.tipoVar);
                    }
                    else if (findValor === true) {
                        Instruccion.tipoVarP = "Booleano";
                        tabSym.setearSymbol("Booleano", Instruccion.id, findValor, Instruccion.tipoVar);
                    }
                    else if (!(Number.isNaN(probador))) {
                        Instruccion.tipoVarP = "Numero";
                        tabSym.setearSymbol("Numero", Instruccion.id, findValor, Instruccion.tipoVar);
                    }




                }
                else if ((tipovarP === "number" || tipovarP === "Numero") && findTipo === primitivos.Numero || (tipovarP === "string" || tipovarP === "Cadena") && findTipo === primitivos.Cadena || (tipovarP === "boolean" || tipovarP === "Booleano") && findTipo === primitivos.Booleano) {
                    //console.log("coinciden los tipos");
                    tabSym.setearSymbol(findTipo, Instruccion.id, findValor, Instruccion.tipoVar);
                }
                else if(tipovarP===findTipo && findValor.params){
                    tabSym.setearTipo(Instruccion.id,findValor.params,findTipo.Var,findTipo);
                }
                else {
                    //console.log("NO COINCIDEN LOS TIPOS");
                    const error = Error('Semantico', 'LOS TIPOS NO COINCIDEN ASIGNANDO: ' + Instruccion.id);
                        Horrores.push(error);
                }

            }

        }


    }
    else {
        const error = Error('Semantico', 'LA VARIABLE YA EXISTE: ' + Instruccion.id);
                        Horrores.push(error);
    }




}