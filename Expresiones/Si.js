function Si(expr, bloque, demas) {
    return {
        expr: expr,
        bloque: bloque,
        demas: demas,
        Type: instruccionesC.Si

    }
}
function SiD(Instruccion, tabSym) {
    const nueva = new SymTable([], [], tabSym);
    let res = null;
    prueba = Instruccion;
    console.log("LLEGUE ACA JEJEJEJE");
    booleano = getValor(Instruccion.expr, nueva);
    if (booleano) {
        console.log("es cierto");
        res = arbolR(Instruccion.bloque, nueva);
    }
    else {
        console.log("es mentira");
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