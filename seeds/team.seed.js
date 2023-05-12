const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { resetTeam } = require("../utils/resetTeam");

const teamSeed = async () => {
  try {
    await connect();
    console.log("Tenemos conexión");
    await resetTeam();
  } catch (error) {
    console.error("ERROR AL CONECTAR CON LA BBDD");
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

teamSeed();
