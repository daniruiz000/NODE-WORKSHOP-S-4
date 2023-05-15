// Importamos express:
const express = require("express");

// Importamos el modelo que nos sirve tanto para importar datos como para leerlos:
const { Match } = require("../models/Match.js");

// Importamos la función que nos sirve para resetear los match:
const { resetMatches } = require("../utils/resetMatches.js");
const { resetPlayers } = require("../utils/resetPlayers.js");
const { resetTeams } = require("../utils/resetTeams.js");
const { teamRelations } = require("../utils/teamRelations.js");

// Router propio de match:
const router = express.Router();

// --------------------------------------------------------------------------------------------
// ------------------------------- ENDPOINTS DE /match ---------------------------------------
// --------------------------------------------------------------------------------------------

/*  Endpoint para recuperar todos los matchs de manera paginada en función de un limite de elementos a mostrar
por página para no saturar al navegador (CRUD: READ):
*/

router.get("/", async (req, res) => {
  // Si funciona la lectura...
  try {
    // Recogemos las query params de esta manera req.query.parametro.
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    const matchs = await Match.find() // Devolvemos los matchs si funciona. Con modelo.find().
      .populate(["localTeam", "awayTeam"])
      .limit(limit) // La función limit se ejecuta sobre el .find() y le dice que coga un número limitado de elementos, coge desde el inicio a no ser que le añadamos...
      .skip((page - 1) * limit); // La función skip() se ejecuta sobre el .find() y se salta un número determinado de elementos y con este cálculo podemos paginar en función del limit. // Con populate le indicamos que si recoge un id en la propiedad señalada rellene con los campos de datos que contenga ese id
    //  Creamos una respuesta más completa con info de la API y los datos solicitados por el match:
    const totalElements = await Match.countDocuments(); //  Esperamos aque realice el conteo del número total de elementos con modelo.countDocuments()
    const totalPagesByLimit = Math.ceil(totalElements / limit); // Para saber el número total de páginas que se generan en función del limit. Math.ceil() nos elimina los decimales.

    // Respuesta Completa:
    const response = {
      totalItems: totalElements,
      totalPages: totalPagesByLimit,
      currentPage: page,
      data: matchs,
    };
    // Enviamos la respuesta como un json.
    res.json(response);

    // Si falla la lectura...
  } catch (error) {
    console.error(error);
    res.status(500).json(error); //  Devolvemos un código de error 500 y el error.
  }
});

/* Ejemplo de REQ indicando que queremos la página 4 estableciendo un limite de 10 elementos
 por página (limit = 10 , pages = 4):
 http://localhost:3000/match?limit=10&page=4 */

//  ------------------------------------------------------------------------------------------

//  Endpoint para recuperar un match en concreto a través de su id ( modelo.findById()) (CRUD: READ):

router.get("/:id", async (req, res) => {
  // Si funciona la lectura...
  try {
    const id = req.params.id; //  Recogemos el id de los parametros de la ruta.
    const match = await Match.findById(id).populate(["localTeam", "awayTeam"]); //  Buscamos un documentos con un id determinado dentro de nuestro modelo con modelo.findById(id a buscar).
    if (match) {
      res.json(match); //  Si existe el match lo mandamos como respuesta en modo json.
    } else {
      res.status(404).json({}); //    Si no existe el match se manda un json vacio y un código 400.
    }

    // Si falla la lectura...
  } catch (error) {
    console.error(error);
    res.status(500).json(error); //  Devolvemos un código de error 500 y el error.
  }
});

// Ejemplo de REQ:
// http://localhost:3000/match/id del match a buscar

//  ------------------------------------------------------------------------------------------

//  Endpoint para añadir elementos (CRUD: CREATE):

