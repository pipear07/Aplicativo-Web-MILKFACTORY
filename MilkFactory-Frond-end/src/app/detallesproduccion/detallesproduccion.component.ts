//Importación de las librerias
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

//se importa el servicio
import { ElservicioService } from '../elservicio.service'; //ES UNICO E IRREMPLAZABLE
import { toDate } from '@angular/common/src/i18n/format_date';

//Archivos del actual componente
@Component({
  selector: 'app-detallesproduccion',
  templateUrl: './detallesproduccion.component.html',
  styleUrls: ['./detallesproduccion.component.css']
})

export class DetallesproduccionComponent implements OnInit {

  title = "PROYECTO DE DETALLES DE PRODUCCION";


  //Variables para los titulos de las secciones
  tituloDProduccion = "";
  titloDProduccion = "";  //AQUI INICIALIZA LAS VARIABLES
  titloDProduccionEditar = "";


  //variables arreglos para mostrar los registros
  DProducciones: any = [];
  Empleados: any = [];
  Vaca: any = [];
  Insumo: any = [];
  MiDProducciones: any = []; //ESTOS SON DECLARACIONES DE VECTORES
  MiDProduccionesE: any = [];
  


  filtrarDProduccion: FormGroup;
  InsertarGDProduccion: FormGroup;  //LOS GRUPOS DE VECTORES
  ActualizarADProduccion: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private servi: ElservicioService,  //SIEMPRE VA ASI... TOCA AÑADIRLE CRUL AL SERVICIO PARA QUE FUNCIONE POR CLASE
    Router: Router) { }


     //=============================================================
  //LOS CRUL
  //=============================================================

   consultadetallesproduccion() {
    //console.log("22");
    
    this.servi.getDProducciones().subscribe((data: {dproduccion: []}) => {this.DProducciones = data;},
                   error => {console.error(error + " ")});

    this.tituloDProduccion = "LISTA DE DETALLES DE LA PRODUCCION"; 
    
   // console.log("23");
  }


  //--------------------------------------------------------------

  public buscardetallesproduccion() {

    var filtovalor = this.filtrarDProduccion.getRawValue()['textfiltro'];

    this.servi.getDProduccion('/' + filtovalor).subscribe((data: {}) => {this.MiDProducciones = data;},
                              error => {console.log(error)});

    this.titloDProduccion = "DETALLE DE LA PRODUCCION SELECIONADO";
  }



  //--------------------------------------------------------------

  public Insertardetallesproduccion() {
    //console.log("31  Inserta");
try{

  var datosvalo2 = this.InsertarGDProduccion.getRawValue()['textLitroLeeche'];
  var datosvalo3 = this.InsertarGDProduccion.getRawValue()['textFechaProduccion'];
  var datosvalo4 = this.InsertarGDProduccion.getRawValue()['textServicios'];
  var datosvalo5 = this.InsertarGDProduccion.getRawValue()['textCercas'];
  var datosvalo7 = this.InsertarGDProduccion.getRawValue()['textMantenimientoMaquinas'];
  var datosvalo8 = this.InsertarGDProduccion.getRawValue()['textArreglopraderas'];
  var datosvalo9 = this.InsertarGDProduccion.getRawValue()['textFertilizantes'];
  var datosvalo10 = this.InsertarGDProduccion.getRawValue()['textManodeObra'];
  var datosvalo11 = this.InsertarGDProduccion.getRawValue()['textempleado'];
  var datosvalo12 = this.InsertarGDProduccion.getRawValue()['textvaca'];
  var datosvalo13 = this.InsertarGDProduccion.getRawValue()['textinsumo'];
  
  var suma = parseInt(datosvalo4)+parseInt(datosvalo5)+parseInt(datosvalo7)+parseInt(datosvalo8)+parseInt(datosvalo9)+parseInt(datosvalo10);
  var datosvalo6 = [suma];
  (document.getElementById('total') as HTMLInputElement).value =""+suma.toString(); //ESTE SUMA EN TOTAL INTERNAMENTE, YA QUE TYPE SCRIPT EL VALUE NO EXISTE TOCA CON INPUT PARA QUE LO TRAIGA DE OTRO LADO
 // let inputValue = (document.getElementById('total') as HTMLInputElement).value;

  var cadena = {"litros_leche":datosvalo2,"fecha_registro":datosvalo3,"Servicios":datosvalo4,"ReparacionCercas":datosvalo5,"CostoTotal":datosvalo6,"MantenimientoMaquinas":datosvalo7,"Arreglopraderas":datosvalo8,"Fertilizantes":datosvalo9,"ManodeObra":datosvalo10,"id_empleado":datosvalo11,"id_vaca":datosvalo12,"id_insumo":datosvalo13};

  this.servi.insertDProduccion(cadena).then(res => {console.log(res)}).catch(err => 
    {console.log(err)});




    alert("Registro insertado con exito");
}catch(exception_error){

  alert("Hubo un error en el registro "+exception_error);
}

  }


  //--------------------------------------------------------------


  //--------------------------------------------------------------

 public buscarEditardetallesproduccion() {
  //IMPORTANTE!! AL parecer el error que me comento el profe venia del id de este metodo
//public buscarEditarTipDoc(id) asi estaba... y esto provoca errores de copilacion
//la verdad nose pero tengo sospecha de que sea la version de angular inestable o el visual studio code
  var filtoEvalor = this.ActualizarADProduccion.getRawValue()['idproduccion'];
  //console.log("iServicio 43 " + filtoEvalor + " ID " + id );

  this.servi.getDProduccion('/' + filtoEvalor).subscribe((data: {}) => {

    this.MiDProduccionesE = data;

    //console.log(" 44" + this.MiTipDocE[0].color)

  }, error => { console.log(error) });


  //ojo con esto
  this.servi.getDProducciones().subscribe((data: {dproduccion: []}) => {this.DProducciones = data;},
                   error => {console.error(error + " ")});
                   this.servi.getEmpleadoxProducciones().subscribe((data: {dempleado: []}) => {this.Empleados = data;},
                   error => {console.error(error + " ")}); //Con este se crean las listan desplegables
                   this.servi.getVacaxProducciones().subscribe((data: {dvacao: []}) => {this.Vaca = data;},
                   error => {console.error(error + " ")}); //Con este se crean las listan desplegables
                   this.servi.getInsumoxProducciones().subscribe((data: {deinsumo: []}) => {this.Insumo = data;},
                   error => {console.error(error + " ")}); //Con este se crean las listan desplegables

  this.titloDProduccionEditar = "DETALLE DE PRODUCCION A EDITAR";

}

