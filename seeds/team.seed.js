const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Team } = require("../models/Team.js");
const { resetTeam } = require("../utils/resetTeam");

const teamList = [
  { teamName: "ATLÉTICO DE MADRID", foundedIn: 1903, originCity: "MADRID" },
  { teamName: "REAL MADRID", foundedIn: 1902, originCity: "MADRID" },
  { teamName: "FC BARCELONA", foundedIn: 1899, originCity: "BARCELONA" },
  { teamName: "PARIS SAINT GERMAIN", foundedIn: 1970, originCity: "PARIS" },
];

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
