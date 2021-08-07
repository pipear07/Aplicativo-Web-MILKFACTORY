//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var RazaVacaModel = {};

//---------------------------------------------------------------
//obtenemos todas las Razas
RazaVacaModel.crulMostrarRazaVacax = function (callback)
{
    if (connection) //validamos si hay coneccion
    {
      //  var sql = "SELECT `id_vaca`, `id_raza`, `codigo_vaca`, `fecha_registro`, `fecha_nacimiento`, `litros_leche` FROM `vacas` ORDER BY codigo_vaca"; //haremos el select de la tabla
      var sql = "SELECT `id_raza`, `nombre_raza`, `descripcion` FROM `razasvacas` ORDER BY `id_raza` DESC"; //haremos el select de la tabla
      
     
        connection.query(sql, function (error, rows) 
        {
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });

    }

}

//---------------------------------------------------------------
//obtenemos una Raza por ID
RazaVacaModel.crulMostrarRazaVaca = function (filtro, callback)
{

    if (connection)
    {
       // var sql = "SELECT `id_vaca`, `id_raza`, `codigo_vaca`, `fecha_registro`, `fecha_nacimiento`, `litros_leche` FROM `vacas` WHERE id_vaca = "+ connection.escape(filtro) + ";";
   
    var sql = "SELECT `id_raza`, `nombre_raza`, `descripcion` FROM `razasvacas` WHERE id_raza = "+ connection.escape(filtro) + ";";
      
        connection.query(sql, function (error, row)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, row);
            }
        });
    }


}

//---------------------------------------------------------------
//añadir una nueva Raza
RazaVacaModel.crulCrearRazaVaca = function (RazaVacaData, callback)
{
 
    if (connection)
    {

        var sql = " INSERT INTO `razasvacas` SET ?; ";

        connection.query(sql, RazaVacaData, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg": "Registro Insertado"});
            }
        });
    }


}

//---------------------------------------------------------------
//actualizar una Raza
RazaVacaModel.crulModificarRazaVaca = function (RazaVacaData, callback)
{

    if (connection)
    {
        var sql = " UPDATE `razasvacas` SET  `nombre_raza` ="+connection.escape(RazaVacaData.nombre_raza)+" WHERE `id_raza` = "+connection.escape(RazaVacaData.id_raza)+";";
      

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "Registro Actualizado"});
            }
        });
    }


}

//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = RazaVacaModel;