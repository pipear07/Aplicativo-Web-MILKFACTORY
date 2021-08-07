import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
//se importa el servicio 
import { ElservicioService } from '../elservicio.service'; //ES UNICO E IRREMPLAZABLE
//archivos del componente

@Component({
  selector: 'app-raza',
  templateUrl: './raza.component.html',
  styleUrls: ['./raza.component.css']
})
export class RazaComponent implements OnInit {
  title ="Razas Vacas";
  //Variables para los titulos de las secciones
  tituloRazavacas = "";
  titloRazavaca = "";
  titloRazaVacaEditar = "";
  //Variables arreglos para mostrar los registros
  RazaVacas: any = [];
  MiRazaVaca: any = [];
  MiRazaVacaE: any = [];

  FiltrarRazaVaca: FormGroup;
  InsertarGRazaVaca: FormGroup;
  ActualizarARazaVaca: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private servi: ElservicioService,
    router: Router ) { }
    //=============================================================
  //LOS CRUL
  //=============================================================
  ConsultarRazaVacas(){
    this.servi.getRazaVacas().subscribe((data: {razavaca: []})=>{this.RazaVacas = data;},
              error => {console.error(error + " ")});
    this.tituloRazavacas = "Razas Vacas";    
  }
  //-------------------------------------------------------------------------//

  public buscarRazavaca(){
    var filtovalor = this.FiltrarRazaVaca.getRawValue()['textfiltro'];

    this.servi.getRazaVaca('/' + filtovalor).subscribe((data: {}) => {this.MiRazaVaca = data},
                error => {console.log(error)});
               
    this.titloRazavaca = "Raza Vaca Seleccionada";                  
  }

  //--------------------------------------------------------------

public InsertarRazavaca() {
  //console.log("31  Inserta");

  var datosvalo2 = this.InsertarGRazaVaca.getRawValue()['textnombre_raza'];
  var datosvalo3 = this.InsertarGRazaVaca.getRawValue()['textdescripcion'];
  
 //console.log("Td", datosvalo2,datosvalo3)

  var cadena = {"nombre_raza":datosvalo2,"descripcion": datosvalo3};
  
  //console.log(" 39 " + cadena);

  this.servi.insertRazavaca(cadena).then(res => {console.log(res)}).catch(err => 
    {console.log(err)});
}

//--------------------------------------------------------------

public buscarEditarRazavaca() {
//IMPORTANTE!! AL parecer el error que me comento el profe venia del id de este metodo
//public buscarEditarTipDoc(id) asi estaba... y esto provoca errores de copilacion
//la verdad nose pero tengo sospecha de que sea la version de angular inestable o el visual studio code
var filtoEvalor = this.ActualizarARazaVaca.getRawValue()['ActualizarIdRaza'];
//console.log("iServicio 43 " + filtoEvalor + " ID " + id );

this.servi.getRazaVaca('/' + filtoEvalor).subscribe((data: {}) => {

  this.MiRazaVacaE = data;

  //console.log(" 44" + this.MiTipDocE[0].color)

}, error => { console.log(error) });
this.titloRazaVacaEditar = "raza a editar";

}

//--------------------------------------------------------------

public ActualizarRazavaca() {

  var textIdRaza = this.ActualizarARazaVaca.getRawValue()['ActualizarIdRaza'];
  //console.log("  45 " + textIdTipDoc);
  var nuevaRaza = this.ActualizarARazaVaca.getRawValue()['nuevaRaza'];
  //console.log("   la 46 " + nuevoTipDoc);
 var nuevadescripcion = this.ActualizarARazaVaca.getRawValue()['nuevadescripcion'];
  //console.log("   la 47 " + nuevoIniTipDoc);

  var cadena = { "id_raza": textIdRaza,"nombre_raza":nuevaRaza, "descripcion": nuevadescripcion};
  //console.log("tales 48  " + cadena.id_tip_doc + " - " + cadena.tipo_documento + " - " +  cadena.iniciales_tip_doc)

  this.servi.updateRazavaca(cadena).then
    (
      res => {
        console.log("res",res)
      }
    ).catch(err => {
      console.log(err)
    })
} 

  ngOnInit() {
    this.FiltrarRazaVaca = this.formBuilder.group(
      {
        textfiltro: []
      });
      this.formBuilder.group

     this.InsertarGRazaVaca = this.formBuilder.group(
       {
        textnombre_raza: [], 
        textdescripcion: []
       });
       this.formBuilder.group
 
       this.ActualizarARazaVaca = this.formBuilder.group(
         {
            ActualizarIdRaza: [],
            nuevaRaza: [],
            nuevadescripcion: []
         });
         this.formBuilder.group
  }

}
