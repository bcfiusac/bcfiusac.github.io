const instruccionesC = {
    Declaracion: 'Declaracion',
    Asignacion: 'Asignacion',
    IncDec: 'IncDec',
    Imprimir: 'Imprimir',
    Si: 'Si',
    While: 'While',
    DoWhile: 'DoWhile',
    Switch: 'Switch',
    Caso: 'Caso',
    For: 'For',
    ParamE: 'ParamE',
    Funcion: 'Funcion',
    LlamarF: 'LlamarF',
    Return: 'Return',
    ObjetoRetorno: 'ObjetoRetorno',
    Breik: 'Breik',
    Continuar: 'Continuar',
    DecArreglo: 'DecArreglo',
    AccesoMatrix: 'AccesoMatrix',
    Graficar: 'Graficar'

}
function Compilar(entrada) {

    root = gramatica.parse(entrada.toString());
    const primeriza = new SymTable([], [],[], null);
    window.tabTotal = new Array();
    window.consolita = new Array();
    window.tablas = window.tabTotal;
    window.consola = window.consolita;
    window.aver = [];


    //para guardar mis variables en la tabla de simbolos
    //debo quitar el comentario que esta justo debajo de esta linea
    //primerR(root,primeriza);
    const tabSymTotal = primerR(root,primeriza);
    arbolR(root, tabSymTotal);


}
function primerR(instrucciones, tabSym) {
    const xd = [];
    for (let i = 0; i < instrucciones.length; i++) {
        const instruccion = instrucciones[i];


         if (instruccion.Type === instruccionesC.Funcion) {
            switch (instruccion.tipoF) {
                case "number": {
                    tabSym.setearFuncion(instruccion.id, instruccion.Parametros, "Numero", instruccion.sentencias);
                    break;
                }

                case "string": {
                    tabSym.setearFuncion(instruccion.id, instruccion.Parametros, "Cadena", instruccion.sentencias);
                    break;
                }
                case "boolean": {
                    tabSym.setearFuncion(instruccion.id, instruccion.Parametros, "Booleano", instruccion.sentencias);
                    break;
                }
                default :{
                    tabSym.setearFuncion(instruccion.id, instruccion.Parametros, "xd", instruccion.sentencias);
                    break;
                }

            }

        }
        



    }
    return tabSym;

}











