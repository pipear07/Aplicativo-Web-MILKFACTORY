//Optenemos las librerias
var express = require('express');
var router = express.Router();

//obtenemos el modelo ModeloEmpleado
var EmpleadoModel = require('../modelos/ModeloEmpleado'); //aqui importamos

module.exports = function ()
{

    //-------------------------------------------------------------------------------------------------//
    //Muestra el método CRUL Listar
    router.get("/", function (req, res)
    {
        EmpleadoModel.crulMostrarEmpleadox(function (error, data)
        {
            res.status(200).json(data);
        });
    });
    //-------------------------------------------------------------------------------------------------//
    //Muestra el método CRUL read(leer), que muestra el tipo de documento solicitado
    router.get("/:Id", function (req, res)
    {
        var filtro = req.params.Id;
        if (!isNaN(filtro)) 
        //validamos si el filtro es un numero
        {
            EmpleadoModel.crulMostrarEmpleado(filtro, function (error, data)
            {
                if (typeof data !== 'undefined' && data.length > 0) 
                //si hay algun registro, lo muestre, eso es un vector
                {
                    res.status(200).json(data);
                }
                else
                {
                    res.json(404, 
                    { 
                        "msg": "Registro no Existe" 
                    });
                }
            });
        }
        else //si hay algún error
        {
            res.status(500).json({ "msg": "error" });
        }
    });
    //-------------------------------------------------------------------------------------------------//
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res)
    {
        var EmpleadoData = 
            {
                id_empleado: null,
                id_rol: req.body.id_rol,
                id_tipo_identificacion: req.body.id_tipo_identificacion,
                primer_nombre: req.body.primer_nombre,
                segundo_nombre: req.body.segundo_nombre,
                primer_apellido: req.body.primer_apellido,
                segundo_apellido: req.body.segundo_apellido,
                num_identificacion: req.body.num_identificacion,
                correo_electronico: req.body.correo_electronico,
                activo: req.body.activo,
                fecha_registro: req.body.fecha_registro,
            };

        //usamos la funcion para insertar
        EmpleadoModel.crulCrearEmpleado(EmpleadoData, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send(
                { 
                    error: "boo:(" 
                });
            }
        });
    });
    //-------------------------------------------------------------------------------------------------//
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res)
    {
        var EmpleadoData =
        {
         id_empleado: req.body.id_empleado,
         id_rol: req.body.id_rol,
         id_tipo_identificacion: req.body.id_tipo_identificacion,
         primer_nombre: req.body.primer_nombre,
         segundo_nombre: req.body.segundo_nombre,
         primer_apellido: req.body.primer_apellido,
         segundo_apellido: req.body.segundo_apellido,
         num_identificacion: req.body.num_identificacion,
         correo_electronico: req.body.correo_electronico,
         activo: req.body.activo,
         fecha_registro: req.body.fecha_registro,
        };

        //usamos la funcion para actualizar
        EmpleadoModel.crulModificarEmpleado(EmpleadoData, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data && data.msg)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send(
                { 
                    error: "boo:(" 
                });
            }
        });    
    });
    //-------------------------------------------------------------------------------------------------//
    //exportamos el objeto para tenerlo disponible en EL APP
    return router;
}