const generateRandomDate = (currentDate) => {
  const currentYear = currentDate.getFullYear();
  const randomYear = currentYear + Math.floor(Math.random() * 2); // Genera el año actual o el siguiente de forma aleatoria
  const randomMonth = Math.floor(Math.random() * 12); // Genera un mes aleatorio (0-11)
  const randomDay = Math.floor(Math.random() * 28) + 1; // Genera un día aleatorio (1-28)

  return new Date(randomYear, randomMonth, randomDay);
};

module.exports = { generateRandomDate };
