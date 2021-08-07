import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

//se importa el servicio
import { ElservicioService } from '../elservicio.service'; //ES UNICO E IRREMPLAZABLE
import { toDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  title = "PROYECTO DE EMPLEADOS";  

  //Variables para los titulos de las secciones
  tituloEmpleados = "";
  titloEmpleado = "";  //AQUI INICIALIZA LAS VARIABLES
  titloEmpleadoEditar = "";


  //variables arreglos para mostrar los registros
  Empleados: any = [];
  Documentos: any = [];
  Rol: any = [];
  MiEmpleado: any = []; //ESTOS SON DECLARACIONES DE VECTORES
  MiEmpleadoE: any = [];
  


  filtrarEmpleado: FormGroup;
  InsertarGEmpleado: FormGroup;  //LOS GRUPOS DE VECTORES
  ActualizarAEmpleado: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private servi: ElservicioService,  //SIEMPRE VA ASI... TOCA AÑADIRLE CRUL AL SERVICIO PARA QUE FUNCIONE POR CLASE
    Router: Router ) { }
   
     //=============================================================
  //LOS CRUL
  //=============================================================

  consultaEmpleados() {
    //console.log("22");
    
    this.servi.getEmpleados().subscribe((data: {empleado: []}) => {this.Empleados = data;},
                   error => {console.error(error + " ")});

    this.tituloEmpleados = "LISTA DE EMPLEADOS"; 
    
   // console.log("23");
  }

  //--------------------------------------------------------------

  public buscarEmpleados() {

    var filtovalor = this.filtrarEmpleado.getRawValue()['textfiltro'];

    this.servi.getEmpleado('/' + filtovalor).subscribe((data: {}) => {this.MiEmpleado = data;},
                              error => {console.log(error)});

    this.titloEmpleado = "DETALLE DEL EMPLEADO SELECIONADO";
  }

  //--------------------------------------------------------------
  public InsertarEmpleados() {
    //console.log("31  Inserta");
try{

  var datosvalo2 = this.InsertarGEmpleado.getRawValue()['textnombre_rol'];
  var datosvalo3 = this.InsertarGEmpleado.getRawValue()['textnombre_tipo_identificacion'];
  var datosvalo4 = this.InsertarGEmpleado.getRawValue()['textprimer_nombre'];
  var datosvalo5 = this.InsertarGEmpleado.getRawValue()['textsegundo_nombre'];
  var datosvalo6 = this.InsertarGEmpleado.getRawValue()['textprimer_apellido'];
  var datosvalo7 = this.InsertarGEmpleado.getRawValue()['textsegundo_apellido'];
  var datosvalo8 = this.InsertarGEmpleado.getRawValue()['textnum_identificacion'];
  var datosvalo9 = this.InsertarGEmpleado.getRawValue()['textcorreo_electronico'];
  var datosvalo10 = this.InsertarGEmpleado.getRawValue()['textactivo'];
  var datosvalo11 = this.InsertarGEmpleado.getRawValue()['textfecha_registro'];

  
  
  var cadena = {"id_rol":datosvalo2,"id_tipo_identificacion":datosvalo3,"primer_nombre":datosvalo4,"segundo_nombre":datosvalo5,"primer_apellido":datosvalo6,"segundo_apellido":datosvalo7,"num_identificacion":datosvalo8,"correo_electronico":datosvalo9,"activo":datosvalo10,"fecha_registro":datosvalo11};

  this.servi.insertEmpleado(cadena).then(res => {console.log(res)}).catch(err => 
    {console.log(err)});




    alert("Registro insertado con exito");
}catch(exception_error){

  alert("Hubo un error en el registro "+exception_error);
}

  }


  //--------------------------------------------------------------


  //--------------------------------------------------------------

 public buscarEditarEmpleados() {
  //IMPORTANTE!! AL parecer el error que me comento el profe venia del id de este metodo
//public buscarEditarInsumoLeche(id) asi estaba... y esto provoca errores de copilacion
//la verdad nose pero tengo sospecha de que sea la version de angular inestable o el visual studio code
  var filtoEvalor = this.ActualizarAEmpleado.getRawValue()['id_empleado'];
  //console.log("iServicio 43 " + filtoEvalor + " ID " + id );

  this.servi.getEmpleado('/' + filtoEvalor).subscribe((data: {}) => {

    this.MiEmpleadoE = data;

    //console.log(" 44" + this.MiInsumoLecheE[0].color)

  }, error => { console.log(error) });

 //ojo con esto
 this.servi.getEmpleados().subscribe((data: {empleado: []}) => {this.Empleados = data;},
 error => {console.error(error + " ")});
 this.servi.getRolxEmpleado().subscribe((data: {drol: []}) => {this.Rol = data;},
 error => {console.error(error + " ")}); //Con este se crean las listan desplegables
 this.servi.getDocumentosxEmpleado().subscribe((data: {ddocumento: []}) => {this.Documentos = data;},
 error => {console.error(error + " ")}); //Con este se crean las listan desplegables
 
  this.titloEmpleadoEditar = "DETALLE DE LOS EMPLEADOS A EDITAR A EDITAR";

 
}

