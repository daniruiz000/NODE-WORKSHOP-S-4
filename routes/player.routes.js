// Importamos express:
const express = require("express");

// Importamos el modelo que nos sirve tanto para importar datos como para leerlos:
const { Player } = require("../models/Player.js");

// Importamos la función que nos sirve para resetear los player:
const { resetPlayers } = require("../utils/resetPlayers.js");

// Router propio de player:
const router = express.Router();

// --------------------------------------------------------------------------------------------
// ------------------------------- ENDPOINTS DE /player ---------------------------------------
// --------------------------------------------------------------------------------------------

/*  Endpoint para recuperar todos los players de manera paginada en función de un limite de elementos a mostrar
por página para no saturar al navegador (CRUD: READ):
*/

router.get("/", async (req, res) => {
  // Si funciona la lectura...
  try {
    // Recogemos las query params de esta manera req.query.parametro.
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    const players = await Player.find() // Devolvemos los players si funciona. Con modelo.find().
      .limit(limit) // La función limit se ejecuta sobre el .find() y le dice que coga un número limitado de elementos, coge desde el inicio a no ser que le añadamos...
      .skip((page - 1) * limit); // La función skip() se ejecuta sobre el .find() y se salta un número determinado de elementos y con este cálculo podemos paginar en función del limit. // Con populate le indicamos que si recoge un id en la propiedad señalada rellene con los campos de datos que contenga ese id
    //  Creamos una respuesta más completa con info de la API y los datos solicitados por el player:
    const totalElements = await Player.countDocuments(); //  Esperamos aque realice el conteo del número total de elementos con modelo.countDocuments()
    const totalPagesByLimit = Math.ceil(totalElements / limit); // Para saber el número total de páginas que se generan en función del limit. Math.ceil() nos elimina los decimales.

    // Respuesta Completa:
    const response = {
      totalItems: totalElements,
      totalPages: totalPagesByLimit,
      currentPage: page,
      data: players,
    };
    // Enviamos la respuesta como un json.
    res.json(response);

    // Si falla la lectura...
  } catch (error) {
    res.status(500).json(error); //  Devolvemos un código de error 500 y el error.
  }
});

/* Ejemplo de REQ indicando que queremos la página 4 estableciendo un limite de 10 elementos
 por página (limit = 10 , pages = 4):
 http://localhost:3000/player?limit=10&page=4 */

//  ------------------------------------------------------------------------------------------

//  Endpoint para recuperar un player en concreto a través de su id ( modelo.findById()) (CRUD: READ):

router.get("/:id", async (req, res) => {
  // Si funciona la lectura...
  try {
    const id = req.params.id; //  Recogemos el id de los parametros de la ruta.
    const player = await Player.findById(id); //  Buscamos un documentos con un id determinado dentro de nuestro modelo con modelo.findById(id a buscar).
    if (player) {
      res.json(player); //  Si existe el player lo mandamos como respuesta en modo json.
    } else {
      res.status(404).json({}); //    Si no existe el player se manda un json vacio y un código 400.
    }

    // Si falla la lectura...
  } catch (error) {
    res.status(500).json(error); //  Devolvemos un código de error 500 y el error.
  }
});

// Ejemplo de REQ:
// http://localhost:3000/player/id del player a buscar

//  ------------------------------------------------------------------------------------------

//  Endpoint para buscar un player por el nombre ( modelo.findById({name: name})) (CRUD: Operación Custom. No es CRUD):

router.get("/name/:name", async (req, res) => {
  const playerName = req.params.name;
  // Si funciona la lectura...
  try {
    // const player = await player.find({ firstName: name }); //Si quisieramos realizar una busqueda exacta, tal y como está escrito.
    const player = await Player.find({ firstName: new RegExp("^" + playerName.toLowerCase(), "i") }); // Devolvemos los teams si funciona. Con modelo.find().

    //  Esperamos a que realice una busqueda en la que coincida el texto pasado por query params para la propiedad determinada pasada dentro de un objeto, porqué tenemos que pasar un objeto, sin importar mayusc o minusc.
    if (player?.length) {
      res.json(player); //  Si existe el player lo mandamos en la respuesta como un json.
    } else {
      res.status(404).json([]); //   Si no existe el player se manda un json con un array vacio porque la respuesta en caso de haber tenido resultados hubiera sido un array y un mandamos un código 404.
    }

    // Si falla la lectura...
  } catch (error) {
    res.status(500).json(error); //  Devolvemos un código de error 500 y el error.
  }
});

