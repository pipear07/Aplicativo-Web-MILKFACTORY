//Importación de las librerias
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

//se importa el servicio
import { ElservicioService } from '../elservicio.service'; //ES UNICO E IRREMPLAZABLE
import { toDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-informe-empleado',
  templateUrl: './informe-empleado.component.html',
  styleUrls: ['./informe-empleado.component.css']
})
export class InformeEmpleadoComponent implements OnInit {

  title = "Informe de Produccion por Empleado";


  MiDInformes: any = []; //ESTOS SON DECLARACIONES DE VECTORES
  Empleados: any =[];
  titloInforme = "";  //AQUI INICIALIZA LAS VARIABLES
  filtrarInformeempleado: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private servi: ElservicioService,  //SIEMPRE VA ASI... TOCA AÑADIRLE CRUL AL SERVICIO PARA QUE FUNCIONE POR CLASE
    Router: Router) { }


  //--------------------------------------------------------------


  //--------------------------------------------------------------

 public buscarInforme() {
  //IMPORTANTE!! AL parecer el error que me comento el profe venia del id de este metodo
//public buscarEditarTipDoc(id) asi estaba... y esto provoca errores de copilacion
//la verdad nose pero tengo sospecha de que sea la version de angular inestable o el visual studio code
  var filtoEvalor = this.filtrarInformeempleado.getRawValue()['textinforme'];
  var filtoEvalor2 = this.filtrarInformeempleado.getRawValue()['textinforme2'];
  var filtoEvalor3 = this.filtrarInformeempleado.getRawValue()['textinforme3'];

 // var cadena = {"id_empleado":filtoEvalor2,"feinicio":filtoEvalor2,"fechafin":filtoEvalor3};
  console.log("iServicio 43 " + filtoEvalor + " filtroEvalor2 " + filtoEvalor2+ " filtroEvalor3 " + filtoEvalor3 );

  this.servi.getDProduccionxEmpleado('/' + filtoEvalor,'/' + filtoEvalor2,'/' + filtoEvalor3).subscribe((data: {}) => {this.MiDInformes = data;
console.log("100");

this.servi.getEmpleadoxProduccionesInformes().subscribe((data: {dempleado: []}) => {this.Empleados = data;},
                   error => {console.error(error + " ")}); //Con este se crean las listan desplegables

    //console.log(" 44" + this.MiTipDocE[0].color)

  }, error => { console.log(error);
    console.log("probando");
  });
 // this.titloTipDocEditar = "TIPO DOCUMENDO A EDITAR";

}



 //=============================================================
  //LAS FUNCIONES PARA LLAMARLAS DESDE EL HTML
  //=============================================================  
  ngOnInit() {

   

    this.filtrarInformeempleado = this.formBuilder.group(
    {
      textinforme: [], 
      textinforme2: [], 
      textinforme3: []
    
 
    });
    this.formBuilder.group
  }


}
