//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var DetallesProduccionModel = {};

//---------------------------------------------------------------

//ESTE TIENE INNER JOINS
//obtenemos todos los Detalles de Produccion
DetallesProduccionModel.crulMostrarDetallesProduccionx = function (callback)
{
    if (connection) //validamos si hay coneccion
    {
    
         var sql = "SELECT `id_detallesproduccion`, insumoleche.descripcion AS 'Descripcion_del_insumo',insumoleche.NombreInsumo,insumoleche.fecha_suministro,insumoleche.cantidadtotal,insumoleche.cantidaddisponible,vacas.codigo_vaca,vacas.fecha_registro AS 'fecha registro_de_vaca',vacas.fecha_nacimiento,razasvacas.nombre_raza,razasvacas.descripcion AS 'Descripcion_de_la_raza_Vaca', roles.nombre_rol,tipos_identificacion.nombre_tipo_identificacion,CONCAT(IFNULL(empleados.primer_nombre,''),' ', IFNULL(empleados.segundo_nombre,''),' ', IFNULL(empleados.primer_apellido,''),' ',IFNULL(empleados.segundo_apellido,'')) AS 'Nombre_del_Empleado',empleados.num_identificacion,empleados.correo_electronico,empleados.activo,empleados.fecha_registro AS 'Fecha_de_registro_empleado', `ManodeObra`, `Fertilizantes`, `Arreglopraderas`, `MantenimientoMaquinas`, `ReparacionCercas`, `Servicios`, `CostoTotal`,detallesproduccion.fecha_registro AS 'Fecha_de_registro_de_la_produccion', `litros_leche` FROM `detallesproduccion` "+
         "INNER JOIN insumoleche ON detallesproduccion.id_insumo = insumoleche.id_insumo "+ 
         "INNER JOIN vacas ON detallesproduccion.id_vaca = vacas.id_vaca "+
         "INNER JOIN razasvacas ON vacas.id_raza = razasvacas.id_raza "+
         "INNER JOIN empleados ON detallesproduccion.id_empleado = empleados.id_empleado "+
         "INNER JOIN tipos_identificacion ON empleados.id_tipo_identificacion = tipos_identificacion.id_tipo_identificacion "+
         "INNER JOIN roles ON empleados.id_rol = roles.id_rol ORDER BY `id_detallesproduccion` DESC"; //haremos el select de la tabla"
      
     
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
//obtenemos todos los Empleados por id
DetallesProduccionModel.crulMostrarDetallesProduccionxid = function (filtro, callback)
{
    if (connection) //validamos si hay coneccion
    {
    
         var sql = "SELECT `id_detallesproduccion`, `id_insumo`, `id_vaca`, `id_empleado`, `ManodeObra`, `Fertilizantes`, `Arreglopraderas`, `MantenimientoMaquinas`, `ReparacionCercas`, `Servicios`, `CostoTotal`, `fecha_registro`, `litros_leche` FROM `detallesproduccion` WHERE `id_detallesproduccion` = "+ connection.escape(filtro) + ";";
          //haremos el select de la tabla"
      
     
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
//obtenemos un DetalleProduccion por su id
DetallesProduccionModel.crulMostrarDetallesProduccion = function (filtro, callback)
{

    if (connection)
    {
      //este es el original
  var sql = "SELECT `id_detallesproduccion`, insumoleche.descripcion AS 'Descripcion_del_insumo',insumoleche.NombreInsumo,insumoleche.fecha_suministro,insumoleche.cantidadtotal,insumoleche.cantidaddisponible,vacas.codigo_vaca,vacas.fecha_registro AS 'fecha_registro_de_vaca',vacas.fecha_nacimiento,razasvacas.nombre_raza,razasvacas.descripcion AS 'Descripcion_de_la_raza_Vaca', roles.nombre_rol,tipos_identificacion.nombre_tipo_identificacion,CONCAT(IFNULL(empleados.primer_nombre,''),' ',IFNULL(empleados.segundo_nombre,''),' ', IFNULL(empleados.primer_apellido,''),' ', IFNULL(empleados.segundo_apellido,'')) AS 'Nombre_del_Empleado',empleados.num_identificacion,empleados.correo_electronico,empleados.activo,empleados.fecha_registro AS 'Fecha_de_registro_empleado', `ManodeObra`, `Fertilizantes`, `Arreglopraderas`, `MantenimientoMaquinas`, `ReparacionCercas`, `Servicios`, `CostoTotal`,detallesproduccion.fecha_registro AS 'Fecha_de_registro_de_la_produccion', `litros_leche` FROM `detallesproduccion` "+
         "INNER JOIN insumoleche ON detallesproduccion.id_insumo = insumoleche.id_insumo "+ 
         "INNER JOIN vacas ON detallesproduccion.id_vaca = vacas.id_vaca "+
         "INNER JOIN razasvacas ON vacas.id_raza = razasvacas.id_raza "+
         "INNER JOIN empleados ON detallesproduccion.id_empleado = empleados.id_empleado "+
         "INNER JOIN tipos_identificacion ON empleados.id_tipo_identificacion = tipos_identificacion.id_tipo_identificacion "+
         "INNER JOIN roles ON empleados.id_rol = roles.id_rol WHERE `id_detallesproduccion` = "+ connection.escape(filtro) + ";"; //haremos el select porde la tabla



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
//añadir un nuevo DetalleProduccion
DetallesProduccionModel.crulCrearDetallesProduccion = function (DetallesProduccionData, callback)
{
 
    if (connection)
    {

        var sql = " INSERT INTO `detallesproduccion` SET ?; ";

        connection.query(sql, DetallesProduccionData, function (error, result)
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
//actualizar un DetallProduccion
DetallesProduccionModel.crulModificarDetallesProduccion = function (DetallesProduccionData, callback)
{

    if (connection)
    {
        var sql = " UPDATE `detallesproduccion` SET `id_insumo` ="+connection.escape(DetallesProduccionData.id_insumo)+", `id_vaca` ="+connection.escape(DetallesProduccionData.id_vaca)+", `id_empleado` ="+connection.escape(DetallesProduccionData.id_empleado)+", `ManodeObra` ="+connection.escape(DetallesProduccionData.ManodeObra)+", `Fertilizantes` ="+connection.escape(DetallesProduccionData.Fertilizantes)+", `Arreglopraderas` ="+connection.escape(DetallesProduccionData.Arreglopraderas)+", `MantenimientoMaquinas` ="+connection.escape(DetallesProduccionData.MantenimientoMaquinas)+", `ReparacionCercas` ="+connection.escape(DetallesProduccionData.ReparacionCercas)+", `Servicios` ="+connection.escape(DetallesProduccionData.Servicios)+", `CostoTotal` ="+connection.escape(DetallesProduccionData.CostoTotal)+", `fecha_registro` ="+connection.escape(DetallesProduccionData.fecha_registro)+", `litros_leche` ="+connection.escape(DetallesProduccionData.litros_leche)+" WHERE `id_detallesproduccion` = "+connection.escape(DetallesProduccionData.id_detallesproduccion)+";";
        //UPDATE `detallesproduccion` SET `fecha_registro`=[value-12] WHERE 1
        //Molde
        //+", `fecha_registro` ="+connection.escape(DetallesProduccionData.fecha_registro)+
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
//---------------------------------------------------------------------------------------------------------
//INFORME DETALLE PRODUCCION POR EMPLEADO
DetallesProduccionModel.crulInformeEmpleado = function (ProduccionData, callback)
{
    if (connection)
    {
        var sql = "SELECT d.fecha_registro AS Fecha_Registro, "+
                  "e.id_empleado AS ID_Empleado, "+
                  "rs.nombre_rol As Rol, "+
                              "CONCAT(IFNULL( e.primer_nombre, ' '),' ', "+
                              "IFNULL( e.segundo_nombre, ' ') ,' ', "+
                              "IFNULL( e.primer_apellido, ' '),' ', "+
                              "IFNULL( e.segundo_apellido, ' ')) AS Empleado, "+   
                  "t.nombre_tipo_identificacion AS Tipo_Identificación, "+
                  "e.num_identificacion AS Número_Identificación, "+
                  "e.correo_electronico AS Correo_Electrónico, "+
                  "e.activo AS Estado_Usuario, "+
                  "d.id_detallesproduccion AS Detalles_Producción, "+
                  "d.litros_leche AS Litros_Leche, "+      
                  "i.id_insumo AS ID_Insumo, "+
                  "i.NombreInsumo AS Insumo, "+
                  "i.descripcion AS Descripción, "+
                  "i.cantidadtotal AS Cantidad_Total, "+
                  "i.cantidaddisponible AS Cantidad_Disponible, "+
                  "i.fecha_suministro AS Fecha_Suministro, "+     
                  "d.CostoTotal AS Costo_Total "+
        
                  "FROM detallesproduccion AS d "+
                  "INNER JOIN empleados AS e ON e.id_empleado = d.id_empleado "+
                  "INNER JOIN roles AS rs ON rs.id_rol = e.id_rol "+
                  "INNER JOIN insumoleche AS i ON i.id_insumo = d.id_insumo "+
                  "INNER JOIN tipos_identificacion AS t ON t.id_tipo_identificacion = e.id_tipo_identificacion "+
                  "WHERE e.id_empleado = "+ connection.escape(ProduccionData.id_empleado) +
                  "AND d.fecha_registro >" + connection.escape(ProduccionData.feinicio) +
                  "AND d.fecha_registro <" + connection.escape(ProduccionData.fechafin) + ";";

        connection.query(sql, ProduccionData, function (error, rows)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,rows);
            }
        });
    }
}


//---------------------------------------------------------------------------------------------------------
//INFORME DETALLE PRODUCCION POR EMPLEADO - OPPCIONAL!!!!!
DetallesProduccionModel.crulInformeEmpleadoOPCIONAL = function (id_empleado,feinicio,fechafin, callback)
{
    if (connection)
    {
        var sql = "SELECT d.fecha_registro AS Fecha_Registro, "+
                  "e.id_empleado AS ID_Empleado, "+
                  "rs.nombre_rol As Rol, "+
                              "CONCAT(IFNULL( e.primer_nombre, ' '),' ', "+
                              "IFNULL( e.segundo_nombre, ' ') ,' ', "+
                              "IFNULL( e.primer_apellido, ' '),' ', "+
                              "IFNULL( e.segundo_apellido, ' ')) AS Empleado, "+   
                  "t.nombre_tipo_identificacion AS Tipo_Identificacion, "+
                  "e.num_identificacion AS Numero_Identificacion, "+
                  "e.correo_electronico AS Correo_Electronico, "+
                  "e.activo AS Estado_Usuario, "+
                  "d.id_detallesproduccion AS Detalles_Produccion, "+
                  "d.litros_leche AS Litros_Leche, "+      
                  "i.id_insumo AS ID_Insumo, "+
                  "i.NombreInsumo AS Insumo, "+
                  "i.descripcion AS Descripcion, "+
                  "i.cantidadtotal AS Cantidad_Total, "+
                  "i.cantidaddisponible AS Cantidad_Disponible, "+
                  "i.fecha_suministro AS Fecha_Suministro, "+     
                  "d.CostoTotal AS Costo_Total "+
        
                  "FROM detallesproduccion AS d "+
                  "INNER JOIN empleados AS e ON e.id_empleado = d.id_empleado "+
                  "INNER JOIN roles AS rs ON rs.id_rol = e.id_rol "+
                  "INNER JOIN insumoleche AS i ON i.id_insumo = d.id_insumo "+
                  "INNER JOIN tipos_identificacion AS t ON t.id_tipo_identificacion = e.id_tipo_identificacion "+
                  "WHERE e.id_empleado = "+ connection.escape(id_empleado) +
                  "AND d.fecha_registro >" + connection.escape(feinicio) +
                  "AND d.fecha_registro <" + connection.escape(fechafin) + ";";

        connection.query(sql, function (error, rows)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,rows);
            }
        });
    }
}




//------------------------------------------------------------------------------------------------//
//Informe produccion por periodo de tiempo y vaca
DetallesProduccionModel.InformeVaca= function (ProduccionData, callback)
{
    if (connection)
    {
        var sql = " SELECT " 
        +" d.fecha_registro, "
        +" v.codigo_vaca, "
        +" r.nombre_raza, "
        +" d.litros_leche, "
        +" i.NombreInsumo, "
        +" i.descripcion, "
        +" i.fecha_suministro, "
        +" i.cantidadtotal, "
        +" i.cantidaddisponible, "
        +" CONCAT(IFNULL(e.primer_nombre, ' ') , ' ', "
               +" IFNULL(e.segundo_nombre, ' ') , ' ' , "
               +" IFNULL(e.primer_apellido, ' ') , ' ' , "
               +" IFNULL(e.segundo_apellido, ' ') , ' ' , "
               +" rs.nombre_rol) AS EMPLEADO_A_CARGO, "
        +" d.ManodeObra, "       
        +" d.CostoTotal, "
        +" d.Servicios "
        +" FROM detallesproduccion AS d "
        +" INNER JOIN empleados AS e ON e.id_empleado = d.id_empleado "
        +" INNER JOIN roles AS rs ON rs.id_rol = e.id_rol "
        +" INNER JOIN insumoleche AS i ON i.id_insumo = d.id_insumo "
        +" INNER JOIN vacas AS v ON v.id_vaca = d.id_vaca "
        +" INNER JOIN razasvacas AS r ON r.id_raza = v.id_vaca "
        +" WHERE v.id_vaca = " + connection.escape(ProduccionData.id_vaca)  
        +" AND d.fecha_registro > " +connection.escape(ProduccionData.feinicio)
        +" AND d.fecha_registro < " +connection.escape(ProduccionData.fechafin) +"; ";
        connection.query(sql, ProduccionData, function (error, rows)
        {
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,rows);
            }
        });
    }
}

//---------------------------------------------------------------------------------------------------------
//INFORME DETALLE PRODUCCION POR VACA- OPPCIONAL!!!!!
DetallesProduccionModel.crulInformeVacaOPCIONAL = function (id_vaca,feinicio,fechafin, callback)
{
    if (connection)
    { 
        var sql = " SELECT " 
        +" d.fecha_registro, "
        +" v.codigo_vaca, "
        +" r.nombre_raza, "
        +" d.litros_leche, "
        +" i.NombreInsumo, "
        +" i.descripcion, "
        +" i.fecha_suministro, "
        +" i.cantidadtotal, "
        +" i.cantidaddisponible, "
        +" CONCAT(IFNULL(e.primer_nombre, ' ') , ' ', "
               +" IFNULL(e.segundo_nombre, ' ') , ' ' , "
               +" IFNULL(e.primer_apellido, ' ') , ' ' , "
               +" IFNULL(e.segundo_apellido, ' ') , ' ' , "
               +" rs.nombre_rol) AS EMPLEADO_A_CARGO, "
        +" d.ManodeObra, "       
        +" d.CostoTotal, "
        +" d.Servicios "
        +" FROM detallesproduccion AS d "
        +" INNER JOIN empleados AS e ON e.id_empleado = d.id_empleado "
        +" INNER JOIN roles AS rs ON rs.id_rol = e.id_rol "
        +" INNER JOIN insumoleche AS i ON i.id_insumo = d.id_insumo "
        +" INNER JOIN vacas AS v ON v.id_vaca = d.id_vaca "
        +" INNER JOIN razasvacas AS r ON r.id_raza = v.id_vaca "
        +" WHERE v.id_vaca = " + connection.escape(id_vaca)  
        +" AND d.fecha_registro > " +connection.escape(feinicio)
        +" AND d.fecha_registro < " +connection.escape(fechafin) +"; ";
        
     

        connection.query(sql, function (error, rows)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,rows);
            }
        });
    }
}
//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = DetallesProduccionModel;