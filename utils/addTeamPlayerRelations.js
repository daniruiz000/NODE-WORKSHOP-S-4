// Importamos los modelos:
const { Team } = require("../models/Team");
const { Player } = require("../models/Player");
const { shuffleArray } = require("../utils/shuffleArray");
//  Función de relación entre de elementos de la colección.
const teamRelations = async () => {
  try {
    //  Recuperamos teams, y players:
    const teams = await Team.find();
    if (!teams.length) {
      console.error("No hay equipos en la BBDD.");
      return;
    }
    const players = await Player.find();
    if (!players.length) {
      console.error("No hay jugadores en la BBDD.");
      return;
    }
    // Para cada equipo recogido elegimos un jugador al azar entre los existentes y se lo asignamos como una propiedad a cada equipo.
    const shuffledTeams = shuffleArray(teams);

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      const team = shuffledTeams[i % 4]; // Assign team based on index modulo 4

      player.team = team;
      await player.save(); // Save player with assigned team
    }
    console.log("Relaciones entre equipos creadas correctamente");
  } catch (error) {
    //  Si hay error lanzamos el error por consola.
    console.error(error);
  }
};

module.exports = { teamRelations }; // Exportamos la función para poder usarla.
