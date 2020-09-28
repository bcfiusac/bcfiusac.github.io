function Symbol(tipo, id, value, editar) {
    //aqui creo los objetos de tipo simbolo que conforman mi tabla de simbolos
    return {
        tipo: tipo, //tipo de simbolo
        id: id, //identificador unico
        value: value, //valor que este trae
        editar: editar //si se puede editar (let) o es const
    }
}

function SymFun(id, parametros, tipoF, sentencias) {
    return {
        id: id,
        parametros: parametros,
        tipoF: tipoF,
        sentencias: sentencias
    }

}
function SymArr(tipoVar, id, tipo, valsdim) {
    return {
        tipoVar: tipoVar,
        id: id,
        tipo: tipo,
        valsdim: valsdim
    }
}

class SymTable {
    constructor(Symbol, Funcion, Arreglo, Anterior) {
        this.Symbol = Symbol;
        this.Funcion = Funcion;
        this.Arreglo = Arreglo;
        this.Anterior = Anterior;

    }
    setearReturn(Variable, tabSym) {
        const newSymbol = Symbol(1, tabSym, Variable, 0);
        this.Symbol.push(newSymbol);
    }
    //metodo para agregar simbolo a la tabla
    setearSymbol(tipo, id, value, editar) {
        const newSymbol = Symbol(tipo, id, value, editar);
        this.Symbol.push(newSymbol);
        //console.log("Guardado jeej");
    }
    setearFuncion(id, parametros, tipoF, sentencias) {
        const newFuncion = SymFun(id, parametros, tipoF, sentencias);
        this.Funcion.push(newFuncion);
    }
    setearArreglo(tipoVar, id, tipo, valsdim) {
        const newArreglo = SymArr(tipoVar, id, tipo, valsdim);
        this.Arreglo.push(newArreglo);
    }
    getFuncion(identificador) {
        const funcion = this.Funcion.filter(funcion => funcion.id === identificador)[0];
        if (funcion) {

            return JSON.parse(JSON.stringify(funcion));
        }
        else return "ERROR";
    }
    getSimbolo(identificador) {
        const simbolo = this.Symbol.filter(simbolo => simbolo.id === identificador)[0];
        if (simbolo) return simbolo;
        else return "ERROR";
    }
    getArreglo(identificador) {
        const arreglo = this.Arreglo.filter(arreglo => arreglo.id === identificador)[0];
        if (arreglo) return arreglo;
        else return "ERROR";
    }

    ActSimbolo(identificador, Symbol) {
        for (let i = 0; i < this.Symbol.length; i++) {
            if (this.Symbol[i].id = identificador) {
                //console.log("ENCONTRE LA VARIABLE");
                this.Symbol[i] = Symbol;
                return true;
            }
        }
        return false;




    }

}