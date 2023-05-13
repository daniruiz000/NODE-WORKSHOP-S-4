const mongoose = require("mongoose");

const { connect } = require("../db.js");
const { teamRelations } = require("../utils/teamRelations.js");

const teamRelationsSeed = async () => {
  try {
    await connect();
    console.log("Tenemos conexión");
    await teamRelations();
  } catch (error) {
    console.error("ERROR AL CONECTAR CON LA BBDD");
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

teamRelationsSeed();