// Ejemplo de REQ:
// http://localhost:3000/player/name/nombre del player a busplayer

//  ------------------------------------------------------------------------------------------

//  Endpoint para añadir elementos (CRUD: CREATE):

router.post("/", async (req, res) => {
  // Si funciona la escritura...
  try {
    const player = new Player(req.body); //     Un nuevo player es un nuevo modelo de la BBDD que tiene un Scheme que valida la estructura de esos datos que recoge del body de la petición.
    const createdPlayer = await player.save(); // Esperamos a que guarde el nuevo player creado en caso de que vaya bien. Con el metodo .save().
    return res.status(201).json(createdPlayer); // Devolvemos un código 201 que significa que algo se ha creado y el player creado en modo json.

    // Si falla la escritura...
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      res.status(400).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

/* Petición tipo de POST para añadir un nuevo player (añadimos al body el nuevo player con sus propiedades que tiene que cumplir con el Scheme de nuestro modelo) identificado por su id:
 const newPlayer = {name: "Prueba Nombre", country: "Prueba country"}
 fetch("http://localhost:3000/player/",{"body": JSON.stringify(newPlayer),"method":"POST","headers":{"Accept":"application/json","Content-Type":"application/json"}}).then((data)=> console.log(data)) */
//  ------------------------------------------------------------------------------------------

//  Endpoint para resetear los datos de player:

router.delete("/reset", async (req, res) => {
  // Si funciona el reseteo...
  try {
    await resetPlayers();
    res.send("Datos Player reseteados");

    // Si falla el reseteo...
  } catch (error) {
    console.error(error);
    res.status(500).json(error); //  Devolvemos un código 500 de error si falla el reseteo de datos y el error.
  }
});

//  ------------------------------------------------------------------------------------------

//  Endpoint para eliminar player identificado por id (CRUD: DELETE):

router.delete("/:id", async (req, res) => {
  // Si funciona el borrado...
  try {
    const id = req.params.id; //  Recogemos el id de los parametros de la ruta.
    const playerDeleted = await Player.findByIdAndDelete(id); // Esperamos a que nos devuelve la info del player eliminado que busca y elimina con el metodo findByIdAndDelete(id del player a eliminar).
    if (playerDeleted) {
      res.json(playerDeleted); //  Devolvemos el player eliminado en caso de que exista con ese id.
    } else {
      res.status(404).json({}); //  Devolvemos un código 404 y un objeto vacio en caso de que no exista con ese id.
    }

    // Si falla el borrado...
  } catch (error) {
    res.status(500).json(error); //  Devolvemos un código 500 de error si falla el delete y el error.
  }
});

/* Petición tipo DELETE para eliminar un player (no añadimos body a la busqueda y recogemos el id de los parametros de la ruta) identificado por su id:

fetch("http://localhost:3000/player/id del player a borrar",{"method":"DELETE","headers":{"Accept":"application/json","Content-Type":"application/json"}}).then((data)=> console.log(data))
*/

//  ------------------------------------------------------------------------------------------

//  Endpoint para actualizar un elemento identificado por id (CRUD: UPDATE):

router.put("/:id", async (req, res) => {
  // Si funciona la actualización...
  try {
    const id = req.params.id; //  Recogemos el id de los parametros de la ruta.
    const playerUpdated = await Player.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }); // Esperamos que devuelva la info del player actualizado al que tambien hemos pasado un objeto con los campos q tiene que acualizar en la req del body de la petición. {new: true} Le dice que nos mande el player actualizado no el antiguo. Lo busca y elimina con el metodo findByIdAndDelete(id del player a eliminar).
    if (playerUpdated) {
      res.json(playerUpdated); //  Devolvemos el player actualizado en caso de que exista con ese id.
    } else {
      res.status(404).json({}); //  Devolvemos un código 404 y un objeto vacio en caso de que no exista con ese id.
    }

    // Si falla la actualización...
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      res.status(400).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

/* Petición tipo de PUT para actualizar datos concretos (en este caso el tlf) recogidos en el body,
de un player en concreto (recogemos el id de los parametros de la ruta ):

fetch("http://localhost:3000/player/id del player a actualizar",{"body": JSON.stringify({country: "Prueba country"}),"method":"PUT","headers":{"Accept":"application/json","Content-Type":"application/json"}}).then((data)=> console.log(data))
*/

//  ------------------------------------------------------------------------------------------
// Exportamos
module.exports = { playerRouter: router };
