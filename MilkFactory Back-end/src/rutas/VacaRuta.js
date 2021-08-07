//Optenemos las librerias
var express = require('express');
var router = express.Router();

//obtenemos el modelo ModeloVaca
var VacaModel = require('../modelos/ModeloVaca');

module.exports = function ()
{
    //------------------------------------------------------------------------------------------------//
    //Muestra el método CRUL Listar 
    router.get("/", function (req, res)
    {
        VacaModel.crulMostrarVacax(function (error, data)
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
            VacaModel.crulMostrarVaca(filtro, function (error, data)
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
        var VacaData =  //falta crear el json
            {
                id_vaca: null,
                id_raza: req.body.id_raza,          
                codigo_vaca: req.body.codigo_vaca,
                fecha_registro: req.body.fecha_registro,
                fecha_nacimiento: req.body.fecha_nacimiento,
            };
        //usamos la funcion para insertar
        VacaModel.crulCrearVaca(VacaData, function (error, data)
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
    //------------------------------------------------------------------------------------------------//
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res)
    {
        var VacaData =
            {
                id_vaca: req.body.id_vaca,
                id_raza: req.body.id_raza,          
                codigo_vaca: req.body.codigo_vaca,
                fecha_registro: req.body.fecha_registro,
                fecha_nacimiento: req.body.fecha_nacimiento,
            };
        //usamos la funcion para actualizar
        VacaModel.crulModificarVaca(VacaData, function (error, data)
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
    //------------------------------------------------------------------------------------------------//
    //exportamos el objeto para tenerlo disponible en EL APP
    return router;
}