//--------------------------------------------------------------


  public Actualizardetallesproduccion() {


    console.log("Actualiza tipdoc asdsadasdsa") //ES PARA VER SI HAY UN PROBLEMA
    var textIdTipDoc = this.ActualizarADProduccion.getRawValue()['idproduccion'];
    //console.log("  45 " + textIdTipDoc);
  //  var nuevoTipDoc = this.ActualizarADProduccion.getRawValue()['nuevoTipDoc'];
    //console.log("   la 46 " + nuevoTipDoc);
  //  var nuevoIniTipDoc = this.ActualizarATipDoc.getRawValue()['nuevoIniTipDoc'];
    //console.log("   la 47 " + nuevoIniTipDoc);
    
    //TRAEMOS EL ID, NO EL FORMCONTROLNAME YA QUE NECESITO QUE ME TRAIGA LA INFORMACION DEL VECTOR VALUE CUANDO YO NO LE DIGITO NINGUN VALOR 
    var beta1= (document.getElementById('lechelitro') as HTMLInputElement).value;
    var beta2 = (document.getElementById('fecharegistro') as HTMLInputElement).value;
    var beta3 = (document.getElementById('costototal') as HTMLInputElement).value;
    var beta4 = (document.getElementById('Servicios') as HTMLInputElement).value;
    var beta5 = (document.getElementById('ReparacionCercas') as HTMLInputElement).value;
    var beta6 = (document.getElementById('MantenimientoMaquinas') as HTMLInputElement).value;
    var beta7 = (document.getElementById('Arreglopraderas') as HTMLInputElement).value;
    var beta8 = (document.getElementById('Fertilizantes') as HTMLInputElement).value;
    var beta9 = (document.getElementById('ManodeObra') as HTMLInputElement).value;
    //LOS BETA SON LA CORRECION DEL EDITAR cuando le da uno en actualizar no guarda los valores que busca el metodo y coloca
    
    
    //*********************************************** */
    
    var datosvalo133 = this.ActualizarADProduccion.getRawValue()['nuevolechelitro']; //Por cada variable de estas, toca crear vectores y pasarselos al html mas abajo y mirar a que grupo pertenece las variables
    var datosvalo134 = this.ActualizarADProduccion.getRawValue()['nuevofecharegistro'];
    var datosvalo135 = this.ActualizarADProduccion.getRawValue()['nuevoServicios'];
    var datosvalo136 = this.ActualizarADProduccion.getRawValue()['nuevoReparacionCercas'];
    var datosvalo137 = this.ActualizarADProduccion.getRawValue()['nuevoMantenimientoMaquinas'];
    var datosvalo138 = this.ActualizarADProduccion.getRawValue()['nuevoArreglopraderas'];
    var datosvalo139 = this.ActualizarADProduccion.getRawValue()['nuevoFertilizantes'];
    var datosvalo140 = this.ActualizarADProduccion.getRawValue()['nuevoManodeObra'];
    var datosvalo141 = this.ActualizarADProduccion.getRawValue()['nuevoid_empleado'];
    var datosvalo142 = this.ActualizarADProduccion.getRawValue()['nuevocostototal'];
    var datosvalo143 = this.ActualizarADProduccion.getRawValue()['nuevoid_vaca'];   
    var datosvalo144 = this.ActualizarADProduccion.getRawValue()['nuevoid_insumo'];
//*********************************************** */
//alert("esto vale idvaca "+datosvalo143+" esto vale manodeobra"+datosvalo140);
var cadena = {"id_detallesproduccion": textIdTipDoc,"litros_leche":beta1,"fecha_registro":beta2,"Servicios":beta4,"ReparacionCercas":beta5,"MantenimientoMaquinas":beta6,"Arreglopraderas":beta7,"Fertilizantes":beta8,"ManodeObra":beta9,"id_empleado":datosvalo141,"CostoTotal":beta3,"id_vaca":datosvalo143,"id_insumo":datosvalo144};
   
   

    this.servi.updateDProduccion(cadena).then
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
    this.filtrarDProduccion = this.formBuilder.group(
      {
        textfiltro: []
      }); 
      this.formBuilder.group

      this.InsertarGDProduccion = this.formBuilder.group(
        {
          textLitroLeeche: [],
          textFechaProduccion: [],
          textServicios: [],
          textCercas: [],
          suma: [],
          textMantenimientoMaquinas: [],
          textArreglopraderas: [],
          textFertilizantes: [],
          textManodeObra: [],
          textempleado: [],
          textvaca: [],
          textinsumo: []
        });
        this.formBuilder.group


        this.ActualizarADProduccion = this.formBuilder.group(
          {
            idproduccion: [], 
            nuevolechelitro: [],
            nuevofecharegistro: [],
            nuevocostototal: [],
            nuevoServicios: [],
            nuevoReparacionCercas: [],
            nuevoMantenimientoMaquinas: [],
            nuevoArreglopraderas: [],
            nuevoFertilizantes: [],
            nuevoManodeObra: [],
            nuevoid_empleado: [],
            nuevoid_vaca: [],
            nuevoid_insumo: [],
            lechelitro: []
             
       
          });
          this.formBuilder.group

  }

}
