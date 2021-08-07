//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var InsumoLecheModel = {};

//---------------------------------------------------------------
//obtenemos todos los Insumos
InsumoLecheModel.crulMostrarInsumoLechex = function (callback)
{
    if (connection) //validamos si hay coneccion
    {
      //  var sql = "SELECT `id_vaca`, `id_raza`, `codigo_vaca`, `fecha_registro`, `fecha_nacimiento`, `litros_leche` FROM `vacas` ORDER BY codigo_vaca"; //haremos el select de la tabla
      var sql = "SELECT `id_insumo`, `descripcion`, `NombreInsumo`, `fecha_suministro`, `cantidadtotal`, `cantidaddisponible` FROM `insumoleche` ORDER BY `id_insumo` DESC "; //haremos el select de la tabla
      
     
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
//obtenemos un Insumo
InsumoLecheModel.crulMostrarInsumoLeche = function (filtro, callback)
{

    if (connection)
    {
       // var sql = "SELECT `id_vaca`, `id_raza`, `codigo_vaca`, `fecha_registro`, `fecha_nacimiento`, `litros_leche` FROM `vacas` WHERE id_vaca = "+ connection.escape(filtro) + ";";
   
    var sql = "SELECT `id_insumo`, `descripcion`, `NombreInsumo`, `fecha_suministro`, `cantidadtotal`, `cantidaddisponible` FROM `insumoleche` WHERE id_insumo = "+ connection.escape(filtro) + ";";
      
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
//añadir un nuevo Insumo
InsumoLecheModel.crulCrearInsumoLeche = function (InsumoLecheData, callback)
{
 
    if (connection)
    {

        var sql = " INSERT INTO `insumoleche` SET ?; ";

        connection.query(sql, InsumoLecheData, function (error, result)
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
//actualizar un Insumo
InsumoLecheModel.crulModificarInsumoLeche = function (InsumoLecheData, callback)
{

    if (connection)
    {
        var sql = " UPDATE `insumoleche` SET  `descripcion` ="+connection.escape(InsumoLecheData.descripcion)+", `NombreInsumo` ="+connection.escape(InsumoLecheData.NombreInsumo)+", `fecha_suministro` ="+connection.escape(InsumoLecheData.fecha_suministro)+", `cantidadtotal` ="+connection.escape(InsumoLecheData.cantidadtotal)+", `cantidaddisponible` ="+connection.escape(InsumoLecheData.cantidaddisponible)+" WHERE `id_insumo` = "+connection.escape(InsumoLecheData.id_insumo)+";";
     
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
module.exports = InsumoLecheModel;