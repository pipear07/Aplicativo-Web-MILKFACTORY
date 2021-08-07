// *********************************************************** 
//En esta clase se organiza lo que se va a mostrar en el sitio 
// *********************************************************** 
import * as tslib_1 from "tslib";
// Librería para poder consumir el servicio
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule, } from '@angular/http';
import { HttpClientModule, } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//.................................................................................
//se incluyen los componentes que tenemos y el servicio
import { AppComponent } from './app-component/app.component';
import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';
import { TipDocsComponent } from './tip-docs/tip-docs.component';
import { ElservicioService } from './elservicio.service';
//..................................................................................
//se establecen las rutas a los componentes
const appRoutes = [
    {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'Inicio',
    },
    {
        path: 'Inicio',
        component: MenuInicioComponent,
    },
    {
        path: 'tipdoc',
        component: TipDocsComponent,
    },
];
//.........................................................................
//declaracion de los componentes y módulos 
//y se importan los elementos a utilizar
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
            MenuInicioComponent,
            TipDocsComponent,
        ],
        imports: [
            FormsModule,
            ReactiveFormsModule,
            BrowserModule,
            AppRoutingModule,
            HttpModule,
            RouterModule.forRoot(appRoutes),
            BrowserModule,
            HttpClientModule // <- Agregar la clase
        ],
        providers: [ElservicioService],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map