//Optenemos las librerias
var express = require('express');
var router = express.Router();

//obtenemos el modelo ModeloRazaVaca
var RazaVacaModel = require('../modelos/ModeloRazaVaca'); 

module.exports = function ()
{
    //-------------------------------------------------------------------------------------------------//
    //Muestra el método CRUL Listar q
    router.get("/", function (req, res)
    {
        RazaVacaModel.crulMostrarRazaVacax(function (error, data)
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
            RazaVacaModel.crulMostrarRazaVaca(filtro, function (error, data)
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
    //-------------------------------------------------------------------------------------------------//
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res)
    {
        var RazaVacaData = 
            {
                id_raza: null,
                nombre_raza: req.body.nombre_raza,
                descripcion: req.body.descripcion,
            };
        //usamos la funcion para insertar
        RazaVacaModel.crulCrearRazaVaca(RazaVacaData, function (error, data)
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

    //-------------------------------------------------------------------------------------------------//
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res)
    {
        var RazaVacaData =
            {
                id_raza: req.body.id_raza,
                nombre_raza: req.body.nombre_raza,
                descripcion: req.body.descripcion,
            };
        //usamos la funcion para actualizar
        RazaVacaModel.crulModificarRazaVaca(RazaVacaData, function (error, data)
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