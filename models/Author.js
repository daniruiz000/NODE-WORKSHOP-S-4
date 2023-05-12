//  Importamos Mongoose
const mongoose = require("mongoose");

// Declaramos nuestro esquema que nos permite declarar nuestros objetos y crearle restricciones.
const Schema = mongoose.Schema;

// Creamos esquema del player:

const allowedPosition = ["GOALKEEPER", "DEFENDER", "MIDFIELDER", "FORWARD"];

const playerSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, enum: allowedPosition, require: true },
    playerNumber: { type: Number, min: 1, max: 99, require: true },
  },
  { timestamps: true } // Cada vez que se modifique un documento refleja la hora y fecha de modificación
);

// Creamos un modelo para que siempre que creamos un player valide contra el Schema que hemos creado para ver si es valido.
const Player = mongoose.model("Player", playerSchema);

//  Exportamos el modelo para poder usarlo fuera.
module.exports = { Player };
