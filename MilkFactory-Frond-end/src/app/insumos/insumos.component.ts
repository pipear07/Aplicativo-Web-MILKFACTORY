import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { ElservicioService } from '../elservicio.service'; //ES UNICO E IRREMPLAZABLE

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements OnInit {
  
  //REVISAR TAMBIEN EL app.module.ts TAMBIEN HAY QUE MODIFICAR
//Y REVISAR EL menu-inicio PARA AÑADIR EL FRONT END DE SUS TABLAS CUANDO TERMINEN

title = "INSUMOS DE LECHE";

//Variables para los titulos de las secciones
tituloInsumosLeche = "";
titloInsumoLeche = "";  //AQUI INICIALIZA LAS VARIABLES
titloInsumoLecheEditar = "";

//variables arreglos para mostrar los registros
InsumosLeche: any = [];
MiInsumoLeche: any = []; //ESTOS SON DECLARACIONES DE VECTORES
MiInsumoLecheE: any = [];

filtrarInsumoLeche: FormGroup;
InsertarGInsumoLeche: FormGroup;  //LOS GRUPOS DE VECTORES
ActualizarAInsumoLeche: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private servi: ElservicioService,  //SIEMPRE VA ASI... TOCA AÑADIRLE CRUL AL SERVICIO PARA QUE FUNCIONE POR CLASE
    Router: Router) { }
    
//=============================================================
  //LOS CRUL
  //=============================================================

  consultaInsumosLeche() {
    //console.log("22");
    
    this.servi.getInsumoLeche().subscribe((data: {insumoleche: []}) => {this.InsumosLeche = data;},
                   error => {console.error(error + " ")});

    this.tituloInsumosLeche = "LISTA DE INSUMOS DE LECHE"; 
    
   // console.log("23");
  }  

    //--------------------------------------------------------------

    public buscarInsumosLeche() {

      var filtovalor = this.filtrarInsumoLeche.getRawValue()['textfiltro'];
  
      this.servi.getInsumosLeche('/' + filtovalor).subscribe((data: {}) => {this.MiInsumoLeche = data;},
                                error => {console.log(error)});
  
      this.titloInsumoLeche = "TIPO DE INSUMO DE LECHE SELECIONADO";
    }

    //--------------------------------------------------------------

    public InsertarInsumosLeche() {
      //console.log("31  Inserta");
  try{
  
    var datosvalo2 = this.InsertarGInsumoLeche.getRawValue()['textdescripcion'];
    var datosvalo3 = this.InsertarGInsumoLeche.getRawValue()['textNombreInsumo'];
    var datosvalo4 = this.InsertarGInsumoLeche.getRawValue()['textfecha_suministro'];
    var datosvalo5 = this.InsertarGInsumoLeche.getRawValue()['textcantidadtotal'];
    var datosvalo6 = this.InsertarGInsumoLeche.getRawValue()['textcantidaddisponible'];
       
    
     // let inputValue = (document.getElementById('total') as HTMLInputElement).value;
  
    var cadena = {"descripcion":datosvalo2,"NombreInsumo":datosvalo3,"fecha_suministro":datosvalo4,"cantidadtotal":datosvalo5,"cantidaddisponible":datosvalo6};
  
    this.servi.insertInsumoLeche(cadena).then(res => {console.log(res)}).catch(err => 
      {console.log(err)});
  
  
  
  
      alert("Registro insertado con exito");
  }catch(exception_error){
  
    alert("Hubo un error en el registro "+exception_error);
  }
  
    }
  
  //--------------------------------------------------------------

  //--------------------------------------------------------------

 public buscarEditarInsumosLeche() {
  //IMPORTANTE!! AL parecer el error que me comento el profe venia del id de este metodo
//public buscarEditarInsumoLeche(id) asi estaba... y esto provoca errores de copilacion
//la verdad nose pero tengo sospecha de que sea la version de angular inestable o el visual studio code
  var filtoEvalor = this.ActualizarAInsumoLeche.getRawValue()['id_insumo'];
  //console.log("iServicio 43 " + filtoEvalor + " ID " + id );

  this.servi.getInsumosLeche('/' + filtoEvalor).subscribe((data: {}) => {

    this.MiInsumoLecheE = data;

    //console.log(" 44" + this.MiInsumoLecheE[0].color)

  }, error => { console.log(error) });


  this.titloInsumoLecheEditar = "DETALLE DE LOS INSUMOS DE LECHE A EDITAR";

}

//--------------------------------------------------------------


public ActualizarInsumoLeche() {


  console.log("Actualiza insumoleche asdsadasdsa") //ES PARA VER SI HAY UN PROBLEMA
  var textIdInsumoLeche = this.ActualizarAInsumoLeche.getRawValue()['id_insumo'];

  var descripcion = (document.getElementById('descripcion') as HTMLInputElement).value;
  var NombreInsumo = (document.getElementById('NombreInsumo') as HTMLInputElement).value;
  var fecha_suministro = (document.getElementById('fecha_suministro') as HTMLInputElement).value;
  var cantidadtotal = (document.getElementById('cantidadtotal') as HTMLInputElement).value;
  var cantidaddisponible = (document.getElementById('cantidaddisponible') as HTMLInputElement).value;

  

  //console.log("   la 46 " + nuevoTipDoc);
//  var nuevoIniTipDoc = this.ActualizarATipDoc.getRawValue()['nuevoIniTipDoc'];
  //console.log("   la 47 " + nuevoIniTipDoc);
//alert("toca este "+nuevotip);
  var cadena = { "id_insumo": textIdInsumoLeche,"descripcion": descripcion, "NombreInsumo": NombreInsumo, "fecha_suministro": fecha_suministro, "cantidadtotal": cantidadtotal, "cantidaddisponible": cantidaddisponible};
  //console.log("tales 48  " + cadena.id_tip_doc + " - " + cadena.tipo_documento + " - " +  cadena.iniciales_tip_doc)

  this.servi.updateInsumoLeche(cadena).then
    (
      res => {
        console.log("res",res)
      }
    ).catch(err => {
      console.log(err)
    })
} 


 //--------------------------------------------------------------


   //SIEMPRE COLOCAR ESTA PLANTILLA, PORQUE NECESITO SABER DONDE INICIA LOS METODOS HTML DE ESTA CLASE
 //SOLO SON LAS FUNCIONES DE ESTAS CLASES
 //MUCHO CUIDADO AL COPIAR Y PEGAR, LOS VECTORES EN ANGULAR SON DELICADOS PARA SER RECONOCIDOS POR CODIGO

  //=============================================================
  //LAS FUNCIONES PARA LLAMARLAS DESDE EL HTML
  //=============================================================  


  ngOnInit() {
    this.filtrarInsumoLeche = this.formBuilder.group(
      {
        textfiltro: []
      }); 
      this.formBuilder.group

      this.InsertarGInsumoLeche = this.formBuilder.group(
        {
          textdescripcion: [],
          textNombreInsumo: [],
          textfecha_suministro: [],
          textcantidadtotal: [],
          textcantidaddisponible: []
         
        });
        this.formBuilder.group


        this.ActualizarAInsumoLeche = this.formBuilder.group(
          {
            id_insumo: [], 
            nuevodescripcion: [],
            nuevoNombreInsumo: [],
            nuevofecha_suministro: [],
            nuevocantidadtotal: [],
            nuevocantidaddisponible: []
       
          });
          this.formBuilder.group

  }
  

}