//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//___________________________________________________________________________________________________
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//---------------------------------------------------------------------------------------------------
function arbolR(instrucciones, tabSym) {
    const xd = [];
    for (let i = 0; i < instrucciones.length; i++) {
        const instruccion = instrucciones[i];


        if (instruccion.Type === instruccionesC.Declaracion) {
            //llamo al metodo DeclaracionD creado en la clase Declaracion.js
            DeclaracionD(instruccion, tabSym);

        }
        else if (instruccion.Type === instruccionesC.LlamarF){
            compilarFun(instruccion,tabSymTotal);
        }
        else if (instruccion.Type === instruccionesC.DecArreglo) {
            //console.log("ESTOY EN aca");
            DecArregloD(instruccion, tabSym);
        }
        else if (instruccion.Type === instruccionesC.Asignacion) {
            //console.log("ESTOY EN aca");
            AsignacionD(instruccion, tabSym);
        }
        else if (instruccion.Type === instruccionesC.IncDec) {
            IncDecD(instruccion, tabSym);
        }
        else if (instruccion.Type === instruccionesC.Imprimir) {
            window.consolita.push(ImprimirD(instruccion, tabSym));
        }
        else if(instruccion.Type=== instruccionesC.Graficar){
            console.log("QUIERE GRAFICAAAAAAAAAR");
            
            window.tabTotal.push(tabSym);
            console.log("prueba");
        }
        else if (instruccion.Type === instruccionesC.Si) {
            //const nueva = new SymTable([],[],tabSym);
            //tabSym = nueva;
            //const nueva = new SymTable([],[],tabSym);
            const conIf = SiD(instruccion, tabSym);//cambie nueva por tabsym
            if (conIf != null) {
                if (conIf.Type === instruccionesC.Return || conIf.Type === instruccionesC.Breik || conIf.Type === instruccionesC.Continuar) {
                    return conIf;
                }
            }

            //tabSym = nueva.Anterior;

        }
        else if (instruccion.Type === instruccionesC.While) {
            const nueva = new SymTable([], [], tabSym);
            const conW = WhileD(instruccion, nueva);
            if(conW!=null && conW.Type===instruccionesC.Return){
                return conW;
            }
            //tabSym = nueva.Anterior;
        }
        else if (instruccion.Type === instruccionesC.DoWhile) {
            const nueva = new SymTable([], [], tabSym);
            const conDW = DoWhileD(instruccion, nueva);
            if(conDW!=null && conDW.Type===instruccionesC.Return){
                return conDW;
            }
            //tabSym = nueva.Anterior;
        }
        else if (instruccion.Type === instruccionesC.Switch) {
            const nueva = new SymTable([], [], tabSym);
            SwitchD(instruccion, nueva);
            tabSym = nueva.Anterior;
        }
        else if (instruccion.Type === instruccionesC.For) {
            const nueva = new SymTable([], [], tabSym);
            const conFR = ForD(instruccion, nueva);
            if(conFR!=null && conFR.Type===instruccionesC.Return){
                return conFR;
            }
            //tabSym = nueva.Anterior;
        }
        /*else if (instruccion.Type === instruccionesC.Funcion) {
            switch (instruccion.tipoF) {
                case "number": {
                    tabSym.setearFuncion(instruccion.id, instruccion.Parametros, "Numero", instruccion.sentencias);
                    break;
                }

                case "string": {
                    tabSym.setearFuncion(instruccion.id, instruccion.Parametros, "Cadena", instruccion.sentencias);
                    break;
                }
                case "boolean": {
                    tabSym.setearFuncion(instruccion.id, instruccion.Parametros, "Booleano", instruccion.sentencias);
                    break;
                }
                default :{
                    tabSym.setearFuncion(instruccion.id, instruccion.Parametros, "xd", instruccion.sentencias);
                    break;
                }

            }

        }*/
        else if (instruccion.Type === instruccionesC.Return) {
            varia = ReturnD(instruccion, tabSym);
            return varia;
            //tabSym.setearReturn(instruccion.variable,tabSym);
            //return ;


        }
        else if (instruccion.Type === instruccionesC.Breik || instruccion.Type === instruccionesC.Continuar) {
            return instruccion;
        }




    }
    aveeeeer = tabSym;

}
function arbolRSingle(instruccion, tabSym) {

    if (instruccion.Type === instruccionesC.Declaracion) {
        //llamo al metodo DeclaracionD creado en la clase Declaracion.js
        DeclaracionD(instruccion, tabSym);

    }
    else if (instruccion.Type === instruccionesC.Asignacion) {
        //console.log("ESTOY EN aca");
        AsignacionD(instruccion, tabSym);
    }
    else if (instruccion.Type === instruccionesC.IncDec) {
        IncDecD(instruccion, tabSym);
    }
    else if (instruccion.Type === instruccionesC.Imprimir) {
        ImprimirD(instruccion, tabSym);
    }
    else if (instruccion.Type === instruccionesC.Si) {
        const nueva = new SymTable([], [], tabSym);
        SiD(instruccion, nueva);
        tabSym = nueva.Anterior;
    }
    else if (instruccion.Type === instruccionesC.While) {
        const nueva = new SymTable([], [], tabSym);
        WhileD(instruccion, nueva);
        tabSym = nueva.Anterior;
    }
    else if (instruccion.Type === instruccionesC.DoWhile) {
        const nueva = new SymTable([], [], tabSym);
        DoWhileD(instruccion, nueva);
        tabSym = nueva.Anterior;
    }
    else if (instruccion.Type === instruccionesC.Switch) {
        const nueva = new SymTable([], [], tabSym);
        SwitchD(instruccion, nueva);
        tabSym = nueva.Anterior;
    }
    else if (instruccion.Type === instruccionesC.For) {
        const nueva = new SymTable([], [], tabSym);
        ForD(instruccion, nueva);
        tabSym = nueva.Anterior;
    }
    else if (instruccion.Type === instruccionesC.Funcion) {
        const nueva = new SymTable([], [], tabSym);
        FuncionD(instruccion, nueva);
        tabSym = nueva.Anterior;
    }

    /*else if(instruccion.Type===instruccionesC.Caso){
        console.log("caso");
    }*/


    hdp = tabSym;

}