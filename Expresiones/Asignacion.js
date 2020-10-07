function Asignacion(id, signo, valor) {
    return {
        id: id,
        signo: signo,
        valor: valor,
        Type: instruccionesC.Asignacion
    }
}

function AsignacionD(Instruccion, tabSym) {
    const tabSymfija = tabSym;
    if (Instruccion.signo === "xd") {
        //console.log("ES UNA ASIGNACIÓN A UN TYPE");
        if (tabSym.Anterior) {
            //console.log("LA TABSYM TIENE PADRE");
            let tipejo;
            while (tabSym != null) {
                tipejo = tabSym.getType(Instruccion.id);
                if (tipejo === "ERROR") {
                    tabSym = tabSym.Anterior;
                }
                else {
                    break;
                }
            }
            if (tipejo != "ERROR") {
                //console.log("EL TIPO SI EXISTE");

            }
            else {
                //console.log("EL TIPO NO EXISTE");
                const error = Error('Semantico', 'NO SE ENCONTRÓ EL TYPE A ASIGNAR: ' + Instruccion.id);
                Horrores.push(error);

            }
        }
        else {
            //console.log("ES LA TABSYM GLOBAL");
            tape = tabSym.getType(Instruccion.id);
            if (tape === "ERROR") {
                //console.log("NO EXISTE EL TYPE EN ESTE ENTORNO");
            }
            else {
                //console.log("ENCONTRE EL TYPE");
                let contador = tape.params.Symbol.length + tape.params.Tipo.length;
                if (Instruccion.valor.length === contador) {
                    //console.log("la cantidad de valores coincide");
                    for (let i = 0; i < contador; i++) {
                        temp = tape.params.getSimbolo(Instruccion.valor[i].id);
                        if (temp === "ERROR") {
                            temp = tape.params.getType(Instruccion.valor[i].id);
                            if (temp === "ERROR") {
                                //LA VARIABLE NO ESTA NI EN SIMBOL NI EN TYPE
                            }
                            else {
                                //aca tengo en temp el nodo type a cambiar
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
                                if (temp.tipo === tipo || temp.tipo === null) {
                                    temp.params = valor;
                                }
                                else {
                                    const error = Error('Semantico', 'ERROR DE TIPOS AL ASIGNAR: ' + Instruccion.id);
                                    Horrores.push(error);
                                }



                            }
                        }
                        else {
                            //aca tengo en temp el nodo simbolo a cambiar
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
                            if (temp.tipo === tipo || temp.tipo === null) {
                                temp.tipo = tipo;
                                temp.value = valor;
                            }
                            else {
                                //console.log("ERROR DE TIPOS");
                                const error = Error('Semantico', 'ERROR DE TIPOS AL ASIGNAR: ' + Instruccion.id);
                                Horrores.push(error);
                            }
                        }
                    }
                }
                else {
                    //console.log("los valores no coinciden");
                    const error = Error('Semantico', 'LOS PARAMETROS NO COINCIDEN EN: ' + Instruccion.id);
                    Horrores.push(error);
                }

            }
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
        const findValor = valor;
        const findTipo = tipo;
        if (tabSym.Anterior) { //NO ES UNA TABLA DE SIMBOLOS GLOBAL

            //const tabSymfija = tabSym;//por si me cambio a otra tabla de simbolos
            simbolillo = 7;
            while (tabSym != null) {
                simbolillo = tabSym.getSimbolo(Instruccion.id);
                if (simbolillo != "ERROR") {
                    break;
                }
                else {
                    if (tabSym.Anterior != null) {
                        tabSym = tabSym.Anterior
                    }
                    else break;
                }
            }
            if (simbolillo === "ERROR") {
                //console.log("LA VARIABLE A LA CUAL QUIERE ASIGNAR UN VALOR, NO EXISTE");
                const error = Error('Semantico', 'LA VARAIABLE ' + Instruccion.id + " NO EXISTE");
                Horrores.push(error);
                simbolo = 0;
                tabSym = tabSymfija;
                while (tabSym != null) {
                    simbolo = tabSym.getArreglo(Instruccion.id.id);
                    if (simbolo === "ERROR") {
                        tabSym = tabSym.Anterior;
                    }
                    else break;
                }
                if (simbolo != "ERROR") {
                    //ENCONTRE EL ARREGLO
                    //console.log("ENCONTRE EL ARRELGO");
                    let valorpos;
                    let tipopos;
                    if (Instruccion.id.dimensionval.Type === primitivos.LLamarFuncion) {
                        temp = getValor(Instruccion.id.dimensionval, tabSym);
                        valorpos = temp.valor;
                        tipopos = temp.tipo;
                    }
                    else {
                        valorpos = getValor(Instruccion.id.dimensionval, tabSym);
                        tipopos = getTipo(Instruccion.id.dimensionval, tabSym);
                    }
                    let valorN;
                    let tipoN;
                    if (Instruccion.valor.Type === primitivos.LLamarFuncion) {
                        temp = getValor(Instruccion.valor, tabSym);
                        valorN = temp.valor;
                        tipoN = temp.tipo;
                    }
                    else {
                        valorN = getValor(Instruccion.valor, tabSym);
                        tipoN = getTipo(Instruccion.valor, tabSym);
                    }
                    if (simbolo.tipoVar) {
                        if (simbolo.valsdim[valorpos].Type === tipoN) {
                            if (Instruccion.signo === "=") {
                                simbolo.valsdim[valorpos].Value = valorN;
                            }
                            else {
                                if (simbolo.valsdim[valorpos].Type === "Cadena") {
                                    simbolo.valsdim[valorpos].Value = simbolo.valsdim[valorpos].Value + valorN;
                                }
                                else if (simbolo.valsdim[valorpos].Type === "Numero") {
                                    simbolo.valsdim[valorpos].Value = Number(simbolo.valsdim[valorpos].Value) + Number(valorN);
                                }
                                else {
                                    //console.log("ERROR DE TIPOS");
                                    const error = Error('Semantico', 'ERROR DE TIPOS EN LA ASIGNACION DE : ' + Instruccion.id);
                                    Horrores.push(error);
                                }

                            }

                        }
                        else {
                            //console.log("ERROR DE TIPOS ENTRE EL ACTUAL Y EL NUEVO");
                            const error = Error('Semantico', 'ERROR DE TIPOS ENTRE EL ACTUAL Y EL NUEVO: ' + Instruccion.id);
                            Horrores.push(error);
                        }

                    }
                    else {
                        //console.log("NO SE PUEDE CAMBIAR EL VALOR DE UNA CONSTANTE");
                        const error = Error('Semantico', 'NO SE PUEDE CAMBIAR EL VALOR DE UNA CONSTANTE: ' + Instruccion.id);
                        Horrores.push(error);
                    }

                }
                else {
                    tabSym = tabSymfija;
                    while (tabSym != null) {
                        simbolo = tabSym.getType(Instruccion.id.uno);
                        if (simbolo === "ERROR") {
                            tabSym = tabSym.Anterior;
                        }
                        else break;
                    }
                    if (simbolo != "ERROR") {
                        //ENCONTRE EL TYPE
                        //console.log("ENCONTRE EL TYPE");
                        if (Instruccion.id.tres === -1) {
                            //console.log("SOLO VIENE UN ACCESO");
                            let valorN;
                            let tipoN;
                            if (Instruccion.valor.Type === primitivos.LLamarFuncion) {
                                temp = getValor(Instruccion.valor, tabSym);
                                valorN = temp.valor;
                                tipoN = temp.tipo;
                            }
                            else {
                                valorN = getValor(Instruccion.valor, tabSym);
                                tipoN = getTipo(Instruccion.valor, tabSym);
                            }
                            simbolilo = simbolo.params.getSimbolo(Instruccion.id.dos);
                            if (simbolilo.tipo = tipoN) {
                                simbolilo.value = valorN;
                                tabSym.ActType(simbolo.id, simbolo);
                            }
                            else if (simbolilo.tipo === null) {
                                simbolilo.value = valorN;
                                simbolilo.tipo = tipoN;
                                tabSym.ActType(simbolo.id, simbolo);
                            }
                            else {
                                //console.log("ERROR DE TIPOS - VARIABLE Y VALOR A ASIGNAR");
                                const error = Error('Semantico', 'ERROR DE TIPOS Y EN LA VARIABLE A ASIGNAR: ' + Instruccion.id.uno + Instruccion.id.dos);
                                Horrores.push(error);
                            }
                            /*for (let i = 0; i < simbolo.params.Symbol.length; i++) {
                                if (simbolo.params.Symbol[i].id === Instruccion.id.dos) {
                                    let valorN;
                                    let tipoN;
                                    if (Instruccion.valor.Type === primitivos.LLamarFuncion) {
                                        temp = getValor(Instruccion.valor, tabSym);
                                        valorN = temp.valor;
                                        tipoN = temp.tipo;
                                    }
                                    else {
                                        valorN = getValor(Instruccion.valor, tabSym);
                                        tipoN = getTipo(Instruccion.valor, tabSym);
                                    }
                                    if (simbolo.params.Symbol[i].tipo === tipoN) {
                                        simbolo.params.Symbol[i].value = valorN;
                                        tabSym.ActType(simbolo.id, simbolo);
                                    }
                                    else {
                                        console.log("ERROR DE TIPOS ENTRE LA VARIABLE Y EL VALOR A ASIGNAR");
                                    }
                                }
                            }*/
                        }
                        else {
                            //console.log("ES UN DOBLE ACCESO");
                            acc1 = simbolo.params.getType(Instruccion.id.dos);
                            acc2 = acc1.params.getSimbolo(Instruccion.id.tres);
                            let valorN;
                            let tipoN;
                            if (Instruccion.valor.Type === primitivos.LLamarFuncion) {
                                temp = getValor(Instruccion.valor, tabSym);
                                valorN = temp.valor;
                                tipoN = temp.tipo;
                            }
                            else {
                                valorN = getValor(Instruccion.valor, tabSym);
                                tipoN = getTipo(Instruccion.valor, tabSym);
                            }
                            if (acc2.tipo === tipoN) {
                                acc2.value = valorN;
                                tabSym.ActType(simbolo.id, simbolo);
                            }
                            else if (acc2.tipo === null) {
                                acc2.vaue = valorN;
                                acc2.tipo = tipoN;
                                tabSym.ActType(simbolo.id, simbolo);
                            }
                            else {
                                //console.log("ERROR DE TIPOS");
                                const error = Error('Semantico', 'ERROR DE TIPOS AL INTENTAR ASIGNAR: ' + Instruccion.id.uno + Instruccion.id.dos + Instruccion.id.tres);
                                Horrores.push(error);
                            }
                        }
                    }
                    else {
                        //console.log("NINGUNO DE LOS TIPOS ANTERIORES, POR TANTO LA VAIRABLE NO EXISTE");
                        const error = Error('Semantico', 'NO SE ENCONTRÓ EL TYPE A ASIGNAR: ' + Instruccion.id.uno);
                        Horrores.push(error);
                    }
                }

            }
            else {
                if (simbolillo.editar) {//SI LA VARIABLE SE PUEDE EDITAR
                    if (Instruccion.signo === "=") {//ES UNA SIMPLE ASIGNACIÓN
                        if (Instruccion.valor.Type === "Ternario") {
                            //console.log("VIENE UN TERNARIO EN UN ENTORNO NO GLOBAL ALV");
                            let valor;
                            let tipo;
                            if (Instruccion.valor.var1.Type === primitivos.LLamarFuncion) {
                                temp = getValor(Instruccion.valor.var1, tabSym);
                                valor = temp.valor;
                                tipo = temp.tipo;
                            }
                            else {
                                valor = getValor(Instruccion.valor.var1, tabSym);
                                tipo = getTipo(Instruccion.valor.var1, tabSym);
                            }


                            condicion = valor;
                            tipoCon = tipo;
                            findVar = 23;
                            tabSym = tabSymfija;
                            if (tabSym.Anterior) {//NO ES LA TABLA PADRE
                                while (tabSym != null) {
                                    findVar = tabSym.getSimbolo(Instruccion.id);
                                    if (findVar != "ERROR") {
                                        break;
                                    }
                                    else {
                                        if (tabSym.Anterior) {
                                            tabSym = tabSym.Anterior;
                                        }
                                    }

                                }
                            }
                            if (findVar != "ERROR") {
                                if (tipoCon = "Booleano") {
                                    if (condicion) {

                                        let valorV;
                                        let tipoV;
                                        if (Instruccion.valor.var2.Type === primitivos.LLamarFuncion) {
                                            temp = getValor(exp.var2, tabSym);
                                            valorV = temp.valor;
                                            tipoV = temp.tipo;
                                        }
                                        else {
                                            valorV = getValor(Instruccion.valor.var2, tabSym);
                                            tipoV = getTipo(Instruccion.valor.var2, tabSym);
                                        }
                                        if ((findVar.tipo === "Numero" && tipoV === "Numero") || (findVar.tipo === "Cadena" && tipoV === "Cadena") || (findVar.tipo === "Booleano" && tipoV === "Booleano")) {
                                            findVar.value = valorV;
                                            tabSym.ActSimbolo(findVar.id, findVar);
                                        }
                                        else {
                                            //console.log("ERROR DE TIPOS - VALOR A ASIGNAR DIFERENTE AL DE LA VARIABLE");
                                            const error = Error('Semantico', 'ERROR DE TIPOS - VALOR A ASIGNAR DIFERENTE A LA VARIABLE: ' + Instruccion.id);
                                            Horrores.push(error);
                                        }
                                    }
                                    else {
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
                                        if ((findVar.tipo === "Numero" && tipoF === "Numero") || (findVar.tipo === "Cadena" && tipoF === "Cadena") || (findVar.tipo === "Booleano" && tipoF === "Booleano")) {
                                            findVar.value = valorF;
                                            bandera = false;
                                            while (tabSym != null) {
                                                bandera = tabSym.ActSimbolo(findVar.id, findVar);
                                                if (bandera) {
                                                    break;
                                                }
                                                else {
                                                    if (tabSym.Anterior != null) {
                                                        tabSym = tabSym.Anterior;
                                                    }
                                                }
                                            }
                                            if (!bandera) {
                                                //console.log("NO SE PUDO LOCALIZAR Y ACTUALIZAR LA VARIABLE");
                                                const error = Error('Semantico', 'NO SE PUDO ACTUALIZAR LA VARIABLE: ' + Instruccion.id);
                                                Horrores.push(error);
                                            }
                                            //tabSym.ActSimbolo(findVar.id, findVar);
                                        }
                                        else {
                                            //console.log("ERROR DE TIPOS - VALOR A ASIGNAR DIFERENTE AL DE LA VARIABLE");
                                            const error = Error('Semantico', 'ERROR DE TIPOS AL ASIGNAR: ' + Instruccion.id);
                                            Horrores.push(error);
                                        }

                                    }
                                }
                                else {
                                    //console.log("TIPO INCORRECTO DE LA CONDICION");
                                    const error = Error('Semantico', 'TIPO INCORRECTO DE LA CONDICION:' + Instruccion.id);
                                    Horrores.push(error);
                                }
                            }
                            else {
                                //console.log("NO SE ENCONTRO LA VARIABLE");
                                const error = Error('Semantico', 'NO SE ENCONTRO LA VARIABLE: ' + Instruccion.id);
                                Horrores.push(error);
                            }

                        }
                        else {
                            //SIMBOLILLO es el simbolo a actualizar y actualizar
                            if (simbolillo.tipo === findTipo) {//TIPO DE VARIABLE Y VALOR COINCIDEN
                                simbolillo.value = findValor;
                                tabSym.ActSimbolo(simbolillo.id, simbolillo);
                            }
                            else {
                                //console.log("TIPO DE VARIABLE Y VALOR NO COINCIDEN");
                                const error = Error('Semantico', 'ERROR DE TIPOS - TIPO DE LA VARIABLE Y VALOR NO COINCIDEN: ' + Instruccion.id);
                                Horrores.push(error);
                            }
                        }

                    }
                    else {//SE TIENE QUE SUMAR AL VALOR INICIAL
                        if (Instruccion.valor.Type === "Ternario") {
                            //console.log("VIENE UN TERNARIO pero no en la global :'v");
                        }
                        else {
                            if (simbolillo.tipo === findTipo) {//TIPO DE VARIABLE Y VALOR COINCIDEN
                                simbolillo.value = simbolillo.value + findValor;
                                tabSym.ActSimbolo(simbolilo.id, simbolillo);
                            }
                            else {
                                //console.log("TIPO DE VARIABLE Y VALOR NO COINCIDEN");
                                const error = Error('Semantico', 'ERROR DE TIPOS AL ASIGNAR: ' + Instruccion.id);
                                Horrores.push(error);
                            }
                        }

                    }

                }
                else {
                    //console.log("NO SE PUEDE EDITAR LA VARIABLE");
                    const error = Error('Semantico', 'NO SE PUEDE ASIGNAR LA VARIABLE: ' + Instruccion.id);
                    Horrores.push(error);

                }

            }

        }
        else {  //LA TABLA DE SIMBOLOS ES LA GLOBAL
            const findVar = tabSym.getSimbolo(Instruccion.id);
            if (findVar === "ERROR") {
                const findType = tabSym.getType(Instruccion.id.uno);
                if (findType === "ERROR") {
                    const findArray = tabSym.getArreglo(Instruccion.id.id);
                    if (findArray === "ERROR") {
                        //console.log("NO EXISTE LA VARIABLE, NO ES NI SIMBOLO, NI TIPO NI ARREGLO! F");
                        const error = Error('Semantico', 'NO EXISTE EL SIMBOLO/TIPO/ARREGLO: ' + Instruccion.id);
                        Horrores.push(error);
                    }
                    else {
                        //AQUI VA LA ASIGNACIÓN A UN VALOR DEL ARRAY
                        //console.log("ASIGNO EL VALOR AL ARRAY");
                        let valor;
                        let tipo;
                        if (Instruccion.id.dimensionval.Type === primitivos.LLamarFuncion) {
                            temp = getValor(Instruccion.id.dimensionval, tabSym);
                            valor = temp.valor;
                            tipo = temp.tipo;
                        }
                        else {
                            valor = getValor(Instruccion.id.dimensionval, tabSym);
                            tipo = getTipo(Instruccion.id.dimensionval, tabSym);
                        }
                        let valorN;
                        let tipoN;
                        if (Instruccion.valor.Type === primitivos.LLamarFuncion) {
                            temp = getValor(Instruccion.id.dimensionval, tabSym);
                            valorN = temp.valor;
                            tipoN = temp.tipo;
                        }
                        else {
                            valorN = getValor(Instruccion.valor, tabSym);
                            tipoN = getTipo(Instruccion.valor, tabSym);
                        }

                        if (findArray.tipo === "number" && tipoN === "Numero" && findArray.tipoVar
                            || findArray.tipo === "string" && (tipoN === "Cadena" || tipoN === "Booleano" || tipoN === "Numero") && findArray.tipoVar
                            || findArray.tipo === "boolean" && tipoN === "Booleano" && findArray.tipoVar) {
                            if (Instruccion.signo === "=") {
                                findArray.valsdim[valor].Value = valorN;
                                tabSym.ActArreglo(findArray.id, findArray);
                            }
                            else {
                                if (findArray.tipo === "number" && tipoN === "Numero") {
                                    findArray.valsdim[valor].Value = Number(findArray.valsdim[valor].Value) + valorN;
                                    tabSym.ActArreglo(findArray.id, findArray);
                                }
                                else {
                                    findArray.valsdim[valor].Value = findArray.valsdim[valor].Value + valorN;
                                    tabSym.ActArreglo(findArray.id, findArray);
                                }

                            }
                        }
                        else {
                            //console.log("ERROR DE TIPOS AL ASIGNAR UN VALOR AUN ARREGLO");
                            const error = Error('Semantico', 'ERROR DE TIPOS AL ASIGNAR: ' + Instruccion.id);
                            Horrores.push(error);
                        }
                    }
                }
                else {
                    //AQUI HAGO LA ASIGNACIÓN AL TYPE
                    let valorN;
                    let tipoN;
                    if (Instruccion.valor.Type === primitivos.LLamarFuncion) {
                        temp = getValor(Instruccion.valor, tabSym);
                        valorN = temp.valor;
                        tipoN = temp.tipo;
                    }
                    else {
                        valorN = getValor(Instruccion.valor, tabSym);
                        tipoN = getTipo(Instruccion.valor, tabSym);
                    }
                    if (Instruccion.id.tres === -1) {
                        //atributo en la tabla del principal
                        simbolin = findType.params.getSimbolo(Instruccion.id.dos);
                        if ((simbolin.tipo === tipoN || simbolin.tipo === null) && findType.tipoVar) {
                            if (Instruccion.signo === "=") {
                                simbolin.value = valorN;
                                simbolin.tipo = tipoN;
                                tabSym.ActType(findType.id, findType);
                            }
                            else {
                                if (simbolin.tipo === "Numero") {
                                    simbolin.value = Number(simbolin.value) + Number(valorN);
                                    simbolin.tipo = tipoN;
                                    tabSym.ActType(findType.id, findType);
                                }
                                else if (simbolin.tipo === "Cadena") {
                                    simbolin.value = simbolin.value + valorN;
                                    simbolin.tipo = tipoN;
                                    tabSym.ActType(findType.id, findType);
                                }
                                else{
                                    const error = Error('Semantico', 'ERROR DE TIPOS AL ASIGNAR UN VALOR');
                                    Horrores.push(error);
                                }

                            }

                        }

                        else {
                            //console.log("ERROR DE TIPOS ENTRE EL QUE ESTA Y EL QUE SE QUIERE ASIGNAR");
                            const error = Error('Semantico', 'ERROR DE TIPOS AL ASIGNAR: ' + Instruccion.id);
                            Horrores.push(error);
                        }


                    }
                    else {
                        //atributo del atributo, tengo un valor en Instruccion.id.tres
                        //console.log("aqui estoy");
                        simbolin = findType.params.getType(Instruccion.id.dos);
                        simbolillo = simbolin.params.getSimbolo(Instruccion.id.tres);
                        //console.log("aveeer");
                        if ((simbolillo.tipo === tipoN || simbolillo.tipo === null) && findType.tipoVar) {
                            if (Instruccion.signo === "=") {
                                simbolillo.value = valorN;
                                simbolillo.tipo = tipoN;
                                tabSym.ActType(findType.id, findType);
                            }
                            else {
                                if (simbolillo.tipo === "Numero") {
                                    simbolillo.value = Number(simbolillo.value)+Number(valorN);
                                    simbolillo.tipo = tipoN;
                                    tabSym.ActType(findType.id, findType);
                                }
                                else if( simbolillo.tipo === "Cadena"){
                                    simbolillo.value = simbolillo.value + valorN;
                                    simbolillo.tipo = tipoN;
                                    tabSym.ActType(findType.id, findType);
                                }
                                else{
                                    const error = Error('Semantico', 'ERROR DE TIPOS AL ASIGNAR UN VALOR');
                            Horrores.push(error);        
                                }
                            }

                        }

                        else {
                            //console.log("ERROR DE TIPOS");
                            const error = Error('Semantico', 'ERROR DE TIPOS AL ASIGNAR: ' + Instruccion.id);
                            Horrores.push(error);
                        }


                    }






                }
            }
            else {
                if (findVar.editar) {
                    //console.log("SI SE PUEDE ASIGNAR UN VALOR");
                    if (Instruccion.signo === "=") {
                        //console.log("SOLO TENGO QUE ASIGNAR");
                        if (Instruccion.valor.Type === "Ternario") {
                            //console.log("viene un if ternario");
                            let valor;
                            let tipo;
                            if (Instruccion.valor.var1.Type === primitivos.LLamarFuncion) {
                                temp = getValor(Instruccion.valor.var1, tabSym);
                                valor = temp.valor;
                                tipo = temp.tipo;
                            }
                            else {
                                valor = getValor(Instruccion.valor.var1, tabSym);
                                tipo = getTipo(Instruccion.valor.var1, tabSym);
                            }
                            condicion = valor;
                            if (condicion) {
                                let valorV;
                                let tipoV;
                                if (Instruccion.valor.var2.Type === primitivos.LLamarFuncion) {
                                    temp = getValor(exp.var2, tabSym);
                                    valorV = temp.valor;
                                    tipoV = temp.tipo;
                                }
                                else {
                                    valorV = getValor(Instruccion.valor.var2, tabSym);
                                    tipoV = getTipo(Instruccion.valor.var2, tabSym);
                                }

                                if ((findVar.tipo === "Numero" && tipoV === "Numero") || (findVar.tipo === "Cadena" && tipoV === "Cadena") || (findVar.tipo === "Booleano" && tipoV === "Booleano")) {
                                    findVar.value = valorV;
                                    tabSym.ActSimbolo(findVar.id, findVar);
                                }
                                else {
                                    //console.log("ERROR DE TIPOS - VALOR A ASIGNAR DIFERENTE AL DE LA VARIABLE");
                                    const error = Error('Semantico', 'ERROR DE TIPOS AL ASIGNAR: ' + Instruccion.id);
                                    Horrores.push(error);
                                }

                            }
                            else {
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
                                if ((findVar.tipo === "Numero" && tipoF === "Numero") || (findVar.tipo === "Cadena" && tipoF === "Cadena") || (findVar.tipo === "Booleano" && tipoF === "Booleano")) {
                                    findVar.value = valorF;
                                    tabSym.ActSimbolo(findVar.id, findVar);
                                }
                                else {
                                    //console.log("ERROR DE TIPOS - VALOR A ASIGNAR DIFERENTE AL DE LA VARIABLE");
                                    const error = Error('Semantico', 'ERROR DE TIPOS AL ASIGNAR: ' + Instruccion.id);
                                    Horrores.push(error);
                                }
                            }
                        }
                        else {
                            probador = Number(findValor);
                            if (Number.isNaN(probador)) {//Valor a asignar = Cadena
                                if (findVar.tipo === "Numero" || findVar.tipo === "Booleano") {//Tipo de la variable
                                    //console.log("ERROR DE TIPOS - CANT CONVERT A NUMBER/BOOLEAN TO STRING");
                                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE CONVERTIR UN BOOL/NUMBER A STRING: ' + Instruccion.id);
                                    Horrores.push(error);
                                }
                                else if (findVar.tipo === "Cadena") {//Tipo de la variable
                                    findVar.value = findValor;
                                    tabSym.ActSimbolo(findVar.id, findVar);
                                    //console.log("jejeje");
                                }
                                //Instruccion.tipoVarP="Cadena";
                                //tabSym.setearSymbol("Cadena", Instruccion.id, findValor, Instruccion.tipoVar);
                            }
                            else if (findValor === false) {//Valor a asingar = Booleano/False
                                if (findVar.tipo === "Numero" || findVar.tipo === "Cadena") {
                                    //console.log("ERROR DE TIPOS - CANT CONVERT A NUMBER/STRING TO BOOLEAN");
                                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE CONVERTIR UN BOOL/NUMBER A STRING: ' + Instruccion.id);
                                    Horrores.push(error);
                                }
                                else if (findVar.tipo === "Booleano") {
                                    findVar.value = findValor;
                                    tabSym.ActSimbolo(findVar.id, findVar);
                                    //console.log("jijiji");
                                }
                                //Instruccion.tipoVarP="Booleano";
                                //tabSym.setearSymbol("Booleano", Instruccion.id, findValor, Instruccion.tipoVar);
                            }
                            else if (findValor === true) {
                                if (findVar.tipo === "Numero" || findVar.tipo === "Cadena") {
                                    //console.log("ERROR DE TIPOS - CANT CONVERT A NUMBER/STRING INTO BOOLEAN");
                                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE CONVERTIR UN STRING/NUMBER A BOOL: ' + Instruccion.id);
                                    Horrores.push(error);
                                }
                                else if (findVar.tipo === "Booleano") {
                                    findVar.value = findValor;
                                    tabSym.ActSimbolo(findVar.id, findVar);
                                    //console.log("jijiji");
                                }
                                //Instruccion.tipoVarP="Booleano";
                                //tabSym.setearSymbol("Booleano", Instruccion.id, findValor, Instruccion.tipoVar);
                            }
                            else if (!(Number.isNaN(probador))) {//Valor a asignar = Number
                                if (findVar.tipo === "Cadena" || findVar.tipo === "Booleano") {
                                    //console.log("ERROR DE TIPO - CANT CONVERT A STRING/BOOL INTO BOOLEAN");
                                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE CONVERTIR UN STRING/NUMBER A BOOL: ' + Instruccion.id);
                                    Horrores.push(error);
                                }
                                else if (findVar.tipo === "Numero") {
                                    findVar.value = findValor;
                                    //console.log("jojojo");
                                    tabSym.ActSimbolo(findVar.id, findVar);
                                }
                                //Instruccion.tipoVarP="Numero";
                                //tabSym.setearSymbol("Numero", Instruccion.id, findValor, Instruccion.tipoVar);
                            }
                        }



                    }
                    else {
                        console.log("TENGO QUE SUMAR AL VALOR INICIAL");
                        if (Instruccion.valor.Type === "Ternario") {
                            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                            //console.log("viene un if ternario");
                            let valor;
                            let tipo;
                            if (Instruccion.valor.var1.Type === primitivos.LLamarFuncion) {
                                temp = getValor(Instruccion.valor.var1, tabSym);
                                valor = temp.valor;
                                tipo = temp.tipo;
                            }
                            else {
                                valor = getValor(Instruccion.valor.var1, tabSym);
                                tipo = getTipo(Instruccion.valor.var1, tabSym);
                            }
                            condicion = valor;
                            if (condicion) {
                                let valorV;
                                let tipoV;
                                if (Instruccion.valor.var2.Type === primitivos.LLamarFuncion) {
                                    temp = getValor(exp.var2, tabSym);
                                    valorV = temp.valor;
                                    tipoV = temp.tipo;
                                }
                                else {
                                    valorV = getValor(Instruccion.valor.var2, tabSym);
                                    tipoV = getTipo(Instruccion.valor.var2, tabSym);
                                }
                                if ((findVar.tipo === "Numero" && tipoV === "Numero") || (findVar.tipo === "Cadena" && tipoV === "Cadena") || (findVar.tipo === "Booleano" && tipoV === "Booleano")) {
                                    findVar.value = findVar.value + valorV;
                                    tabSym.ActSimbolo(findVar.id, findVar);
                                }
                                else {
                                    console.log("ERROR DE TIPOS - VALOR A ASIGNAR DIFERENTE AL DE LA VARIABLE");
                                }

                            }
                            else {
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
                                if ((findVar.tipo === "Numero" && tipoF === "Numero") || (findVar.tipo === "Cadena" && tipoF === "Cadena") || (findVar.tipo === "Booleano" && tipoF === "Booleano")) {
                                    findVar.value = findVar.value + valorF;
                                    tabSym.ActSimbolo(findVar.id, findVar);
                                }
                                else {
                                    //console.log("ERROR DE TIPOS - VALOR A ASIGNAR DIFERENTE AL DE LA VARIABLE");
                                    const error = Error('Semantico', 'ERROR DE TIPOS - TIPO DIFERENTE AL ORIGINAL: ' + Instruccion.id);
                                    Horrores.push(error);
                                }
                            }
                        }
                        else {
                            probador = Number(findValor);
                            if (Number.isNaN(probador)) {//Valor a asignar = Cadena
                                if (findVar.tipo === "Numero" || findVar.tipo === "Booleano") {//Tipo de la variable
                                    //console.log("ERROR DE TIPOS - CANT CONVERT A NUMBER/BOOLEAN TO STRING");
                                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE CONVERTIR UN BOOL/NUMBER A STRING: ' + Instruccion.id);
                                    Horrores.push(error);
                                }
                                else if (findVar.tipo === "Cadena") {//Tipo de la variable
                                    findVar.value = findVar.value + findValor;
                                    tabSym.ActSimbolo(findVar.id, findVar);
                                    //console.log("jejeje");

                                }
                                //Instruccion.tipoVarP="Cadena";
                                //tabSym.setearSymbol("Cadena", Instruccion.id, findValor, Instruccion.tipoVar);
                            }
                            else if (findValor === false) {//Valor a asingar = Booleano/False
                                //console.log("ESTE OPERADOR '+=' SOLO SE PUEDE USAR CON STRING O NUMEROS");
                                const error = Error('Semantico', 'EL OPERADOR += SOLO SE PUEDE USAR CON STRING O NUMEROS ');
                                Horrores.push(error);
                                /*if(findVar.tipo==="Numero"||findVar.tipo==="Cadena"){
                                    console.log("ERROR DE TIPOS - CANT CONVERT A NUMBER/STRING TO BOOLEAN");
                                }
                                else if(findVar.tipo==="Booleano"){
                                    //findVar.value=findValor;
                                    //console.log("jijiji");
            
                                }*/
                                //Instruccion.tipoVarP="Booleano";
                                //tabSym.setearSymbol("Booleano", Instruccion.id, findValor, Instruccion.tipoVar);
                            }
                            else if (findValor === true) {
                                //console.log("ESTE OPERADOR '+=' SOLO SE PUEDE USAR CON STRING O NUMEROS");
                                const error = Error('Semantico', 'EL OPERADOR += SOLO SE PUEDE USAR CON STRING O NUMEROS ');
                                Horrores.push(error);
                                /*if(findVar.tipo==="Numero"||findVar.tipo==="Cadena"){
                                    console.log("ERROR DE TIPOS - CANT CONVERT A NUMBER/STRING INTO BOOLEAN");
                                }
                                else if(findVar.tipo==="Booleano"){
                                    findVar.value=findValor;
                                    console.log("jijiji");
                                }*/
                                //Instruccion.tipoVarP="Booleano";
                                //tabSym.setearSymbol("Booleano", Instruccion.id, findValor, Instruccion.tipoVar);
                            }
                            else if (!(Number.isNaN(probador))) {//Valor a asignar = Number
                                if (findVar.tipo === "Cadena" || findVar.tipo === "Booleano") {
                                    //console.log("ERROR DE TIPO - CANT CONVERT A STRING/BOOL INTO BOOLEAN");
                                    const error = Error('Semantico', 'ERROR DE TIPOS - NO SE PUEDE CONVERTIR UN STRING/NUMBER A BOOL: ' + Instruccion.id);
                                    Horrores.push(error);
                                }
                                else if (findVar.tipo === "Numero") {
                                    findVar.value = Number(findVar.value) + Number(findValor);
                                    tabSym.ActSimbolo(findVar.id, findVar);
                                    //console.log("jojojo");
                                }
                                //Instruccion.tipoVarP="Numero";
                                //tabSym.setearSymbol("Numero", Instruccion.id, findValor, Instruccion.tipoVar);
                            }
                        }


                    }
                }
                else {
                    //console.log("ES UNA CONSTANTE, NO SE PUEDE ASIGNAR UN VALOR!");
                    const error = Error('Semantico', 'NO SE PUEDE CAMBIAR VALOR A UNA CONSTANTE ' + Instruccion.id);
                    Horrores.push(error);
                }
            }
        }
    }



}