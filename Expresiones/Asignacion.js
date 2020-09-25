function Asignacion(id, signo, valor) {
    return {
        id: id,
        signo: signo,
        valor: valor,
        Type: instruccionesC.Asignacion
    }
}

function AsignacionD(Instruccion, tabSym) {
    const findValor = getValor(Instruccion.valor, tabSym);
    const findTipo = getTipo(Instruccion.valor, tabSym);
    if (tabSym.Anterior) { //NO ES UNA TABLA DE SIMBOLOS GLOBAL

        const tabSymfija = tabSym;//por si me cambio a otra tabla de simbolos
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
            console.log("LA VARIABLE A LA CUAL QUIERE ASIGNAR UN VALOR, NO EXISTE");
        }
        else {
            if (simbolillo.editar) {//SI LA VARIABLE SE PUEDE EDITAR
                if (Instruccion.signo === "=") {//ES UNA SIMPLE ASIGNACIÓN
                    if (Instruccion.valor.Type === "Ternario") {
                        console.log("VIENE UN TERNARIO EN UN ENTORNO NO GLOBAL ALV");
                        condicion = getValor(Instruccion.valor.var1, tabSym);
                        tipoCon = getTipo(Instruccion.valor.var1, tabSym);
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
                                    valorV = getValor(Instruccion.valor.var2, tabSym);
                                    tipoV = getTipo(Instruccion.valor.var2, tabSym);
                                    if ((findVar.tipo === "Numero" && tipoV === "Numero") || (findVar.tipo === "Cadena" && tipoV === "Cadena") || (findVar.tipo === "Booleano" && tipoV === "Booleano")) {
                                        findVar.value = valorV;
                                        tabSym.ActSimbolo(findVar.id, findVar);
                                    }
                                    else {
                                        console.log("ERROR DE TIPOS - VALOR A ASIGNAR DIFERENTE AL DE LA VARIABLE");
                                    }
                                }
                                else {
                                    valorF = getValor(Instruccion.valor.var3, tabSym);
                                    tipoF = getTipo(Instruccion.valor.var3, tabSym);
                                    if ((findVar.tipo === "Numero" && tipoF === "Numero") || (findVar.tipo === "Cadena" && tipoF === "Cadena") || (findVar.tipo === "Booleano" && tipoF === "Booleano")) {
                                        findVar.value = valorF;
                                        bandera = false;
                                        while(tabSym!=null){
                                            bandera = tabSym.ActSimbolo(findVar.id,findVar);
                                            if(bandera){
                                                break;
                                            }
                                            else{
                                                if(tabSym.Anterior!=null){
                                                    tabSym = tabSym.Anterior;
                                                }
                                            }
                                        }
                                        if(!bandera){
                                            console.log("NO SE PUDO LOCALIZAR Y ACTUALIZAR LA VARIABLE");
                                        }
                                        //tabSym.ActSimbolo(findVar.id, findVar);
                                    }
                                    else {
                                        console.log("ERROR DE TIPOS - VALOR A ASIGNAR DIFERENTE AL DE LA VARIABLE");
                                    }

                                }
                            }
                            else console.log("TIPO INCORRECTO DE LA CONDICION");
                        }
                        else {
                            console.log("NO SE ENCONTRO LA VARIABLE");
                        }

                    }
                    else {
                        //SIMBOLILLO es el simbolo a actualizar y actualizar
                        if (simbolillo.tipo === findTipo) {//TIPO DE VARIABLE Y VALOR COINCIDEN
                            simbolillo.value = findValor;
                            tabSym.ActSimbolo(simbolillo.id, simbolillo);
                        }
                        else {
                            console.log("TIPO DE VARIABLE Y VALOR NO COINCIDEN");
                        }
                    }

                }
                else {//SE TIENE QUE SUMAR AL VALOR INICIAL
                    if (Instruccion.valor.Type === "Ternario") {
                        console.log("VIENE UN TERNARIO pero no en la global :'v");
                    }
                    else {
                        if (simbolillo.tipo === findTipo) {//TIPO DE VARIABLE Y VALOR COINCIDEN
                            simbolillo.value = simbolillo.value + findValor;
                            tabSym.ActSimbolo(simbolilo.id, simbolillo);
                        }
                        else {
                            console.log("TIPO DE VARIABLE Y VALOR NO COINCIDEN");
                        }
                    }

                }

            }
            else console.log("NO SE PUEDE EDITAR LA VARIABLE");

        }

    }
    else {  //LA TABLA DE SIMBOLOS ES LA GLOBAL
        const findVar = tabSym.getSimbolo(Instruccion.id);
        if (findVar === undefined) {

        }
        else {
            if (findVar.editar) {
                console.log("SI SE PUEDE ASIGNAR UN VALOR");
                if (Instruccion.signo === "=") {
                    console.log("SOLO TENGO QUE ASIGNAR");
                    if (Instruccion.valor.Type === "Ternario") {
                        console.log("viene un if ternario");
                        condicion = getValor(Instruccion.valor.var1, tabSym);
                        if (condicion) {
                            valorV = getValor(Instruccion.valor.var2, tabSym);
                            tipoV = getTipo(Instruccion.valor.var2, tabSym);
                            if ((findVar.tipo === "Numero" && tipoV === "Numero") || (findVar.tipo === "Cadena" && tipoV === "Cadena") || (findVar.tipo === "Booleano" && tipoV === "Booleano")) {
                                findVar.value = valorV;
                                tabSym.ActSimbolo(findVar.id, findVar);
                            }
                            else {
                                console.log("ERROR DE TIPOS - VALOR A ASIGNAR DIFERENTE AL DE LA VARIABLE");
                            }

                        }
                        else {
                            valorF = getValor(Instruccion.valor.var3, tabSym);
                            tipoF = getTipo(Instruccion.valor.var3, tabSym);
                            if ((findVar.tipo === "Numero" && tipoF === "Numero") || (findVar.tipo === "Cadena" && tipoF === "Cadena") || (findVar.tipo === "Booleano" && tipoF === "Booleano")) {
                                findVar.value = valorF;
                                tabSym.ActSimbolo(findVar.id, findVar);
                            }
                            else {
                                console.log("ERROR DE TIPOS - VALOR A ASIGNAR DIFERENTE AL DE LA VARIABLE");
                            }
                        }
                    }
                    else {
                        probador = Number(findValor);
                        if (Number.isNaN(probador)) {//Valor a asignar = Cadena
                            if (findVar.tipo === "Numero" || findVar.tipo === "Booleano") {//Tipo de la variable
                                console.log("ERROR DE TIPOS - CANT CONVERT A NUMBER/BOOLEAN TO STRING");
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
                                console.log("ERROR DE TIPOS - CANT CONVERT A NUMBER/STRING TO BOOLEAN");
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
                                console.log("ERROR DE TIPOS - CANT CONVERT A NUMBER/STRING INTO BOOLEAN");
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
                                console.log("ERROR DE TIPO - CANT CONVERT A STRING/BOOL INTO BOOLEAN");
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
                        console.log("viene un if ternario");
                        condicion = getValor(Instruccion.valor.var1, tabSym);
                        if (condicion) {
                            valorV = getValor(Instruccion.valor.var2, tabSym);
                            tipoV = getTipo(Instruccion.valor.var2, tabSym);
                            if ((findVar.tipo === "Numero" && tipoV === "Numero") || (findVar.tipo === "Cadena" && tipoV === "Cadena") || (findVar.tipo === "Booleano" && tipoV === "Booleano")) {
                                findVar.value = findVar.value + valorV;
                                tabSym.ActSimbolo(findVar.id, findVar);
                            }
                            else {
                                console.log("ERROR DE TIPOS - VALOR A ASIGNAR DIFERENTE AL DE LA VARIABLE");
                            }

                        }
                        else {
                            valorF = getValor(Instruccion.valor.var3, tabSym);
                            tipoF = getTipo(Instruccion.valor.var3, tabSym);
                            if ((findVar.tipo === "Numero" && tipoF === "Numero") || (findVar.tipo === "Cadena" && tipoF === "Cadena") || (findVar.tipo === "Booleano" && tipoF === "Booleano")) {
                                findVar.value = findVar.value + valorF;
                                tabSym.ActSimbolo(findVar.id, findVar);
                            }
                            else {
                                console.log("ERROR DE TIPOS - VALOR A ASIGNAR DIFERENTE AL DE LA VARIABLE");
                            }
                        }
                    }
                    else {
                        probador = Number(findValor);
                        if (Number.isNaN(probador)) {//Valor a asignar = Cadena
                            if (findVar.tipo === "Numero" || findVar.tipo === "Booleano") {//Tipo de la variable
                                console.log("ERROR DE TIPOS - CANT CONVERT A NUMBER/BOOLEAN TO STRING");
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
                            console.log("ESTE OPERADOR '+=' SOLO SE PUEDE USAR CON STRING O NUMEROS");
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
                            console.log("ESTE OPERADOR '+=' SOLO SE PUEDE USAR CON STRING O NUMEROS");
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
                                console.log("ERROR DE TIPO - CANT CONVERT A STRING/BOOL INTO BOOLEAN");
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
                console.log("ES UNA CONSTANTE, NO SE PUEDE ASIGNAR UN VALOR!");
            }
        }
    }


}