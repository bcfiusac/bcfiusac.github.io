function Symbol(tipo, id, value, editar) {
    //aqui creo los objetos de tipo simbolo que conforman mi tabla de simbolos
    return {
        tipo: tipo, //tipo de simbolo
        id: id, //identificador unico
        value: value, //valor que este trae
        editar: editar //si se puede editar (let) o es const
    }
}

function SymFun(id,parametros,tipoF,sentencias){
    return{
        id:id,
        parametros:parametros,
        tipoF:tipoF,
        sentencias:sentencias
    }    
    
}

class SymTable {
    constructor(Symbol,Funcion, Anterior) {
        this.Symbol = Symbol;
        this.Funcion = Funcion;
        this.Anterior = Anterior;

    }
    //metodo para agregar simbolo a la tabla
    setearSymbol(tipo, id, value, editar) {
        const newSymbol = Symbol(tipo, id, value, editar);
        this.Symbol.push(newSymbol);
        //console.log("Guardado jeej");
    }
    setearFuncion(id,parametros,tipoF,sentencias){
        const newFuncion = SymFun(id,parametros,tipoF,sentencias);
        this.Funcion.push(newFuncion);
    }
    getFuncion(identificador){
        const funcion = this.Funcion.filter(funcion => funcion.id === identificador)[0];
        if (funcion) return funcion;
        else return "ERROR";
    }
    getSimbolo(identificador) {
        const simbolo = this.Symbol.filter(simbolo => simbolo.id === identificador)[0];
        if (simbolo) return simbolo;
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