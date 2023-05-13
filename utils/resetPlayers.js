const { Player } = require("../models/Player.js");

const playerList = [
  {
    firstName: "Lionel",
    lastName: "Messi",
    position: "FORWARD",
    playerNumber: 10,
  },
  {
    firstName: "Cristiano",
    lastName: "Ronaldo",
    position: "FORWARD",
    playerNumber: 7,
  },
  {
    firstName: "Neymar",
    lastName: "Jr.",
    position: "FORWARD",
    playerNumber: 10,
  },
  {
    firstName: "Kylian",
    lastName: "Mbappe",
    position: "FORWARD",
    playerNumber: 7,
  },
  {
    firstName: "Robert",
    lastName: "Lewandowski",
    position: "FORWARD",
    playerNumber: 9,
  },
  {
    firstName: "Kevin",
    lastName: "De Bruyne",
    position: "MIDFIELDER",
    playerNumber: 17,
  },
  {
    firstName: "Luka",
    lastName: "Modric",
    position: "MIDFIELDER",
    playerNumber: 10,
  },
  {
    firstName: "N'Golo",
    lastName: "Kante",
    position: "MIDFIELDER",
    playerNumber: 7,
  },
  {
    firstName: "Sadio",
    lastName: "Mane",
    position: "FORWARD",
    playerNumber: 10,
  },
  {
    firstName: "Mohamed",
    lastName: "Salah",
    position: "FORWARD",
    playerNumber: 11,
  },
  {
    firstName: "Virgil",
    lastName: "Van Dijk",
    position: "DEFENDER",
    playerNumber: 4,
  },
  {
    firstName: "Jan",
    lastName: "Oblak",
    position: "GOALKEEPER",
    playerNumber: 13,
  },
  {
    firstName: "Thibaut",
    lastName: "Courtois",
    position: "GOALKEEPER",
    playerNumber: 1,
  },
  {
    firstName: "Marc-Andre",
    lastName: "ter Stegen",
    position: "GOALKEEPER",
    playerNumber: 1,
  },
  {
    firstName: "Kalidou",
    lastName: "Koulibaly",
    position: "DEFENDER",
    playerNumber: 26,
  },
  {
    firstName: "Giorgio",
    lastName: "Chiellini",
    position: "DEFENDER",
    playerNumber: 3,
  },
  {
    firstName: "Leonardo",
    lastName: "Bonucci",
    position: "DEFENDER",
    playerNumber: 19,
  },
  {
    firstName: "Luis",
    lastName: "Suarez",
    position: "FORWARD",
    playerNumber: 9,
  },
  {
    firstName: "Jose",
    lastName: "Gimenez",
    position: "DEFENDER",
    playerNumber: 2,
  },
  {
    firstName: "Antoine",
    lastName: "Griezmann",
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
