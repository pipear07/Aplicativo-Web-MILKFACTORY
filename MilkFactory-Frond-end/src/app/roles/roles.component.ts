import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { ElservicioService } from '../elservicio.service'; //ES UNICO E IRREMPLAZABLE

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
 //REVISAR TAMBIEN EL app.module.ts TAMBIEN HAY QUE MODIFICAR
  //Y REVISAR EL menu-inicio PARA AÑADIR EL FRONT END DE SUS TABLAS CUANDO TERMINEN

  title = "ROLES";

  //Variables para los titulos de las secciones
  tituloRoles = "";
  titloRol = "";  //AQUI INICIALIZA LAS VARIABLES
  titloRolEditar = "";

  //variables arreglos para mostrar los registros
  Roles: any = [];
  MiRol: any = []; //ESTOS SON DECLARACIONES DE VECTORES
  MiRolE: any = [];

  filtrarRol: FormGroup;
  InsertarGRol: FormGroup;  //LOS GRUPOS DE VECTORES
  ActualizarARol: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private servi: ElservicioService,  //SIEMPRE VA ASI... TOCA AÑADIRLE CRUL AL SERVICIO PARA QUE FUNCIONE POR CLASE
    Router: Router) { }

  //=============================================================
  //LOS CRUL
  //=============================================================

  consultaRoles() {
    //console.log("22");

    this.servi.getRoles().subscribe((data: { rol: [] }) => { this.Roles = data; },
      error => { console.error(error + " ") });

    this.tituloRoles = "LISTA DE ROLES";

    // console.log("23");
  }

  //--------------------------------------------------------------

  public buscarRoles() {

    var filtovalor = this.filtrarRol.getRawValue()['textfiltro'];

    this.servi.getRol('/' + filtovalor).subscribe((data: {}) => { this.MiRol = data; },
      error => { console.log(error) });

    this.titloRol = "TIPO DE ROL SELECIONADO";
  }

  //--------------------------------------------------------------

  public InsertarRol() {
    //console.log("31  Inserta");
    try {
      var datosvalo2 = this.InsertarGRol.getRawValue()['textRol'];
      // var datosvalo3 = this.InsertarGRol.getRawValue()['textiniRol'];

      //console.log("Td", datosvalo2,datosvalo3)

      var cadena = { "nombre_rol": datosvalo2 };

      //console.log(" 39 " + cadena);

      this.servi.insertRol(cadena).then(res => { console.log(res) }).catch(err => { console.log(err) });

      alert("Registro insertado con exito");
    } catch (exception_error) {

      alert("Hubo un error en el registro " + exception_error);
    }

  }



  //--------------------------------------------------------------

  public buscarEditarRol() {
    //IMPORTANTE!! AL parecer el error que me comento el profe venia del id de este metodo
    //public buscarEditarRol(id) asi estaba... y esto provoca errores de copilacion
    //la verdad nose pero tengo sospecha de que sea la version de angular inestable o el visual studio code
    var filtoEvalor = this.ActualizarARol.getRawValue()['ActualizarIdRol'];
    //console.log("iServicio 43 " + filtoEvalor + " ID " + id );

    this.servi.getRol('/' + filtoEvalor).subscribe((data: {}) => {

      this.MiRolE = data;

      //console.log(" 44" + this.MiRolE[0].color)

    }, error => { console.log(error) });
    this.titloRolEditar = "ROL A EDITAR";

  }

  //--------------------------------------------------------------

  public ActualizarRol() {


    console.log("Actualiza rol asdsadasdsa") //ES PARA VER SI HAY UN PROBLEMA
    var textIdRol = this.ActualizarARol.getRawValue()['ActualizarIdRol'];
    //console.log("  45 " + textIdRol);
    var nuevoRol = this.ActualizarARol.getRawValue()['nuevoRol'];
    var nuevotip;
    nuevotip = (document.getElementById('palo1') as HTMLInputElement).value; //parese que esta es la solucion del editar
    //console.log("   la 46 " + nuevoRol);
    //  var nuevoIniRol= this.ActualizarARol.getRawValue()['nuevoIniRol'];
    //console.log("   la 47 " + nuevoIniRol);
    //alert("toca este "+nuevotip);
    var cadena = { "id_rol": textIdRol, "nombre_rol": nuevotip };
    //console.log("tales 48  " + cadena.id_rol + " - " + cadena.nombre_rol + " - " +  cadena.iniciales_nombre_rol)

    this.servi.updateRol(cadena).then
      (
        res => {
          console.log("res", res)
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

    this.filtrarRol = this.formBuilder.group(
      {
        textfiltro: []
      });
    this.formBuilder.group

    this.InsertarGRol = this.formBuilder.group(
      {
        textRol: [],
        textiniRol: []
      });
    this.formBuilder.group

    this.ActualizarARol = this.formBuilder.group(
      {
        ActualizarIdRol: [],
        nuevoRol: [],
        nuevoIniRol: [],
        palo1: []

      });
    this.formBuilder.group
  }

}