router.post("/", async (req, res) => {
  // Si funciona la escritura...
  try {
    const match = new Match(req.body); //     Un nuevo match es un nuevo modelo de la BBDD que tiene un Scheme que valida la estructura de esos datos que recoge del body de la petición.
    const createdMatch = await match.save(); // Esperamos a que guarde el nuevo match creado en caso de que vaya bien. Con el metodo .save().
    return res.status(201).json(createdMatch); // Devolvemos un código 201 que significa que algo se ha creado y el match creado en modo json.

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

/* Petición tipo de POST para añadir un nuevo match (añadimos al body el nuevo match con sus propiedades que tiene que cumplir con el Scheme de nuestro modelo) identificado por su id:
 const newMatch = {name: "Prueba Nombre", country: "Prueba country"}
 fetch("http://localhost:3000/match/",{"body": JSON.stringify(newMatch),"method":"POST","headers":{"Accept":"application/json","Content-Type":"application/json"}}).then((data)=> console.log(data)) */
//  ------------------------------------------------------------------------------------------

//  Endpoint para resetear los datos de match:

router.delete("/reset", async (req, res) => {
  // Si funciona el reseteo...
  const all = req.query.all === "true";

  try {
    if (all) {
      await resetPlayers();
      await resetTeams();
      await teamRelations();
      await resetMatches();
      res.send("Datos Globales reseteados");
    } else {
      await resetMatches();
      res.send("Datos Match reseteados");
    }

    // Si falla el reseteo...
  } catch (error) {
    console.error(error);
    res.status(500).json(error); //  Devolvemos un código 500 de error si falla el reseteo de datos y el error.
  }
});

//  ------------------------------------------------------------------------------------------

//  Endpoint para eliminar match identificado por id (CRUD: DELETE):

router.delete("/:id", async (req, res) => {
  // Si funciona el borrado...
  try {
    const id = req.params.id; //  Recogemos el id de los parametros de la ruta.
    const matchDeleted = await Match.findByIdAndDelete(id); // Esperamos a que nos devuelve la info del match eliminado que busca y elimina con el metodo findByIdAndDelete(id del match a eliminar).
    if (matchDeleted) {
      res.json(matchDeleted); //  Devolvemos el match eliminado en caso de que exista con ese id.
    } else {
      res.status(404).json({}); //  Devolvemos un código 404 y un objeto vacio en caso de que no exista con ese id.
    }

    // Si falla el borrado...
  } catch (error) {
    console.error(error);
    res.status(500).json(error); //  Devolvemos un código 500 de error si falla el delete y el error.
  }
});

/* Petición tipo DELETE para eliminar un match (no añadimos body a la busqueda y recogemos el id de los parametros de la ruta) identificado por su id:

fetch("http://localhost:3000/match/id del match a borrar",{"method":"DELETE","headers":{"Accept":"application/json","Content-Type":"application/json"}}).then((data)=> console.log(data))
*/

//  ------------------------------------------------------------------------------------------

//  Endpoint para actualizar un elemento identificado por id (CRUD: UPDATE):

router.put("/:id", async (req, res) => {
  // Si funciona la actualización...
  try {
    const id = req.params.id; //  Recogemos el id de los parametros de la ruta.
    const matchUpdated = await Match.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }); // Esperamos que devuelva la info del match actualizado al que tambien hemos pasado un objeto con los campos q tiene que acualizar en la req del body de la petición. {new: true} Le dice que nos mande el match actualizado no el antiguo. Lo busca y elimina con el metodo findByIdAndDelete(id del match a eliminar).
    if (matchUpdated) {
      res.json(matchUpdated); //  Devolvemos el match actualizado en caso de que exista con ese id.
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
de un match en concreto (recogemos el id de los parametros de la ruta ):

fetch("http://localhost:3000/match/id del match a actualizar",{"body": JSON.stringify({country: "Prueba country"}),"method":"PUT","headers":{"Accept":"application/json","Content-Type":"application/json"}}).then((data)=> console.log(data))
*/

//  ------------------------------------------------------------------------------------------
// Exportamos
module.exports = { matchRouter: router };
