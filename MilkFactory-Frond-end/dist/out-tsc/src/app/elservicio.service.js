import * as tslib_1 from "tslib";
//Librerias a importar
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
//para el manejo y estilo de los Json
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
let ElservicioService = 
//exporta el servicio 
class ElservicioService {
    constructor(http) {
        this.http = http;
        //dirección del servicio en el Back-End BE
        this.Url = 'http://localhost:3312';
    }
    //Método para extraer los datos del servicio BE
    extractData(res) {
        //console.log("12", res);
        let body = res;
        //console.log("13")
        return body || {};
        ;
    }
    //manejador de los errores
    handleError(operation = 'operation', result) {
        return (error) => {
            console.log(`${operation} failed: ${error.message}`);
            return of(result);
        };
    }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // TODOS LOS CRUL DE TODAS LAS CLASES DEL PROYECTO 
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //=============================================================
    // SERVICIO CRUL DE TIPOS DE DOCUMENTOS
    //=============================================================
    // Método Listar de los Tipos de documentos
    //Mismos nombres de los metodos en la clase rutas del BE 
    getTipDocs() {
        console.log("estamos aqui  " + this.Url + "/marca", httpOptions);
        return this.http.get(this.Url + "/tipdoc", httpOptions).pipe(map(this.extractData));
    }
    //-------------------------------------------------------------
    // Método mostrar un solo Tipo de documento 
    getTipDoc(id) {
        return this.http.get(this.Url + "/tipdoc" + id, httpOptions).pipe(map(this.extractData));
    }
    //-------------------------------------------------------------
    // Método para insertar un nuevo Tipo de documento 
    insertTipDoc(TipoDocumento) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            //console.log(Color, this.Url+"/color")
            return new Promise((resolve, reject) => {
                this.http.post(this.Url + "/tipdoc", TipoDocumento, httpOptions).toPromise();
            });
        });
    }
    //-------------------------------------------------------------
    // Método para modificar un  Tipo de documento
    updateTipDoc(cadena) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            //console.log("33 " + cadena)
            //console.log("tales 60  " + cadena.id_tip_doc + " - " + cadena.tipo_documento+ " - " +  cadena.iniciales_tip_doc, this.Url + "/tipdoc")
            return new Promise((resolve, reject) => {
                this.http.put(this.Url + "/tipdoc", cadena, httpOptions).toPromise();
            });
        });
    }
};
ElservicioService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
    //exporta el servicio 
], ElservicioService);
export { ElservicioService };
//# sourceMappingURL=elservicio.service.js.map