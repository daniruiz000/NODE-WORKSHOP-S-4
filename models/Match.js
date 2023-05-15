//  Importamos Mongoose
const mongoose = require("mongoose");

// Declaramos nuestro esquema que nos permite declarar nuestros objetos y crearle restricciones.
const Schema = mongoose.Schema;

// Creamos esquema del match:

const matchSchema = new Schema(
  {
    localTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    localTeamGoal: { type: Number, min: [0, "Mínimo 0 goles"], require: true },
    awayTeamGoal: { type: Number, min: [0, "Mínimo 0 goles"], require: true },
    currentMatch: { type: Boolean, require: true },
    matchDate: { type: Date, require: true },
  },
  { timestamps: true } // Cada vez que se modifique un documento refleja la hora y fecha de modificación
);

// Creamos un modelo para que siempre que creamos un match valide contra el Schema que hemos creado para ver si es valido.
const Match = mongoose.model("Match", matchSchema);

//  Exportamos el modelo para poder usarlo fuera.
module.exports = { Match };
