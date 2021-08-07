//Importación de las librerias
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

//se importa el servicio
import { ElservicioService } from '../elservicio.service'; //ES UNICO E IRREMPLAZABLE

//Archivos del actual componente
@Component({
  selector: 'app-tip-docs',
  templateUrl: './tip-docs.component.html', //ESTO LO PONE AUTOMATICAMENTE EL SISTEMA CUANDO SE CREA EL COMPONENTE
  styleUrls: ['./tip-docs.component.css']
})

export class TipDocsComponent implements OnInit {

//REVISAR TAMBIEN EL app.module.ts TAMBIEN HAY QUE MODIFICAR
//Y REVISAR EL menu-inicio PARA AÑADIR EL FRONT END DE SUS TABLAS CUANDO TERMINEN

  title = "PROYECTO DE TIPOS DE DOCUMENTOS";

  //Variables para los titulos de las secciones
  tituloTipDocs = "";
  titloTipDoc = "";  //AQUI INICIALIZA LAS VARIABLES
  titloTipDocEditar = "";

  //variables arreglos para mostrar los registros
  TipDocs: any = [];
  MiTipDoc: any = []; //ESTOS SON DECLARACIONES DE VECTORES
  MiTipDocE: any = [];


  filtrarTipDoc: FormGroup;
  InsertarGTipDoc: FormGroup;  //LOS GRUPOS DE VECTORES
  ActualizarATipDoc: FormGroup;



  constructor(
      private formBuilder: FormBuilder,
      private servi: ElservicioService,  //SIEMPRE VA ASI... TOCA AÑADIRLE CRUL AL SERVICIO PARA QUE FUNCIONE POR CLASE
      Router: Router) { }

  //=============================================================
  //LOS CRUL
  //=============================================================

   consultaTipDocs() {
    //console.log("22");
    
    this.servi.getTipDocs().subscribe((data: {tipdoc: []}) => {this.TipDocs = data;},
                   error => {console.error(error + " ")});

    this.tituloTipDocs = "LISTA DE TIPOS DE DOCUMENTOS"; 
    
   // console.log("23");
  }

  //--------------------------------------------------------------

  public buscarTipDocs() {

    var filtovalor = this.filtrarTipDoc.getRawValue()['textfiltro'];

    this.servi.getTipDoc('/' + filtovalor).subscribe((data: {}) => {this.MiTipDoc = data;},
                              error => {console.log(error)});

    this.titloTipDoc = "TIPO DE DOCUMENTO SELECIONADO";
  }

  //--------------------------------------------------------------

  public InsertarTipDoc() {
    //console.log("31  Inserta");

    var datosvalo2 = this.InsertarGTipDoc.getRawValue()['textTipDoc'];
   // var datosvalo3 = this.InsertarGTipDoc.getRawValue()['textiniTipDoc'];
    
   //console.log("Td", datosvalo2,datosvalo3)

    var cadena = {"nombre_tipo_identificacion":datosvalo2};
    
    //console.log(" 39 " + cadena);

    this.servi.insertTipDoc(cadena).then(res => {console.log(res)}).catch(err => 
      {console.log(err)});
  }


  //--------------------------------------------------------------

 public buscarEditarTipDoc() {
    //IMPORTANTE!! AL parecer el error que me comento el profe venia del id de este metodo
//public buscarEditarTipDoc(id) asi estaba... y esto provoca errores de copilacion
//la verdad nose pero tengo sospecha de que sea la version de angular inestable o el visual studio code
    var filtoEvalor = this.ActualizarATipDoc.getRawValue()['ActualizarIdipDoc'];
    //console.log("iServicio 43 " + filtoEvalor + " ID " + id );

    this.servi.getTipDoc('/' + filtoEvalor).subscribe((data: {}) => {

      this.MiTipDocE = data;

      //console.log(" 44" + this.MiTipDocE[0].color)

    }, error => { console.log(error) });
    this.titloTipDocEditar = "TIPO DOCUMENDO A EDITAR";

  }
  
  //--------------------------------------------------------------

  public ActualizarTipDoc() {


    console.log("Actualiza tipdoc asdsadasdsa") //ES PARA VER SI HAY UN PROBLEMA
    var textIdTipDoc = this.ActualizarATipDoc.getRawValue()['ActualizarIdipDoc'];
    //console.log("  45 " + textIdTipDoc);
    var nuevoTipDoc = this.ActualizarATipDoc.getRawValue()['nuevoTipDoc'];
    var nuevotip;
    nuevotip=(document.getElementById('palo1') as HTMLInputElement).value; //parese que esta es la solucion del editar
    //console.log("   la 46 " + nuevoTipDoc);
  //  var nuevoIniTipDoc = this.ActualizarATipDoc.getRawValue()['nuevoIniTipDoc'];
    //console.log("   la 47 " + nuevoIniTipDoc);
//alert("toca este "+nuevotip);
    var cadena = { "id_tipo_identificacion": textIdTipDoc,"nombre_tipo_identificacion":nuevotip};
    //console.log("tales 48  " + cadena.id_tip_doc + " - " + cadena.tipo_documento + " - " +  cadena.iniciales_tip_doc)

    this.servi.updateTipDoc(cadena).then
      (
        res => {
          console.log("res",res)
        }
      ).catch(err => {
        console.log(err)
      })
  } 




 //SIEMPRE COLOCAR ESTA PLANTILLA, PORQUE NECESITO SABER DONDE INICIA LOS METODOS HTML DE ESTA CLASE
 //SOLO SON LAS FUNCIONES DE ESTAS CLASES
 //MUCHO CUIDADO AL COPIAR Y PEGAR, LOS VECTORES EN ANGULAR SON DELICADOS PARA SER RECONOCIDOS POR CODIGO

  //=============================================================
  //LAS FUNCIONES PARA LLAMARLAS DESDE EL HTML
  //=============================================================  
  ngOnInit() {

    this.filtrarTipDoc = this.formBuilder.group(
    {
      textfiltro: []
    }); 
    this.formBuilder.group

    this.InsertarGTipDoc = this.formBuilder.group(
    {
      textTipDoc: [],
      textiniTipDoc: []
    });
    this.formBuilder.group

    this.ActualizarATipDoc = this.formBuilder.group(
    {
      ActualizarIdipDoc: [], 
      nuevoTipDoc: [], 
      nuevoIniTipDoc: [], 
      palo1 : []
 
    });
    this.formBuilder.group
  }


}
