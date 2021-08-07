//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var VacaModel = {};

//---------------------------------------------------------------

//ESTE TIENE INNER JOINS
//obtenemos todas las Vacas
VacaModel.crulMostrarVacax = function (callback)
{
    if (connection) //validamos si hay coneccion
    {
  

         var sql = "SELECT `id_vaca`, razasvacas.nombre_raza,razasvacas.descripcion, `codigo_vaca`, `fecha_registro`, `fecha_nacimiento`  FROM `vacas` "+
         " INNER JOIN razasvacas ON vacas.id_raza = razasvacas.id_raza ORDER BY `id_vaca` DESC "; //haremos el select de la tabla
      
     
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
//obtenemos todas las Vacas
VacaModel.crulMostrarVacaxConId = function (callback)
{
    if (connection) //validamos si hay coneccion
    {
     //este es el original
      var sql = "SELECT `id_vaca`, `id_raza`, `codigo_vaca`, `fecha_registro`, `fecha_nacimiento` FROM `vacas`"; //haremos el select de la tabla
       
     
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
//obtenemos una Vaca por su ID
VacaModel.crulMostrarVaca = function (filtro, callback)
{

    if (connection)
    {
    
        var sql = "SELECT `id_vaca`, razasvacas.nombre_raza,razasvacas.descripcion, `codigo_vaca`, `fecha_registro`, `fecha_nacimiento` FROM `vacas` "+
         " INNER JOIN razasvacas ON vacas.id_raza = razasvacas.id_raza WHERE id_vaca = "+ connection.escape(filtro) + ";"; //haremos el select de la tabla
      
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
//añadir una nueva Vaca
VacaModel.crulCrearVaca = function (VacaData, callback)
{
 
    if (connection)
    {

        var sql = " INSERT INTO `vacas` SET ?; ";

        connection.query(sql, VacaData, function (error, result)
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
//actualizar una Vaca
VacaModel.crulModificarVaca = function (VacaData, callback)
{

    if (connection)
    {
        var sql = " UPDATE `vacas` SET  `id_raza` ="+connection.escape(VacaData.id_raza)+" ,`codigo_vaca` ="+connection.escape(VacaData.codigo_vaca)+" ,`fecha_registro` ="+connection.escape(VacaData.fecha_registro)+" ,`fecha_nacimiento` ="+connection.escape(VacaData.fecha_nacimiento)+" WHERE `id_vaca` = "+connection.escape(VacaData.id_vaca)+";";
      //,`litros_leche`=[value-6] WHERE 1

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
module.exports = VacaModel;