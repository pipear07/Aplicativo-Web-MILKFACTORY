//Librerias a importar
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

//IMPORTANTE NO OLVIDE CREAR EL COMPONENTE CON ng n c (nombre del componente)
//creo que asi dice el video del profe del 27 de abril del 2020

//para el manejo y estilo de los Json
const httpOptions =
{
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable(
  {
    providedIn: 'root'
  })

//exporta el servicio 
export class ElservicioService {

  //dirección del servicio en el Back-End BE
  private Url: string = 'http://localhost:3312'; //NUNCA MOVERLO!!!

  constructor(private http: HttpClient) { }


  //Método para extraer los datos del servicio BE
  private extractData(res: Response) {
    //console.log("12", res);

    let body = res;
    
    //console.log("13")
    return body || {};
    ;
  }


  //manejador de los errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log(`${operation} failed: ${error.message}`);
      return of(result as T)

    };
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // TODOS LOS CRUL DE TODAS LAS CLASES DEL PROYECTO 
  //=============================================================
  // SERVICIO CRUL DE TIPOS DE DOCUMENTOS  
  //=============================================================

  // Método Listar de los Tipos de documentos
  getTipDocs(): Observable<any> 
  {
    return this.http.get(this.Url + "/tipdoc", httpOptions).pipe(
      map(this.extractData)      
    );
  }

  //-------------------------------------------------------------
 // Método mostrar un solo Tipo de documento 

  getTipDoc(id): Observable<any> 
  {
    
    return this.http.get(this.Url + "/tipdoc" + id, httpOptions).pipe(
      map(this.extractData));
  }

  //-------------------------------------------------------------
 // Método para insertar un nuevo Tipo de documento 

  async insertTipDoc(TipoDocumento): Promise<any> 
  {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/tipdoc", TipoDocumento, httpOptions).toPromise()
    });
  }

  //-------------------------------------------------------------
 // Método para modificar un  Tipo de documento

  async updateTipDoc(cadena): Promise<any> 
  {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/tipdoc", cadena, httpOptions).toPromise()
    });
  }
  //=============================================================
  // SERVICIO CRUL DE DETALLES DE PRODUCCION 
  //=============================================================

  // Método Listar de los Tipos de documentos
  //Mismos nombres de los metodos en la clase rutas del BE 

  getDProducciones(): Observable<any> 
  {
    return this.http.get(this.Url + "/DetallesProduccion", httpOptions).pipe(
      map(this.extractData)      
    );
  }
  //========================================================LISTAS DESPLEGABLES=======================================================================================
  

  //FUNCIONO!! ESTE ES PARA LLENAR LA LISTA DE EDITAR PRODUCCION EMPLEADO
  getEmpleadoxProducciones(): Observable<any> 
  {
    return this.http.get(this.Url + "/Empleado", httpOptions).pipe(
      map(this.extractData)      
    );
  }

  //FUNCIONO!! ESTE ES PARA LLENAR LA LISTA DE EDITAR PRODUCCION EMPLEADO
  getVacaxProducciones(): Observable<any> 
  {
    return this.http.get(this.Url + "/Vaca", httpOptions).pipe(
      map(this.extractData)      
    );
  }

  //FUNCIONO!! ESTE ES PARA LLENAR LA LISTA DE EDITAR PRODUCCION EMPLEADO
  getInsumoxProducciones(): Observable<any> 
  {
    return this.http.get(this.Url + "/InsumoLeche", httpOptions).pipe(
      map(this.extractData)      
    );
  }

 // Método mostrar un solo Detalle de Produccion

 getDProduccion(id): Observable<any> 
 {
  return this.http.get(this.Url + "/DetallesProduccion" + id, httpOptions).pipe(
    map(this.extractData));  
 }

 //-------------------------------------------------------------
 // Método para insertar un nuevo Tipo de documento 

 async insertDProduccion(DetalleProduccion): Promise<any> 
 {
  return new Promise((resolve, reject) => {
    this.http.post(this.Url + "/DetallesProduccion", DetalleProduccion, httpOptions).toPromise()
  });
 }

 //-------------------------------------------------------------
 // Método para modificar un  Tipo de documento

 async updateDProduccion(cadena): Promise<any> 
 {
  return new Promise((resolve, reject) => {
    this.http.put(this.Url + "/DetallesProduccion", cadena, httpOptions).toPromise()
  });
 }
  //=============================================================
  // SERVICIO INFORME POR EMPLEADO
  //=============================================================
 // Método mostrar un solo Informe por Empleado

 getDProduccionxEmpleado(id,otro,otro2): Observable<any> 
 {
  return this.http.get(this.Url + "/detallesproduccion/infoempleado" + id+otro+otro2, httpOptions).pipe(
    map(this.extractData));
 }

 //FUNCIONO!! ESTE ES PARA LLENAR LA LISTA DE EDITAR PRODUCCION EMPLEADO
 getEmpleadoxProduccionesInformes(): Observable<any> 
 {
  return this.http.get(this.Url + "/Empleado", httpOptions).pipe(
    map(this.extractData)      
  );
 }
 //=============================================================
  // SERVICIO INFORME POR Vaca
  //=============================================================
 // Método mostrar un solo Informe por Vaca

 getDProduccionxVaca(id,otro,otro2): Observable<any> 
 {
  return this.http.get(this.Url + "/detallesproduccion/infovacas" + id+otro+otro2, httpOptions).pipe(
    map(this.extractData));
 }

 //FUNCIONO!! ESTE ES PARA LLENAR LA LISTA DE EDITAR PRODUCCION EMPLEADO
 getVacasxProduccionesInformes(): Observable<any> 
 {
  return this.http.get(this.Url + "/vaca", httpOptions).pipe(
    map(this.extractData)      
  );
 }
    //=============================================================
    // SERVICIO CRUL DE Razas Vacas 
    //=============================================================
    getRazaVacas(): Observable<any> {

      //console.log("estamos aqui  " + this.Url+ "/marca", httpOptions);
  
      return this.http.get(this.Url + "/razavaca", httpOptions).pipe(
        map(this.extractData)      
      );
    }
  
    getRazaVaca(id): Observable<any>{
  
      return this.http.get(this.Url + "/razavaca"+ id, httpOptions).pipe(
        map(this.extractData)
        );   
    }
    // Método para insertar un nueva raza de vaca 
  
    async insertRazavaca(RazaVaca): Promise<any> {
  
      //console.log(Color, this.Url+"/color")
  
      return new Promise((resolve, reject) => {
        this.http.post(this.Url + "/razavaca", RazaVaca, httpOptions).toPromise()
      });
    }
  
    // Método para modificar una raza
  
    async updateRazavaca(cadena): Promise<any> {
  
      //console.log("33 " + cadena)
      //console.log("tales 60  " + cadena.id_tip_doc + " - " + cadena.tipo_documento+ " - " +  cadena.iniciales_tip_doc, this.Url + "/tipdoc")
  
  
      return new Promise((resolve, reject) => {
        this.http.put(this.Url + "/razavaca", cadena, httpOptions).toPromise()
      });
    }
    //=============================================================
      // SERVICIO CRUL DE Vacas 
      //=============================================================
  
  
    getVacas(): Observable<any> {
  
      //console.log("estamos aqui  " + this.Url+ "/marca", httpOptions);
  
      return this.http.get(this.Url + "/vaca", httpOptions).pipe(
        map(this.extractData)      
      );
    }
  
    getVaca(id): Observable<any>{
  
      return this.http.get(this.Url + "/Vaca"+ id, httpOptions).pipe(
        map(this.extractData)
        );   
    }
  
    async insertVaca(Vaca): Promise<any> {
  
      //console.log(Color, this.Url+"/color")
    
      return new Promise((resolve, reject) => {
        this.http.post(this.Url + "/Vaca", Vaca, httpOptions).toPromise()
      });
    }
  
    async updateVaca(cadena): Promise<any> {
  
      //console.log("33 " + cadena)
      //console.log("tales 60  " + cadena.id_tip_doc + " - " + cadena.tipo_documento+ " - " +  cadena.iniciales_tip_doc, this.Url + "/tipdoc")
  
  
      return new Promise((resolve, reject) => {
        this.http.put(this.Url + "/Vaca", cadena, httpOptions).toPromise()
      });
    }

    //CRUL ROLES
