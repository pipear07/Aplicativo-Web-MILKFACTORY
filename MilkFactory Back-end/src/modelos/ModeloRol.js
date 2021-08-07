//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var RolModel = {};

//---------------------------------------------------------------
//obtenemos todos Roles
RolModel.crulMostrarRolx = function (callback)
{
    if (connection) //validamos si hay coneccion
    {
      //  var sql = "SELECT `id_vaca`, `id_raza`, `codigo_vaca`, `fecha_registro`, `fecha_nacimiento`, `litros_leche` FROM `vacas` ORDER BY codigo_vaca"; //haremos el select de la tabla
      var sql = "SELECT `id_rol`, `nombre_rol` FROM `roles` ORDER BY `id_rol` DESC"; //haremos el select de la tabla
      
     
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
//obtenemos un Rol por ID
RolModel.crulMostrarRol = function (filtro, callback)
{

    if (connection)
    {
       // var sql = "SELECT `id_vaca`, `id_raza`, `codigo_vaca`, `fecha_registro`, `fecha_nacimiento`, `litros_leche` FROM `vacas` WHERE id_vaca = "+ connection.escape(filtro) + ";";
   
    var sql = "SELECT `id_rol`, `nombre_rol` FROM `roles` WHERE id_rol = "+ connection.escape(filtro) + ";";
      
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
//añadir un nuevo Rol
RolModel.crulCrearRol = function (RolData, callback)
{
 
    if (connection)
    {

        var sql = " INSERT INTO `roles` SET ?; ";

        connection.query(sql, RolData, function (error, result)
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
//actualizar un Rol
RolModel.crulModificarRol = function (RolData, callback)
{

    if (connection)
    {
        var sql = " UPDATE `roles` SET `nombre_rol` ="+connection.escape(RolData.nombre_rol)+" WHERE `id_rol` = "+connection.escape(RolData.id_rol)+";";
        

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
module.exports = RolModel;