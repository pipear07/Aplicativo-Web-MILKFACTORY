// *********************************************************** 
//En esta clase se organiza lo que se va a mostrar en el sitio 
// *********************************************************** 

// Librería para poder consumir el servicio
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { HttpModule, } from '@angular/http';
import { HttpClientModule, } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

//.................................................................................
//se incluyen los componentes que tenemos y el servicio
import { AppComponent } from './app-component/app.component';


import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';
import { TipDocsComponent } from './tip-docs/tip-docs.component';


import {ElservicioService } from './elservicio.service';
import { DetallesproduccionComponent } from './detallesproduccion/detallesproduccion.component';
import { InformeEmpleadoComponent } from './informe-empleado/informe-empleado.component';
import { AcercadeComponent } from './acercade/acercade.component';
import { InformacionComponent } from './informacion/informacion.component';
import { RazaComponent } from './raza/raza.component';
import { VacasComponent } from './vacas/vacas.component';
import { InformeVacaComponent } from './informe-vaca/informe-vaca.component';
import { RolesComponent } from './roles/roles.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { InsumosComponent } from './insumos/insumos.component';


//..................................................................................
//se establecen las rutas a los componentes
const appRoutes: Routes = 
[
    {
      path: '',
      pathMatch: 'prefix',
      redirectTo: 'Inicio',
    },

    {
      path: 'Inicio',
      component: MenuInicioComponent,
    },

    { //CADA COMPONENTE QUE CREEN, DEBEN AÑADIRLO AQUI
      path: 'tipdoc',
      component: TipDocsComponent,   
    },
  
    //AQUI LO AÑADEN

    { //CADA COMPONENTE QUE CREEN, DEBEN AÑADIRLO AQUI
      path: 'DetallesProduccion',
      component: DetallesproduccionComponent,   
    },


    { //CADA COMPONENTE QUE CREEN, DEBEN AÑADIRLO AQUI
      path: 'Informeempleado',
      component: InformeEmpleadoComponent,   
    },

    { //CADA COMPONENTE QUE CREEN, DEBEN AÑADIRLO AQUI
      path: 'Acercade',
      component:  AcercadeComponent,
    },


    { //CADA COMPONENTE QUE CREEN, DEBEN AÑADIRLO AQUI
      path: 'Informacion',
      component: InformacionComponent,
    },
    { //CADA COMPONENTE QUE CREEN, DEBEN AÑADIRLO AQUI
      path: 'razavaca',
      component: RazaComponent,
    },
    { //CADA COMPONENTE QUE CREEN, DEBEN AÑADIRLO AQUI
      path: 'vacas',
      component: VacasComponent,
    },

    { //CADA COMPONENTE QUE CREEN, DEBEN AÑADIRLO AQUI
      path: 'informevaca',
      component: InformeVacaComponent,   
    },

    { //CADA COMPONENTE QUE CREEN, DEBEN AÑADIRLO AQUI
      path: 'Rol',
      component: RolesComponent,   
    },

    { //CADA COMPONENTE QUE CREEN, DEBEN AÑADIRLO AQUI
      path: 'InsumoLeche',
      component: InsumosComponent,   
    },

    { //CADA COMPONENTE QUE CREEN, DEBEN AÑADIRLO AQUI
      path: 'Empleado',
      component: EmpleadosComponent,   
    },
  ];

//.........................................................................
//declaracion de los componentes y módulos 
//y se importan los elementos a utilizar

@NgModule({
  declarations: 
  [
    AppComponent,
    MenuInicioComponent,
    TipDocsComponent,
    DetallesproduccionComponent,
    InformeEmpleadoComponent,
    AcercadeComponent,
    InformacionComponent,
    RazaComponent,
    VacasComponent,
    InformeVacaComponent,
    RolesComponent,
    EmpleadosComponent,
    InsumosComponent,  //<- Adicionar los componentes
  ],

  imports: 
  [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    RouterModule.forRoot(appRoutes), // se agregan estos i
    BrowserModule,
    HttpClientModule  // <- Agregar la clase
  ],

  providers: [ElservicioService],
  bootstrap: [AppComponent] 
})

export class AppModule { }
