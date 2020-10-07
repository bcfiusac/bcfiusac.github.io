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
function SymTipo(id,params,tipoVar,tipo){
    return{
        id:id,
        params:params,
        tipoVar:tipoVar,
        tipo:tipo
    }
}

class SymTable {
    constructor(Symbol, Funcion, Arreglo, Tipo, TipoDef, Anterior) {
        this.Symbol = Symbol;
        this.Funcion = Funcion;
        this.Arreglo = Arreglo;
        this.Tipo = Tipo;
        this.TipoDef = TipoDef;
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
    setearTipo(id,params,tipoVarP,tipo){
        const newTipo = SymTipo(id,params,tipoVarP,tipo);
        this.Tipo.push(newTipo);
    }
    setearTipoDef(id,params,tipoVarP,tipo){
        const newTipo = SymTipo(id,params,tipoVarP,tipo);
        this.TipoDef.push(newTipo);
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
    getType(identificador){
        const tipo = this.Tipo.filter(tipo => tipo.id === identificador)[0];
        if (tipo) return tipo;
        else return "ERROR";
    }
    getTypeDef(identificador){
        const tipo = this.TipoDef.filter(tipo => tipo.id === identificador)[0];
        if (tipo) return tipo;
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
    ActArreglo(identificador,Arreglo){
        for(let i = 0;i<this.Arreglo.length;i++){
            if(this.Arreglo[i].id=identificador){
                this.Arreglo[i] = Arreglo;
                return true;
            }
        }
        return false;
    }
    ActType(identificador,Type){
        for(let i = 0;i<this.Tipo.length;i++){
            if(this.Tipo[i].id=identificador){
                this.Tipo[i] = Type;
                return true;
            }
        }
        return false;
    }

}