// Método Listar de los Roles
  //Mismos nombres de los metodos en la clase rutas del BE 

  getRoles(): Observable<any> { //listar todo

    //console.log("estamos aqui  " + this.Url+ "/marca", httpOptions);

    return this.http.get(this.Url + "/Rol", httpOptions).pipe(
      map(this.extractData)      
    );
  }

  //-------------------------------------------------------------
 // Método mostrar un solo Rol 

 getRol(id): Observable<any> {
    
  return this.http.get(this.Url + "/Rol" + id, httpOptions).pipe(
    map(this.extractData));
}

//-------------------------------------------------------------
 // Método para insertar un nuevo Rol 

 async insertRol(Rol): Promise<any> {

  //console.log(Color, this.Url+"/color")

  return new Promise((resolve, reject) => {
    this.http.post(this.Url + "/Rol", Rol, httpOptions).toPromise()
  });
}

//-------------------------------------------------------------
 // Método para modificar un  Rol

 async updateRol(cadena): Promise<any> {

  //console.log("33 " + cadena)
  //console.log("tales 60  " + cadena.id_rol + " - " + cadena.nombre_rol)


  return new Promise((resolve, reject) => {
    this.http.put(this.Url + "/Rol", cadena, httpOptions).toPromise()
  });
}

//CRUL INSUMOS DE LECHE
// Método Listar de los Insumos de Leche
  //Mismos nombres de los metodos en la clase rutas del BE 

  getInsumoLeche(): Observable<any> { //listar todo

    //console.log("estamos aqui  " + this.Url+ "/marca", httpOptions);

    return this.http.get(this.Url + "/InsumoLeche", httpOptions).pipe(
      map(this.extractData)      
    );
  }

  //-------------------------------------------------------------
 // Método mostrar un solo Insumo 

 getInsumosLeche(id): Observable<any> {
    
  return this.http.get(this.Url + "/InsumoLeche" + id, httpOptions).pipe(
    map(this.extractData));
}

