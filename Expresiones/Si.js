function Si(expr, bloque, demas) {
    return {
        expr: expr,
        bloque: bloque,
        demas: demas,
        Type: instruccionesC.Si

    }
}
function SiD(Instruccion, tabSym) {
    const nueva = new SymTable([], [],[],[],[], tabSym);
    let res = null;
    prueba = Instruccion;
    //console.log("LLEGUE ACA JEJEJEJE");
    
            let valor;
            let tipo;
            if (Instruccion.expr.Type === primitivos.LLamarFuncion) {
                temp = getValor(Instruccion.expr,nueva);
                valor = temp.valor;
                tipo = temp.tipo;
            }
            else {
                valor = getValor(Instruccion.expr, nueva);
                tipo = getTipo(Instruccion.expr, nueva);
            }

            booleano = valor;

    if (booleano && tipo===primitivos.Booleano) {
        //console.log("es cierto");
        res = arbolR(Instruccion.bloque, nueva);
    }
    else if(tipo!=primitivos.Booleano){
        const error = Error('Semantico', 'CONDICION DEL IF DIFERENTE A UN BOOLEANO: ',Instruccion.expr.Column,Instruccion.expr.Row);
                        Horrores.push(error);
    }
    else {
        //console.log("es mentira");
        if (Instruccion.demas) {
            if (Instruccion.demas[0].Type === "Si") {
                res = SiD(Instruccion.demas, nueva);
            }
            else {
                res = arbolR(Instruccion.demas, nueva);
            }

        }


    }
    return res;

}