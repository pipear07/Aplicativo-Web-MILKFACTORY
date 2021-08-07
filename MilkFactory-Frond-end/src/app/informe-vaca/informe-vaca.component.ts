import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

//se importa el servicio
import { ElservicioService } from '../elservicio.service'; //ES UNICO E IRREMPLAZABLE
import { toDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-informe-vaca',
  templateUrl: './informe-vaca.component.html',
  styleUrls: ['./informe-vaca.component.css']
})
export class InformeVacaComponent implements OnInit {
  title = "informe de produccion por vaca";

  MiDInformes: any = [];
  Vaca: any =[];
  titloInforme = [];
  filtrarInformeVaca: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private servi: ElservicioService,  //SIEMPRE VA ASI... TOCA AÑADIRLE CRUL AL SERVICIO PARA QUE FUNCIONE POR CLASE
    Router: Router) { }
     //--------------------------------------------------------------
     public buscarInformeVaca() {
      //IMPORTANTE!! AL parecer el error que me comento el profe venia del id de este metodo
    //public buscarEditarTipDoc(id) asi estaba... y esto provoca errores de copilacion
    //la verdad nose pero tengo sospecha de que sea la version de angular inestable o el visual studio code
      var filtoEvalor = this.filtrarInformeVaca.getRawValue()['textinfovaca1'];
      var filtoEvalor2 = this.filtrarInformeVaca.getRawValue()['textinfovaca2'];
      var filtoEvalor3 = this.filtrarInformeVaca.getRawValue()['textinfovaca3'];
    
     // var cadena = {"id_empleado":filtoEvalor2,"feinicio":filtoEvalor2,"fechafin":filtoEvalor3};
      console.log("iServicio 43 " + filtoEvalor + " filtroEvalor2 " + filtoEvalor2+ " filtroEvalor3 " + filtoEvalor3 );
    
      this.servi.getDProduccionxVaca('/' + filtoEvalor,'/' + filtoEvalor2,'/' + filtoEvalor3).subscribe((data: {}) => {this.MiDInformes = data;
    console.log("100");
    
    this.servi.getVacasxProduccionesInformes().subscribe((data: {dvacas: []}) => {this.Vaca = data;},
                       error => {console.error(error + " ")}); //Con este se crean las listan desplegables
    
        //console.log(" 44" + this.MiTipDocE[0].color)
    
      }, error => { console.log(error);
        console.log("probando");
      });
     // this.titloTipDocEditar = "TIPO DOCUMENDO A EDITAR";
    
    }
    
    

  ngOnInit() {
    this.filtrarInformeVaca= this.formBuilder.group(
      {
        textinfovaca1: [], 
        textinfovaca2: [], 
        textinfovaca3: []
      
   
      });
      this.formBuilder.group
  }

}
