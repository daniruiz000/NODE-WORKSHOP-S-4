const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { resetMatches } = require("../utils/resetMatches.js");
const { resetPlayers } = require("../utils/resetPlayers.js");
const { resetTeams } = require("../utils/resetTeams.js");

const allSeed = async () => {
  try {
    await connect();
    console.log("Tenemos conexión");
    await resetPlayers();
    await resetTeams();
    await resetMatches();
  } catch (error) {
    console.error("ERROR AL CONECTAR CON LA BBDD");
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

allSeed();
