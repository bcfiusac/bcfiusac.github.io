function Return(variable){
    return{
        variable:variable,
        Type:instruccionesC.Return
    }
}

function ReturnD(Instruccion,tabSym){
console.log("VIENE UN RETURN");
tabSym.setearReturn(Instruccion.variable,tabSym);
return Instruccion.variable;
}