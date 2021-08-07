import * as tslib_1 from "tslib";
//Importación de las librerias
import { Component } from '@angular/core';
//Archivos del actual componente
let TipDocsComponent = class TipDocsComponent {
    constructor(formBuilder, servi, Router) {
        this.formBuilder = formBuilder;
        this.servi = servi;
        this.title = "PROYECTO DE TIPOS DE DOCUMENTOS";
        //Variables para los titulos de las secciones
        this.tituloTipDocs = "";
        this.titloTipDoc = "";
        this.titloTipDocEditar = "";
        //variables arreglos para mostrar los registros
        this.TipDocs = [];
        this.MiTipDoc = [];
        this.MiTipDocE = [];
    }
    //=============================================================
    //LOS CRUL
    //=============================================================
    consultaTipDocs() {
        //console.log("22");
        this.servi.getTipDocs().subscribe((data) => { this.TipDocs = data; }, error => { console.error(error + " "); });
        this.tituloTipDocs = "LISTA DE TIPOS DE DOCUMENTOS";
        // console.log("23");
    }
    //--------------------------------------------------------------
    buscarTipDocs(id) {
        var filtovalor = this.filtrarTipDoc.getRawValue()['textfiltro'];
        this.servi.getTipDoc('/' + filtovalor).subscribe((data) => { this.MiTipDoc = data; }, error => { console.log(error); });
        this.titloTipDoc = "TIPO DE DOCUMENTO SELECIONADO";
    }
    //--------------------------------------------------------------
    InsertarTipDoc() {
        //console.log("31  Inserta");
        var datosvalo2 = this.InsertarGTipDoc.getRawValue()['textTipDoc'];
        var datosvalo3 = this.InsertarGTipDoc.getRawValue()['textiniTipDoc'];
        //console.log("Td", datosvalo2,datosvalo3)
        var cadena = { "tipo_documento": datosvalo2, "iniciales_tip_doc": datosvalo3 };
        //console.log(" 39 " + cadena);
        this.servi.insertTipDoc(cadena).then(res => { console.log(res); }).catch(err => { console.log(err); });
    }
    //--------------------------------------------------------------
    buscarEditarTipDoc(id) {
        var filtoEvalor = this.ActualizarATipDoc.getRawValue()['ActualizarIdipDoc'];
        //console.log("iServicio 43 " + filtoEvalor + " ID " + id );
        this.servi.getTipDoc('/' + filtoEvalor).subscribe((data) => {
            this.MiTipDocE = data;
            //console.log(" 44" + this.MiTipDocE[0].color)
        }, error => { console.log(error); });
        this.titloTipDocEditar = "TIPO DOCUMENDO A EDITAR";
    }
    //--------------------------------------------------------------
    ActualizarTipDoc() {
        console.log("Actualiza tipdoc asdsadasdsa");
        var textIdTipDoc = this.ActualizarATipDoc.getRawValue()['ActualizarIdipDoc'];
        //console.log("  45 " + textIdTipDoc);
        var nuevoTipDoc = this.ActualizarATipDoc.getRawValue()['nuevoTipDoc'];
        //console.log("   la 46 " + nuevoTipDoc);
        var nuevoIniTipDoc = this.ActualizarATipDoc.getRawValue()['nuevoIniTipDoc'];
        //console.log("   la 47 " + nuevoIniTipDoc);
        var cadena = { "id_tip_doc": textIdTipDoc, "tipo_documento": nuevoTipDoc, "iniciales_tip_doc": nuevoIniTipDoc };
        //console.log("tales 48  " + cadena.id_tip_doc + " - " + cadena.tipo_documento + " - " +  cadena.iniciales_tip_doc)
        this.servi.updateTipDoc(cadena).then(res => {
            console.log("res", res);
        }).catch(err => {
            console.log(err);
        });
    }
    //=============================================================
    //LAS FUNCIONES PARA LLAMARLAS DESDE EL HTML
    //=============================================================  
    ngOnInit() {
        this.filtrarTipDoc = this.formBuilder.group({
            textfiltro: []
        });
        this.formBuilder.group;
        this.InsertarGTipDoc = this.formBuilder.group({
            textTipDoc: [],
            textiniTipDoc: []
        });
        this.formBuilder.group;
        this.ActualizarATipDoc = this.formBuilder.group({
            ActualizarIdipDoc: [],
            nuevoTipDoc: [],
            nuevoIniTipDoc: [],
        });
        this.formBuilder.group;
    }
};
TipDocsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-tip-docs',
        templateUrl: './tip-docs.component.html',
        styleUrls: ['./tip-docs.component.css']
    })
], TipDocsComponent);
export { TipDocsComponent };
//# sourceMappingURL=tip-docs.component.js.map