//Optenemos las librerias
var express = require('express');
var router = express.Router();

//obtenemos el modelo DetallesProduccionmodel
var DetallesProduccionModel = require('../modelos/ModeloDetallesProduccion'); //aqui importamos

module.exports = function ()
{    //-------------------------------------------------------------------------------------------------//
    //Muestra el método CRUL Listar 
    router.get("/", function (req, res)
    {

        DetallesProduccionModel.crulMostrarDetallesProduccionx(function (error, data)
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
            DetallesProduccionModel.crulMostrarDetallesProduccion(filtro, function (error, data)
            {
                //si el tipo de documento existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0) 
                {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else
                {
                    res.json(404, 
                    { 
                        "msg": "Registro no Existe" 
                    });
                }
            });
        }
        else 
        {
            res.status(500).json({ "msg": "error" });
        }


    });



     //------------------------------------------------------------------------------------------------//
    //Muestra el método CRUL read para solucionar el problema
    router.get("/:Id", function (req, res)
    {
 
        var filtro = req.params.Id;
        if (!isNaN(filtro)) 
        //validamos si el filtro es un numero
        {
            DetallesProduccionModel.crulMostrarDetallesProduccionxid(filtro, function (error, data)
            {
                //si el tipo de documento existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0) 
                {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else
                {
                    res.json(404, 
                    { 
                        "msg": "Registro no Existe" 
                    });
                }
            });
        }
        else 
        {
            res.status(500).json({ "msg": "error bebe"+filtro });
        }


    });



    //------------------------------------------------------------------------------------------------//
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res)
    {
        var DetallesProduccionData =  
            {
                id_detallesproduccion: null,
                id_insumo: req.body.id_insumo,
                id_vaca: req.body.id_vaca,
                id_empleado: req.body.id_empleado,
                ManodeObra: req.body.ManodeObra,
                Fertilizantes: req.body.Fertilizantes,
                Arreglopraderas: req.body.Arreglopraderas,
                MantenimientoMaquinas: req.body.MantenimientoMaquinas,
                ReparacionCercas: req.body.ReparacionCercas,
                Servicios: req.body.Servicios,
                CostoTotal: req.body.CostoTotal,
                fecha_registro: req.body.fecha_registro,
                litros_leche: req.body.litros_leche,
            };

        //usamos la funcion para insertar
        DetallesProduccionModel.crulCrearDetallesProduccion(DetallesProduccionData, function (error, data)
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
        var DetallesProduccionData =
        {
            id_detallesproduccion: req.body.id_detallesproduccion,
            id_insumo: req.body.id_insumo,
            id_vaca: req.body.id_vaca,
            id_empleado: req.body.id_empleado,
            ManodeObra: req.body.ManodeObra,
            Fertilizantes: req.body.Fertilizantes,
            Arreglopraderas: req.body.Arreglopraderas,
            MantenimientoMaquinas: req.body.MantenimientoMaquinas,
            ReparacionCercas: req.body.ReparacionCercas,
            Servicios: req.body.Servicios,
            CostoTotal: req.body.CostoTotal,
            fecha_registro: req.body.fecha_registro,
            litros_leche: req.body.litros_leche,
        };

        //usamos la funcion para actualizar
        DetallesProduccionModel.crulModificarDetallesProduccion(DetallesProduccionData, function (error, data)
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
    //Informe produccion por periodo de tiempo y empleado
    router.post("/informeempleado", function (req, res)
    {
        //Creamos un objeto json con lo datos del informe
        var ProduccionData = 
            {
                id_empleado: req.body.id_empleado,
                feinicio: req.body.feinicio,
                fechafin: req.body.fechafin

            };

        //usamos la funcion para insertar
        DetallesProduccionModel.crulInformeEmpleado(ProduccionData, function (error, data)
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
    //Muestra el método INFORME EMPLEADO OPCIONAL
    router.get("/infoempleado/:id/:feinicio/:fechafin", function (req, res)
    {
 
        var filtro = req.params.id;
    
        var FechaInicio = req.params.feinicio;
        var FechaFinal = req.params.fechafin;

        if (filtro != "" || filtro !=null || FechaInicio != "" || FechaInicio !=null || FechaFinal != "" || FechaFinal !=null) 
        //validamos si el filtro es un numero
        {
            DetallesProduccionModel.crulInformeEmpleadoOPCIONAL(filtro,FechaInicio,FechaFinal, function (error, data)
            {
                //si el tipo de documento existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0) 
                {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else
                {
                    res.json(404, 
                    { 
                        "msg": "Registro no Existe" 
                    });
                }
            });
        }
        else 
        {
            res.status(500).json({ "msg": "error bebe"+filtro });
        }


    });



    //------------------------------------------------------------------------------------------------//
    //Informe Produccion por periodo de tiempo y vaca
    router.post("/informevaca", function (req, res)
    {
        var ProduccionData = 
            {
                id_vaca: req.body.id_vaca,
                feinicio: req.body.feinicio,
                fechafin: req.body.fechafin

            };

        //usamos la funcion para insertar
        DetallesProduccionModel.InformeVaca(ProduccionData, function (error, data)
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

    //Muestra el método INFORME Vacas OPCIONAL
    router.get("/infovacas/:id/:feinicio/:fechafin", function (req, res)
    {
 
        var filtro = req.params.id;
    
        var FechaInicio = req.params.feinicio;
        var FechaFinal = req.params.fechafin;

        if (filtro != "" || filtro !=null || FechaInicio != "" || FechaInicio !=null || FechaFinal != "" || FechaFinal !=null) 
        //validamos si el filtro es un numero
        {
            DetallesProduccionModel.crulInformeVacaOPCIONAL(filtro,FechaInicio,FechaFinal, function (error, data)
            {
                //si el tipo de documento existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0) 
                {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else
                {
                    res.json(404, 
                    { 
                        "msg": "Registro no Existe" 
                    });
                }
            });
        }
        else 
        {
            res.status(500).json({ "msg": "error bebe"+filtro });
        }


    });
    //------------------------------------------------------------------------------------------------//
    //exportamos el objeto para tenerlo disponible en el app
    return router;
}