//Optenemos las librerias
var express = require('express');
var router = express.Router();

//obtenemos el modelo ModeloInsumoLeche
var InsumoLecheModel = require('../modelos/ModeloInsumoLeche');

module.exports = function ()
{
    //-------------------------------------------------------------------------------------------------//
    //Muestra el método CRUL Listar 
    router.get("/", function (req, res)
    {
        InsumoLecheModel.crulMostrarInsumoLechex(function (error, data)
        {
            res.status(200).json(data);
        });
    });
    //-------------------------------------------------------------------------------------------------//
    //Muestra el método CRUL read(leer)
    router.get("/:Id", function (req, res)
    {
        var filtro = req.params.Id;
        if (!isNaN(filtro)) 
        //validamos si el filtro es un numero
        {
            InsumoLecheModel.crulMostrarInsumoLeche(filtro, function (error, data)
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
        var InsumoLecheData = 
            {
                id_insumo: null,
                descripcion: req.body.descripcion,
                NombreInsumo: req.body.NombreInsumo,
                fecha_suministro: req.body.fecha_suministro,
                cantidadtotal: req.body.cantidadtotal,
                cantidaddisponible: req.body.cantidaddisponible,
            };

        //usamos la funcion para insertar
        InsumoLecheModel.crulCrearInsumoLeche(InsumoLecheData, function (error, data)
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
        var InsumoLecheData =
        {
            id_insumo: req.body.id_insumo,
            descripcion: req.body.descripcion,
            NombreInsumo: req.body.NombreInsumo,
            fecha_suministro: req.body.fecha_suministro,
            cantidadtotal: req.body.cantidadtotal,
            cantidaddisponible: req.body.cantidaddisponible,
        };

        //usamos la funcion para actualizar
        InsumoLecheModel.crulModificarInsumoLeche(InsumoLecheData, function (error, data)
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