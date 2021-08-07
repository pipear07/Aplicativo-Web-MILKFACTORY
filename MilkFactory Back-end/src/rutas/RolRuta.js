//Optenemos las librerias
var express = require('express');
var router = express.Router();

//obtenemos el modelo ModeloRol con toda la funcionalidad
var RolModel = require('../modelos/ModeloRol'); 

module.exports = function ()
{
    //------------------------------------------------------------------------------------------------//
    //Muestra el método CRUL Listar
    router.get("/", function (req, res)
    {
        RolModel.crulMostrarRolx(function (error, data)
        {
            res.status(200).json(data);
        });
    });
    //------------------------------------------------------------------------------------------------//
    //Muestra el método CRUL read(leer)
    router.get("/:Id", function (req, res)
    {
        var filtro = req.params.Id;
        if (!isNaN(filtro)) 
        //validamos si el filtro es un numero
        {
            RolModel.crulMostrarRol(filtro, function (error, data)
            {
                if (typeof data !== 'undefined' && data.length > 0) 
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
    //------------------------------------------------------------------------------------------------//
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res)
    {
        var RolData = 
            {
                id_rol: null,
                nombre_rol: req.body.nombre_rol,
            };
        //usamos la funcion para insertar
        RolModel.crulCrearRol(RolData, function (error, data)
        {
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
    //------------------------------------------------------------------------------------------------//
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res)
    {
        var RolData =
            {
                id_rol: req.body.id_rol,
                nombre_rol: req.body.nombre_rol,
            };
        //usamos la funcion para actualizar
        RolModel.crulModificarRol(RolData, function (error, data)
        {
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
    //------------------------------------------------------------------------------------------------//
    //exportamos el objeto para tenerlo disponible en EL APP
    return router;
}