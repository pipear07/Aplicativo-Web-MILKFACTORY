//Optenemos las librerias
var express = require('express');
var router = express.Router();

//obtenemos el modelo TipDocModelo
var TipDocModel = require('../modelos/tipdocmodelo'); 

module.exports = function ()
{
    //------------------------------------------------------------------------------------------------//
    //Muestra el método CRUL Listar
    router.get("/", function (req, res)
    {
        TipDocModel.crulMostrarTipDocs(function (error, data)//aqui llmamos el metodo
        {
            res.status(200).json(data);
        });
    });
    //------------------------------------------------------------------------------------------------//
    //Muestra el método CRUL read(leer), que muestra el tipo de documento solicitado
    router.get("/:Id", function (req, res)
    {
        var filtro = req.params.Id;
        if (!isNaN(filtro)) 
        //validamos si el filtro es un numero
        {
            TipDocModel.crulMostrarTipDoc(filtro, function (error, data)
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
        var TipDocData = 
            {
                id_tipo_identificacion: null,
                nombre_tipo_identificacion: req.body.nombre_tipo_identificacion,
            };
        //usamos la funcion para insertar
        TipDocModel.crulCrearTipDoc(TipDocData, function (error, data)
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
        var TipDocData =
            {
                id_tipo_identificacion: req.body.id_tipo_identificacion, 
                nombre_tipo_identificacion: req.body.nombre_tipo_identificacion,
            };
        //usamos la funcion para actualizar
        TipDocModel.crulModificarTipDoc(TipDocData, function (error, data)
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
