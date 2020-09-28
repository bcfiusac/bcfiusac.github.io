function Return(variable) {
    return {
        variable: variable,
        valor: null,
        tipo: null,
        Type: instruccionesC.Return
    }
}

function ReturnD(Instruccion, tabSym) {
    console.log("VIENE UN RETURN");
    //tabSym.setearReturn(Instruccion.variable,tabSym);
    if (Instruccion.variable != null ) {
        Instruccion.valor = getValor(Instruccion.variable, tabSym);
        Instruccion.tipo = getTipo(Instruccion.variable, tabSym);
    }

    return Instruccion;
}