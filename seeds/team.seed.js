const mongoose = require("mongoose");

const { connect } = require("../db.js");
const { resetTeams } = require("../utils/resetTeams");

const teamSeed = async () => {
  try {
    await connect();
    console.log("Tenemos conexión");
    await resetTeams();
  } catch (error) {
    console.error("ERROR AL CONECTAR CON LA BBDD");
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

teamSeed();
