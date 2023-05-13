const mongoose = require("mongoose");

const { connect } = require("../db.js");
const { resetPlayers } = require("../utils/resetPlayers");

const playerSeed = async () => {
  try {
    await connect();
    console.log("Tenemos conexión");
    await resetPlayers();
  } catch (error) {
    console.error("ERROR AL CONECTAR CON LA BBDD");
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

playerSeed();
