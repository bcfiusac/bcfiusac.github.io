const instruccionesC = {
Declaracion:'Declaracion',
Asignacion: 'Asignacion',
IncDec: 'IncDec',
Imprimir: 'Imprimir',
Si:'Si',
While: 'While',
DoWhile: 'DoWhile',
Switch:'Switch',
Caso:'Caso',
For:'For',
ParamE:'ParamE',
Funcion: 'Funcion',
LlamarF:'LlamarF',
Return:'Return'

}
function Compilar(entrada){
    
     root = gramatica.parse(entrada.toString());
     const tabSymTotal = new SymTable([],[],null);
     
     
     //para guardar mis variables en la tabla de simbolos
     //debo quitar el comentario que esta justo debajo de esta linea
    arbolR(root,tabSymTotal);
    

}
function arbolR (instrucciones, tabSym){
    for(let i = 0;i<instrucciones.length;i++){
       const instruccion = instrucciones[i];
    
    
        if(instruccion.Type===instruccionesC.Declaracion){
            //llamo al metodo DeclaracionD creado en la clase Declaracion.js
            DeclaracionD(instruccion, tabSym);
            
        }
        else if(instruccion.Type===instruccionesC.Asignacion){
            //console.log("ESTOY EN aca");
            AsignacionD(instruccion,tabSym);
        }
        else if(instruccion.Type===instruccionesC.IncDec){
            IncDecD(instruccion,tabSym);
        }
        else if(instruccion.Type===instruccionesC.Imprimir){
            ImprimirD(instruccion,tabSym);
        }
        else if(instruccion.Type===instruccionesC.Si){
            const nueva = new SymTable([],[],tabSym);
            SiD(instruccion,nueva);
            tabSym = nueva.Anterior;
        }
        else if(instruccion.Type===instruccionesC.While){
            const nueva = new SymTable([],[],tabSym);
            WhileD(instruccion,nueva);
            tabSym = nueva.Anterior;
        }
        else if(instruccion.Type===instruccionesC.DoWhile){
            const nueva = new SymTable([],[],tabSym);
            DoWhileD(instruccion,nueva);
            tabSym = nueva.Anterior;
        }
        else if(instruccion.Type===instruccionesC.Switch){
            const nueva = new SymTable([],[],tabSym);
            SwitchD(instruccion,nueva);
            tabSym = nueva.Anterior;
        }
        else if(instruccion.Type===instruccionesC.For){
            const nueva = new SymTable([],[],tabSym);
            ForD(instruccion,nueva);
            tabSym = nueva.Anterior;
        }
        else if(instruccion.Type===instruccionesC.Funcion){
            switch (instruccion.tipoF){
                case "number":{
                    tabSym.setearFuncion(instruccion.id,instruccion.Parametros,"Numero",instruccion.sentencias);        
                    break;
                }

                case "string":{
                    tabSym.setearFuncion(instruccion.id,instruccion.Parametros,"Cadena",instruccion.sentencias);
                    break;
                }
                case "boolean":{
                    tabSym.setearFuncion(instruccion.id,instruccion.Parametros,"Booleano",instruccion.sentencias);
                    break;
                }
                
            }
            
        }
        else if(instruccion.Type===instruccionesC.Return){
            xd = ReturnD(instruccion,tabSym);
            return xd;
            

        }        
        /*else if(instruccion.Type===instruccionesC.Caso){
            console.log("caso");
        }*/
        
    
    
    }
    aveeeeer = tabSym;
    
}
function arbolRSingle (instruccion, tabSym){
    
        if(instruccion.Type===instruccionesC.Declaracion){
            //llamo al metodo DeclaracionD creado en la clase Declaracion.js
            DeclaracionD(instruccion, tabSym);
            
        }
        else if(instruccion.Type===instruccionesC.Asignacion){
            //console.log("ESTOY EN aca");
            AsignacionD(instruccion,tabSym);
        }
        else if(instruccion.Type===instruccionesC.IncDec){
            IncDecD(instruccion,tabSym);
        }
        else if(instruccion.Type===instruccionesC.Imprimir){
            ImprimirD(instruccion,tabSym);
        }
        else if(instruccion.Type===instruccionesC.Si){
            const nueva = new SymTable([],[],tabSym);
            SiD(instruccion,nueva);
            tabSym = nueva.Anterior;
        }
        else if(instruccion.Type===instruccionesC.While){
            const nueva = new SymTable([],[],tabSym);
            WhileD(instruccion,nueva);
            tabSym = nueva.Anterior;
        }
        else if(instruccion.Type===instruccionesC.DoWhile){
            const nueva = new SymTable([],[],tabSym);
            DoWhileD(instruccion,nueva);
            tabSym = nueva.Anterior;
        }
        else if(instruccion.Type===instruccionesC.Switch){
            const nueva = new SymTable([],[],tabSym);
            SwitchD(instruccion,nueva);
            tabSym = nueva.Anterior;
        }
        else if(instruccion.Type===instruccionesC.For){
            const nueva = new SymTable([],[],tabSym);
            ForD(instruccion,nueva);
            tabSym = nueva.Anterior;
        }
        else if(instruccion.Type===instruccionesC.Funcion){
            const nueva = new SymTable([],[],tabSym);
            FuncionD(instruccion,nueva);
            tabSym = nueva.Anterior;
        }  
        
        /*else if(instruccion.Type===instruccionesC.Caso){
            console.log("caso");
        }*/
        
    
    hdp = tabSym;
    
}