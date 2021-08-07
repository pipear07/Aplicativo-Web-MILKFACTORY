import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { ElservicioService } from '../elservicio.service'; //ES UNICO E IRREMPLAZABLE


@Component({
  selector: 'app-vacas',
  templateUrl: './vacas.component.html',
  styleUrls: ['./vacas.component.css']
})
export class VacasComponent implements OnInit {
  title = "Vacas";

  tituloVacas = "";
  titloVaca = "";
  titloVacaEditar = "";

  Vacas: any = [];
  MiVaca: any = [];
  MiVacaE: any = [];
  Raza: any = [];

  FiltrarVaca: FormGroup;
  InsertarGVaca: FormGroup;
  ActualizarAVaca: FormGroup;
  constructor( 
    private formBuilder: FormBuilder,
    private servi: ElservicioService,
    router: Router ) { }

    //=============================================================
  //LOS CRUL
  //=============================================================
  ConsultarVacas(){
    this.servi.getVacas().subscribe((data: {vaca: []})=>{this.Vacas = data;},
                error => {console.error(error + " ")});
    this.tituloVacas = "Vacas";
  }
  //-------------------------------------------------------------------------//

  public buscarVaca(){
    var filtovalor = this.FiltrarVaca.getRawValue()['textfiltro'];

    this.servi.getVaca('/' + filtovalor).subscribe((data: {}) => {this.MiVaca = data},
                error => {console.log(error)});
               
    this.titloVaca = "Vaca Seleccionada";                  
  }

  
  //--------------------------------------------------------------

public InsertarVaca() {
  //console.log("31  Inserta");

  var datosvalo1 = this.InsertarGVaca.getRawValue()['textid_raza'];
  var datosvalo2 = this.InsertarGVaca.getRawValue()['textcodigo_vaca'];
  var datosvalo3 = this.InsertarGVaca.getRawValue()['textfecha_registro'];
  var datosvalo4 = this.InsertarGVaca.getRawValue()['textfecha_nacimiento'];
  
 //console.log("Td", datosvalo2,datosvalo3)

  var cadena = {"id_raza":datosvalo1,"codigo_vaca": datosvalo2,"fecha_registro": datosvalo3,"fecha_nacimiento": datosvalo4};
  
  //console.log(" 39 " + cadena);

  this.servi.insertVaca(cadena).then(res => {console.log(res)}).catch(err => 
    {console.log(err)});
}

 //--------------------------------------------------------------

public buscarEditarVaca() {
//IMPORTANTE!! AL parecer el error que me comento el profe venia del id de este metodo
//public buscarEditarTipDoc(id) asi estaba... y esto provoca errores de copilacion
//la verdad nose pero tengo sospecha de que sea la version de angular inestable o el visual studio code
var filtoEvalor = this.ActualizarAVaca.getRawValue()['idVaca'];
//console.log("iServicio 43 " + filtoEvalor + " ID " + id );

this.servi.getVaca('/' + filtoEvalor).subscribe((data: {}) => {

  this.MiVacaE = data;

  //console.log(" 44" + this.MiTipDocE[0].color)

}, error => { console.log(error) });

this.servi.getRazaVacas().subscribe((data: {razavaca: []})=>{this.Raza = data;},
            error => {console.error(error + " ")});

this.titloVacaEditar = "vaca a editar";

}

//--------------------------------------------------------------

public ActualizarVaca() {

  var textidvaca = this.ActualizarAVaca.getRawValue()['idVaca'];

  var beta1 = (document.getElementById('codigovaca') as HTMLInputElement).value;
  var beta2 = (document.getElementById('fecharegistro') as HTMLInputElement).value;
  var beta3 = (document.getElementById('fechanacimiento') as HTMLInputElement).value;

  var dato2 = this.ActualizarAVaca.getRawValue()['Ncodigovaca'];
  var dato3 = this.ActualizarAVaca.getRawValue()['Nfecharegistro'];
  var dato4 = this.ActualizarAVaca.getRawValue()['Nfechanacimiento'];
  var dato1 = this.ActualizarAVaca.getRawValue()['nuevoid_raza'];
  var cadena = {"id_vaca": textidvaca,"id_raza": dato1,"codigo_vaca":dato2, "fecha_registro": beta2,"fecha_nacimiento":beta3};
  //console.log("tales 48  " + cadena.id_tip_doc + " - " + cadena.tipo_documento + " - " +  cadena.iniciales_tip_doc)
  alert("valor codigo"+dato2);
  this.servi.updateVaca(cadena).then
    (
      res => {
        console.log("res",res)
      }
    ).catch(err => {
      console.log(err)
    })
} 

  ngOnInit() {
    this.FiltrarVaca = this.formBuilder.group(
      {
        textfiltro: []
      });
      this.formBuilder.group

      this.InsertarGVaca = this.formBuilder.group(
      {
        textid_raza: [],
        textcodigo_vaca: [],
        textfecha_registro: [],
        textfecha_nacimiento: []
        
      });

      
      this.ActualizarAVaca = this.formBuilder.group(
        {
          idVaca: [],
          nuevoid_raza: [],
          Ncodigovaca: [],
          Nfecharegistro: [],
          Nfechanacimiento: []
        });
        this.formBuilder.group
  }

}
