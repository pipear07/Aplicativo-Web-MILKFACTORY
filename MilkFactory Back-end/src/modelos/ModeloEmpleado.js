//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var EmpleadoModel = {};

//---------------------------------------------------------------

//ESTE TIENE INNER JOINS
//obtenemos todos Empleadoss
EmpleadoModel.crulMostrarEmpleadox = function (callback)
{
    if (connection) //validamos si hay coneccion
    {
         var sql = "SELECT `id_empleado`, roles.nombre_rol, tipos_identificacion.nombre_tipo_identificacion, CONCAT(IFNULL(`primer_nombre`,''),' ', IFNULL(`segundo_nombre`,''),' ', IFNULL(`primer_apellido`,''),' ', IFNULL(`segundo_apellido`,'')) AS 'Nombre_del_Empleado', `num_identificacion`, `correo_electronico`, `activo`, `fecha_registro` FROM `empleados` "+
                    " INNER JOIN tipos_identificacion ON empleados.id_tipo_identificacion= tipos_identificacion.id_tipo_identificacion"+
                    " INNER JOIN roles ON empleados.id_rol= roles.id_rol ORDER BY `id_empleado` DESC";
      
     
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

//ESTE NO TIENE INNER JOINS
//obtenemos todos los Empleados
EmpleadoModel.crulMostrarEmpleadoxConId = function (callback)
{
    if (connection) //validamos si hay coneccion
    {
     //este es el original
      var sql = "SELECT `id_empleado`, `id_rol`, `id_tipo_identificacion`, CONCAT(`primer_nombre`,' ', `segundo_nombre`,' ', `primer_apellido`,' ', `segundo_apellido`), `num_identificacion`, `correo_electronico`, `activo`, `fecha_registro` FROM `empleados`";
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
//obtenemos un Empleado por si ID
EmpleadoModel.crulMostrarEmpleado = function (filtro, callback)
{

    if (connection)
    {
      //este es el original
   // var sql = "SELECT `id_empleado`, `id_rol`, `id_tipo_identificacion`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `num_identificacion`, `correo_electronico`, `activo`, `fecha_registro` FROM `empleados` WHERE id_empleado = "+ connection.escape(filtro) + ";";
   var sql = "SELECT `id_empleado`, roles.nombre_rol, tipos_identificacion.nombre_tipo_identificacion, CONCAT(IFNULL(`primer_nombre`,''),' ', IFNULL(`segundo_nombre`,''),' ', IFNULL(`primer_apellido`,''),' ', IFNULL(`segundo_apellido`,'')) AS 'Nombre del Empleado', `num_identificacion`, `correo_electronico`, `activo`, `fecha_registro` FROM `empleados` "+
   " INNER JOIN tipos_identificacion ON empleados.id_tipo_identificacion= tipos_identificacion.id_tipo_identificacion"+
   " INNER JOIN roles ON empleados.id_rol= roles.id_rol WHERE id_empleado = "+ connection.escape(filtro) + ";"; //haremos el select porde la tabla



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
//añadir un nuevo Empleado
EmpleadoModel.crulCrearEmpleado = function (EmpleadoData, callback)
{
 
    if (connection)
    {

        var sql = " INSERT INTO `empleados` SET ?; ";

        connection.query(sql, EmpleadoData, function (error, result)
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
//actualizar un Empleado
EmpleadoModel.crulModificarEmpleado = function (EmpleadoData, callback)
{

    if (connection)
    {
        var sql = " UPDATE `empleados` SET `id_rol` ="+connection.escape(EmpleadoData.id_rol)+", `id_tipo_identificacion` ="+connection.escape(EmpleadoData.id_tipo_identificacion)+", `primer_nombre` ="+connection.escape(EmpleadoData.primer_nombre)+", `segundo_nombre` ="+connection.escape(EmpleadoData.segundo_nombre)+", `primer_apellido` ="+connection.escape(EmpleadoData.primer_apellido)+", `segundo_apellido` ="+connection.escape(EmpleadoData.segundo_apellido)+", `num_identificacion` ="+connection.escape(EmpleadoData.num_identificacion)+", `correo_electronico` ="+connection.escape(EmpleadoData.correo_electronico)+", `activo` ="+connection.escape(EmpleadoData.activo)+", `fecha_registro` ="+connection.escape(EmpleadoData.fecha_registro)+" WHERE `id_empleado` = "+connection.escape(EmpleadoData.id_empleado)+ ";";
        //Molde
        //+", `primer_nombre` ="+connection.escape(EmpleadoData.primer_nombre)+
        //node app.js
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
module.exports = EmpleadoModel;

//aqui todo se borra
