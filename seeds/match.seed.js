const mongoose = require("mongoose");

const { connect } = require("../db.js");
const { resetMatches } = require("../utils/resetMatches.js");

const matchSeed = async () => {
  try {
    await connect();
    console.log("Tenemos conexión");
    await resetMatches();
  } catch (error) {
    console.error("ERROR AL CONECTAR CON LA BBDD");
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

matchSeed();
