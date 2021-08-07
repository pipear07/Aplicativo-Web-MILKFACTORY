var mysql = require('mysql');
var settings = require('./config.json');
var connection;


//var express = require('express');
//var app = express();//recibe un constructor
//app.get("/",(request,response)=>{this.response.sendStatus(200);});
//app.listen(process.env.PORT);

function connectDatabase() 
{
  if(!connection) 
  {
    connection = mysql.createConnection(settings);

    connection.connect(function(err)
    {
      if(!err) 
      {
        console.log('Base de Datos Conectada');
      } 
      else 
      {
        console.log('Error en la conexión con la Base de Datos '+err);
      }
    });
  }
  return connection;
}

module.exports = connectDatabase();

//exporta la conexión 
module.exports = connectDatabase();
