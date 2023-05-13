const mongoose = require("mongoose");
const { Team } = require("../models/Team");
const { Match } = require("../models/Match");
// Utils import
const { getRandomDate } = require("../utils/getRandomDate");
const { shuffleArray } = require("../utils/shuffleArray");

const resetMatches = async (teams) => {
  try {
    const teams = await Team.find();
    if (!teams.length) {
      console.error("No hay teams en la BBDD.");
      return;
    }
    const shuffledTeams = shuffleArray(teams);

    const matches = [];

    // Generate matches for each round
    for (let i = 0; i < shuffledTeams.length - 1; i++) {
      const roundMatches = [];

      for (let j = 0; j < shuffledTeams.length / 2; j++) {
        const localTeam = shuffledTeams[j];
        const awayTeam = shuffledTeams[shuffledTeams.length - 1 - j];

        // Create a new match object with a random date within the next 7 days
        const match = {
          localTeam: localTeam._id,
          awayTeam: awayTeam._id,
          localTeamGoal: 0,
          awayTeamGoal: 0,
          currentMatch: false,
          matchDate: getRandomDate(new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
        };

        roundMatches.push(match);
      }

      // Rotate the teams to create different pairings for the next round
      shuffledTeams.splice(1, 0, shuffledTeams.pop());

      matches.push(roundMatches);
    }

    // Save the matches to the database
    for (const roundMatches of matches) {
      await mongoose.model("Match").insertMany(roundMatches);
    }

    console.log(`Created ${matches.length} rounds of matches`);
    await Match.collection.drop(); //  Esperamos a que borre los documentos de la colección matche de la BBDD.
    console.log("Borrados matches");
    await Match.insertMany(matches); //  Esperamos a que inserte los nuevos documentos creados en la colección matche de la BBDD.
    console.log("Creados matches correctamente");
  } catch (error) {
    console.error(error);
  }
  // Shuffle the teams to randomize match pairings
};

module.exports = { resetMatches };
