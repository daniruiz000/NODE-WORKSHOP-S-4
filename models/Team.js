const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const allowedTeams = ["ATLÉTICO DE MADRID", "REAL MADRID", "FC BARCELONA", "PARIS SAINT GERMAIN"];
const allowedCities = ["MADRID", "BARCELONA", "PARIS"];
// Creamos el schema del team
const teamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: true,
      enum: allowedTeams,
    },
    foundedIn: {
      type: Date,
      required: true,
    },
    originCity: {
      type: String,
      required: true,
      enum: allowedCities,
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);
module.exports = { Team };
