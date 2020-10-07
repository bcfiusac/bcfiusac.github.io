function DecArreglo(tipoVar, id, tipo, valsdim) {
    return {
        tipoVar: tipoVar,
        id: id,
        tipo, tipo,
        valsdim: valsdim,
        Type: instruccionesC.DecArreglo
    }
}

function DecArregloD(Instruccion, tabSym) {
    //console.log("ESTOY EN DECLARACIOND E ARREGLO");
    banderaET = false;
    esta = tabSym.getArreglo(Instruccion.id);
    if (esta === "ERROR") {
        if (Instruccion.valsdim === 0) {
            //el arreglo viene vacío
            tabSym.setearArreglo(Instruccion.tipoVar, Instruccion.id, Instruccion.tipo, []);
            //console.log("aveeeeer");
        }
        else {//hay valores para agregar al arreglo
            if (Instruccion.tipo === "number") {
                Instruccion.tipo = "Numero";
                for (let i = 0; i < Instruccion.valsdim.length; i++) {
                    let valor;
                    let tipo;
                    if (Instruccion.Type === primitivos.LLamarFuncion) {
                        temp = getValor(Instruccion.valsdim[i], tabSym);
                        valor = temp.valor;
                        tipo = temp.tipo;
                    }
                    else {
                        valor = getValor(Instruccion.valsdim[i], tabSym);
                        tipo = getTipo(Instruccion.valsdim[i], tabSym);
                    }
                    if (tipo === primitivos.Numero) {
                        //console.log("LOS TIPOS COINCIDEN");
                    }
                    else {
                        //console.log("LOS TIPOS DE LOS VALORES Y EL ARREGLO NO COINCIDEN");
                        banderaET = true;
                        const error = Error('Semantico', 'LOS VALORES NO COINCIDEN EN LA FUNCION ' + Instruccion.id);
                        Horrores.push(error);
                    }

                }
            }
            else if (Instruccion.tipo === "string") {
                Instruccion.tipo = "Cadena";
                for (let i = 0; i < Instruccion.valsdim.length; i++) {
                    let valor;
                    let tipo;
                    if (Instruccion.Type === primitivos.LLamarFuncion) {
                        temp = getValor(Instruccion.valsdim[i], tabSym);
                        valor = temp.valor;
                        tipo = temp.tipo;
                    }
                    else {
                        valor = getValor(Instruccion.valsdim[i], tabSym);
                        tipo = getTipo(Instruccion.valsdim[i], tabSym);
                    }
                    if (tipo === primitivos.Cadena) {
                        //console.log("LOS TIPOS COINCIDEN");
                    }
                    else {
                        //console.log("LOS TIPOS DE LOS VALORES Y EL ARREGLO NO COINCIDEN");
                        banderaET = true;
                        const error = Error('Semantico', 'LOS VALORES NO COINCIDEN EN LA FUNCION ' + Instruccion.id);
                        Horrores.push(error);
                    }

                }
            }
            else if (Instruccion.tipo === primitivos.Booleano) {
                Instruccion.tipo = "Booleano";
                for (let i = 0; i < Instruccion.valsdim.length; i++) {
                    let valor;
                    let tipo;
                    if (Instruccion.Type === primitivos.LLamarFuncion) {
                        temp = getValor(Instruccion.valsdim[i], tabSym);
                        valor = temp.valor;
                        tipo = temp.tipo;
                    }
                    else {
                        valor = getValor(Instruccion.valsdim[i], tabSym);
                        tipo = getTipo(Instruccion.valsdim[i], tabSym);
                    }
                    if (tipo === primitivos.Booleano) {
                        //console.log("LOS TIPOS COINCIDEN");
                    }
                    else {
                        //console.log("LOS TIPOS DE LOS VALORES Y EL ARREGLO NO COINCIDEN");
                        banderaET = true;
                        const error = Error('Semantico', 'LOS VALORES NO COINCIDEN EN LA FUNCION ' + Instruccion.id);
                        Horrores.push(error);

                    }

                }
            }

            if (banderaET) {//HAY PROBLEMAS CON LOS TIPOS DE LA LISTA DE VALORES Y EL TIPO DEL ARREGLO

            }
            else {
                //TODO BIEN DE TIPOS, TODO CORRECTO
                tabSym.setearArreglo(Instruccion.tipoVar, Instruccion.id, Instruccion.tipo, Instruccion.valsdim);
                //console.log("aveeeeeeer");
            }
        }

    }
    else {
        //console.log("NO SE PUEDE DECLARAR " + Instruccion.id +" PORQUE YA EXISTE UN ARREGLO CON ESE NOMBRE");
        const error = Error('Semantico', 'NO SE PUEDE DECLARAR ' + Instruccion.id + ' PORQUE YA EXISTE UN ARREGLO CON ESE NOMBRE');
        Horrores.push(error);
    }


}