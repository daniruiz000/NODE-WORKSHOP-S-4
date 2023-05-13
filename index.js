// Importamos express.
const express = require("express");

// Importamos librería cors:
const cors = require("cors");

// Importamos los routers creados.
const { playerRouter } = require("./routes/player.routes"); //  LO IMPORTAMOS COMO UN OBJETO.
const { teamRouter } = require("./routes/team.routes");
const { matchRouter } = require("./routes/match.routes");

// --------------------------------------------------------------------------------------------

//  Función asíncrona que gestiona nuestra API.
const main = async () => {
  // Conexión a la base de datos.
  const { connect } = require("./db.js"); // Importamos el archivo de conexión a la BBDD.
  const database = await connect(); //  Conectamos con la BBDD.

  //  Configuración del server.
  const PORT = 3000; //  Definimos el puerto..
  const server = express(); // Definimos el server. Lo gestionará express.
  server.use(express.json()); // Sepa interpretar los JSON
  server.use(express.urlencoded({ extended: false })); //  Sepa interpretar bien los parametros de las rutas.
  server.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"] })); // Utilice la libreria cors para gestionar la seguridad de acceso a la API

  // Definimos el routerHome que será el encargado de manejar las peticiones a nuestras rutas en la raíz.
  const routerHome = express.Router();

  // ENDPOINT DE /:

  // Endpoint de la Home de nuestra API.
  routerHome.get("/", (req, res) => {
    res.send(`Esta es la Home de nuestra API. Estamos usando la BBDD de ${database.connection.name}`);
  });

  //  Para que todas las peticiones que no se correspondan con nuestras rutas den un codigo 404 y manden un mensaje de error.
  routerHome.get("*", (req, res) => {
    res.status(404).send("Lo sentimos :( No hemos encontrado la página requerida.");
  });

  // Asignación de los routers para las diferentes rutas creadas:
  //  Usamos las rutas (el orden es importante más restrictivos a menos):
  server.use("/player", playerRouter); //  Le decimos al server que utilice el publisherRouter importado para gestionar las rutas que tengan "/publisher".
  server.use("/team", teamRouter); //  Le decimos al server que utilice el authorRouter importado para gestionar las rutas que tengan "/author".
  server.use("/match", matchRouter); //  Le decimos al server que utilice el bookRouter importado para gestionar las rutas que tengan "/book".
  server.use("/", routerHome); //  Decimos al server que utilice el routerHome en la raíz.

  //  Levantamos el server en el puerto indicado:
  server.listen(PORT, () => {
    console.log(`Server levantado en puerto ${PORT}`);
  });
};

// --------------------------------------------------------------------------------------------

main(); //  Llamamos a la función de gestión de nuestra API.
