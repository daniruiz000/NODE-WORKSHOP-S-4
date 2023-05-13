const { Team } = require("../models/Team");
const { Match } = require("../models/Match");

const { generateRandomDate } = require("../utils/generateRandomDate");
const { generateRandom } = require("../utils/generateRandom");

const resetMatches = async (teams) => {
  try {
    const teams = await Team.find();
    if (!teams.length) {
      console.error("No hay teams en la BBDD.");
      return;
    }

    const matches = [];
    const currentDate = new Date();

    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        const matchDate = generateRandomDate(currentDate);
        const currentMatch = matchDate <= currentDate;

        const match = {
          localTeam: teams[i]._id,
          awayTeam: teams[j]._id,
          localTeamGoal: generateRandom(0, 5),
          awayTeamGoal: generateRandom(0, 5),
          currentMatch,
          matchDate,
        };
        matches.push(match);
      }
    }
    // Save the matches to the database
    await Match.collection.drop(); //  Esperamos a que borre los documentos de la colección matche de la BBDD.
    console.log("Borrados matches");
    const documents = matches.map((match) => new Match(match));
    await Match.insertMany(documents); //  Esperamos a que inserte los nuevos documentos creados en la colección matche de la BBDD.
    console.log("Creados matches correctamente");
  } catch (error) {
    console.error(error);
  }
  // Shuffle the teams to randomize match pairings
};
module.exports = { resetMatches };