//-------------------------------------------------------------
 // Método para insertar un nuevo Insumo de Leche 

 async insertInsumoLeche(InsumoLeche): Promise<any> {

  //console.log(Color, this.Url+"/color")

  return new Promise((resolve, reject) => {
    this.http.post(this.Url + "/InsumoLeche", InsumoLeche, httpOptions).toPromise()
  });
}

 //-------------------------------------------------------------
 // Método para modificar un Insumo de Leche

 async updateInsumoLeche(cadena): Promise<any> {

  //console.log("33 " + cadena)
  //console.log("tales 60  " + cadena.id_tip_doc + " - " + cadena.tipo_documento+ " - " +  cadena.iniciales_tip_doc, this.Url + "/tipdoc")


  return new Promise((resolve, reject) => {
    this.http.put(this.Url + "/InsumoLeche", cadena, httpOptions).toPromise()
  });
}
//-------------------------------------------------------------------------------------------
//CRUL EMPLEADOS
// Método Listar de los Empelados
  //Mismos nombres de los metodos en la clase rutas del BE 

  getEmpleados(): Observable<any> { //listar todo

    //console.log("estamos aqui  " + this.Url+ "/marca", httpOptions);

    return this.http.get(this.Url + "/Empleado", httpOptions).pipe(
      map(this.extractData)      
    );
  }


  //===============================================================================================================================================
  //===============================================================================================================================================
  //===============================================================================================================================================
  //========================================================LISTAS DESPLEGABLES=======================================================================================
  

  //FUNCIONO!! ESTE ES PARA LLENAR LA LISTA DE EDITAR EMPLEADO ROL
  getRolxEmpleado(): Observable<any> { //listar todo

    //console.log("estamos aqui  " + this.Url+ "/marca", httpOptions);

    return this.http.get(this.Url + "/Rol", httpOptions).pipe(
      map(this.extractData)      
    );
  }

  //FUNCIONO!! ESTE ES PARA LLENAR LA LISTA DE EDITAR EMPLEADO TIPO DE DOCUMENTO
  getDocumentosxEmpleado(): Observable<any> { //listar todo

    //console.log("estamos aqui  " + this.Url+ "/marca", httpOptions);

    return this.http.get(this.Url + "/tipdoc", httpOptions).pipe(
      map(this.extractData)      
    );
  }

  //===============================================================================================================================================
  //===============================================================================================================================================
  //===============================================================================================================================================

 // Método mostrar un solo Empleado

 getEmpleado(id): Observable<any> {
    
  return this.http.get(this.Url + "/Empleado" + id, httpOptions).pipe(
    map(this.extractData));

   
}

//-------------------------------------------------------------
 // Método para insertar un nuevo Empleado 

 async insertEmpleado(Empleados): Promise<any> {

  //console.log(Color, this.Url+"/color")

  return new Promise((resolve, reject) => {
    this.http.post(this.Url + "/Empleado", Empleados, httpOptions).toPromise()
  });
}

 //-------------------------------------------------------------
 // Método para modificar un Empleado

 async updateEmpleado(cadena): Promise<any> {

  //console.log("33 " + cadena)
  //console.log("tales 60  " + cadena.id_tip_doc + " - " + cadena.tipo_documento+ " - " +  cadena.iniciales_tip_doc, this.Url + "/tipdoc")


  return new Promise((resolve, reject) => {
    this.http.put(this.Url + "/Empleado", cadena, httpOptions).toPromise()
  });
}




}