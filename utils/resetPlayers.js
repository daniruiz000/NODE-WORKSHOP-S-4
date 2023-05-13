const { Player } = require("../models/Player.js");

const playerList = [
  {
    firstName: "LIONEL",
    lastName: "MESSI",
    position: "FORWARD",
    playerNumber: 10,
  },
  {
    firstName: "CRISTIANO",
    lastName: "RONALDO",
    position: "FORWARD",
    playerNumber: 7,
  },
  {
    firstName: "NEYMAR",
    lastName: "JR.",
    position: "FORWARD",
    playerNumber: 10,
  },
  {
    firstName: "KYLIAN",
    lastName: "MBAPPE",
    position: "FORWARD",
    playerNumber: 7,
  },
  {
    firstName: "ROBERT",
    lastName: "LEWANDOWSKI",
    position: "FORWARD",
    playerNumber: 9,
  },
  {
    firstName: "KEVIN",
    lastName: "DE BRUYNE",
    position: "MIDFIELDER",
    playerNumber: 17,
  },
  {
    firstName: "LUKA",
    lastName: "MODRIC",
    position: "MIDFIELDER",
    playerNumber: 10,
  },
  {
    firstName: "N'GOLO",
    lastName: "KANTE",
    position: "MIDFIELDER",
    playerNumber: 7,
  },
  {
    firstName: "SADIO",
    lastName: "MANE",
    position: "FORWARD",
    playerNumber: 10,
  },
  {
    firstName: "MOHAMED",
    lastName: "SALAH",
    position: "FORWARD",
    playerNumber: 11,
  },
  {
    firstName: "VIRGIL",
    lastName: "VAN DIJK",
    position: "DEFENDER",
    playerNumber: 4,
  },
  {
    firstName: "JAN",
    lastName: "OBLAK",
    position: "GOALKEEPER",
    playerNumber: 13,
  },
  {
    firstName: "THIBAUT",
    lastName: "COURTOIS",
    position: "GOALKEEPER",
    playerNumber: 1,
  },
  {
    firstName: "MARC-ANDRE",
    lastName: "TER STEGEN",
    position: "GOALKEEPER",
    playerNumber: 1,
  },
  {
    firstName: "KALIDOU",
    lastName: "KOULIBALY",
    position: "DEFENDER",
    playerNumber: 26,
  },
  {
    firstName: "GIORGIO",
    lastName: "CHIELLINI",
    position: "DEFENDER",
    playerNumber: 3,
  },
  {
    firstName: "LEONARDO",
    lastName: "BONUCCI",
    position: "DEFENDER",
    playerNumber: 19,
  },
  {
    firstName: "LUIS",
    lastName: "SUAREZ",
    position: "FORWARD",
    playerNumber: 9,
  },
  {
    firstName: "JOSE",
    lastName: "GIMENEZ",
    position: "DEFENDER",
    playerNumber: 2,
  },
  {
    firstName: "ANTOINE",
    lastName: "GRIEZMANN",
    position: "FORWARD",
    playerNumber: 7,
  },
];
const resetPlayers = async () => {
  try {
    await Player.collection.drop();
    console.log("Players borrados correctamente");
    // Add
    const documents = playerList.map((player) => new Player(player));
    await Player.insertMany(documents);
    console.log("Players creados correctamente!");
  } catch (error) {
    console.error("ERROR AL CONECTAR CON LA BBDD");
    console.error(error);
  }
};

module.exports = { resetPlayers };
