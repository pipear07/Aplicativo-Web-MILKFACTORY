//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var TipDocModel = {};

//---------------------------------------------------------------
//obtenemos todos los Tipos de Documento
TipDocModel.crulMostrarTipDocs = function (callback)
{
    if (connection) //validamos si hay coneccion
    {
        var sql = "SELECT `id_tipo_identificacion`, `nombre_tipo_identificacion` FROM `tipos_identificacion` ORDER BY `id_tipo_identificacion` DESC"; //haremos el select de la tabla
        
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
//obtenemos un Tipo de Documento por su ID
TipDocModel.crulMostrarTipDoc = function (filtro, callback)
{

    if (connection)
    {
        var sql = "SELECT `id_tipo_identificacion`, `nombre_tipo_identificacion` FROM `tipos_identificacion` WHERE id_tipo_identificacion = "+ connection.escape(filtro) + ";";

 
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
//añadir un nuevo Tipo de Documento
TipDocModel.crulCrearTipDoc = function (TipDocData, callback)
{
 
    if (connection)
    {

        var sql = " INSERT INTO `tipos_identificacion` SET ?; ";

        connection.query(sql, TipDocData, function (error, result)
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
//actualizar un Tipo de Documento
TipDocModel.crulModificarTipDoc = function (TipDocData, callback)
{

    if (connection)
    {
        var sql = " UPDATE `tipos_identificacion` SET `nombre_tipo_identificacion` ="+connection.escape(TipDocData.nombre_tipo_identificacion)+" WHERE `id_tipo_identificacion` = "+connection.escape(TipDocData.id_tipo_identificacion)+";";
        

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
module.exports = TipDocModel;