//--------------------------------------------------------------


public ActualizarEmpleado() {


  console.log("Actualiza empleado asdsadasdsa") //ES PARA VER SI HAY UN PROBLEMA
  var textIdEmpleado = this.ActualizarAEmpleado.getRawValue()['id_empleado'];
  
  
  var datosvaloid_rol = this.ActualizarAEmpleado.getRawValue()['nuevoid_rol'];
  var datosvaloid_tipo_identificacion = this.ActualizarAEmpleado.getRawValue()['nuevoid_tipo_identificacion'];
  var primer_nombre = (document.getElementById('primer_nombre') as HTMLInputElement).value;
  var segundo_nombre = (document.getElementById('segundo_nombre') as HTMLInputElement).value;
  var primer_apellido = (document.getElementById('primer_apellido') as HTMLInputElement).value;
  var segundo_apellido = (document.getElementById('segundo_apellido') as HTMLInputElement).value;
  var num_identificacion = (document.getElementById('num_identificacion') as HTMLInputElement).value;
  var correo_electronico = (document.getElementById('correo_electronico') as HTMLInputElement).value;
  var activo = (document.getElementById('activo') as HTMLInputElement).value;
  var fecha_registro = (document.getElementById('fecha_registro') as HTMLInputElement).value;

  

  //console.log("   la 46 " + nuevoTipDoc);
//  var nuevoIniTipDoc = this.ActualizarATipDoc.getRawValue()['nuevoIniTipDoc'];
  //console.log("   la 47 " + nuevoIniTipDoc);
//alert("toca este "+nuevotip);
  var  cadena2 = primer_nombre + " " + segundo_nombre + " " + primer_apellido + " " + segundo_apellido; 
  var cadena = { "id_empleado": textIdEmpleado,"id_rol": datosvaloid_rol, "id_tipo_identificacion": datosvaloid_tipo_identificacion, "primer_nombre": primer_nombre, "segundo_nombre": segundo_nombre, "primer_apellido": primer_apellido, "segundo_apellido": segundo_apellido, "num_identificacion": num_identificacion, "correo_electronico": correo_electronico, "activo": activo, "fecha_registro": fecha_registro};
  //console.log("tales 48  " + cadena.id_tip_doc + " - " + cadena.tipo_documento + " - " +  cadena.iniciales_tip_doc)

  this.servi.updateEmpleado(cadena).then
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
    this.filtrarEmpleado = this.formBuilder.group(
      {
        textfiltro: []
      }); 
      this.formBuilder.group

      this.InsertarGEmpleado = this.formBuilder.group(
        {
          textnombre_rol: [],
          textnombre_tipo_identificacion: [],
          textprimer_nombre: [],
          textsegundo_nombre: [],
          textprimer_apellido: [],
          textsegundo_apellido: [],
          textnum_identificacion: [],
          textcorreo_electronico: [],
          textactivo: [],
          textfecha_registro: []
         
        });
        this.formBuilder.group


        this.ActualizarAEmpleado = this.formBuilder.group(
          {
            id_empleado: [], 
            nuevonombre_rol: [],
            nuevoid_rol:[],
            nuevoid_tipo_identificacion:[],
            nuevonombre_tipo_identificacion: [],
            nuevoprimer_nombre: [],
            nuevosegundo_nombre: [],
            nuevoprimer_apellido: [],
            nuevosegundo_apellido: [],
            nuevonum_identificacion: [],
            nuevocorreo_electronico: [],
            nuevofecha_registro: []
       
          });
          this.formBuilder.group

  }

}
