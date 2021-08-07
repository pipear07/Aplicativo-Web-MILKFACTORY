import { Component, OnInit } from '@angular/core';

//Archivos del actual componente
@Component({
  selector: 'app-menu-inicio',
  templateUrl: './menu-inicio.component.html',
  styleUrls: ['./menu-inicio.component.css']
})


export class MenuInicioComponent implements OnInit {
  

  title = "GLOBEX - PROYECTO FRONT - END                                                                           INGENIERIA DE SOFTWARE I 501N";
  title2 = "HECHO POR: ANDRES FELIPE AREVALO MORENO, FRANCISCO JAVIER CASALLAS BARRIGA Y JOSE ROBERTO NIETO GONZALEZ";
 
  

  constructor() { }

  ngOnInit() 
  {
    
  }

}
