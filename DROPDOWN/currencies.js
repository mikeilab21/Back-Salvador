const fs = require('fs/promises');
const path = require('path');

async function getCurrencies() {
  try {
    // Lee el archivo currencies.json
    const filePath = path.join(__dirname, 'currencies.json');
    const content = await fs.readFile(filePath, 'utf-8');
    const currenciesData = JSON.parse(content);

    return currenciesData;
  } catch (error) {
    console.error('Error al leer el archivo: ', error);
    throw new Error('Error al obtener la lista de monedas.');
  }
}

module.exports = getCurrencies;