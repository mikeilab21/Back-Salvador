const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const createUserAndUpdateIdentity = require('./POST/prueba');
const base64Encode = require('./GET/pruebaxapikeyLogin');
const loginAndGetIdentity = require('./GET/login');
const getIdentityByNumber = require('./GET/getIdentityNumber');
const getTransactionsByIdentityId = require('./GET/getTransactions');
const getWithdrawalsByIdentityId = require('./GET/getWithdrawals');
const getSendsFromByIdentityId = require('./GET/getSendsFrom');
const getSendsToByIdentityId = require('./GET/getSendsTo');
const getAllSend = require('./GET/getAll');
const getCurrencies = require('./DROPDOWN/currencies');
const getDocumentType = require('./DROPDOWN/documentType');
const getInternationalCodes = require('./DROPDOWN/countryCodes');


const app = express(); 
const port = 5000;

// Middleware para manejar solicitudes JSON
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


// Ruta para la solicitud POST desde el frontend para usuarios 1a y 1b
app.post('/post-information', async (req, res) => {
  const requestData = req.body;
  try {
    await createUserAndUpdateIdentity(
      requestData.username,
      requestData.password,
      requestData.country,
      requestData.currency,
      requestData.countryCode,
      requestData.phoneNumber,
      requestData.firstName,
      requestData.lastName,
      requestData.address,
      requestData.city,
      requestData.birthDate,
      requestData.documentType,
      requestData.documentNumber,
      requestData.passportNumber,
      requestData.email
    );
    res.send('Solicitud POST de Usuario y actualización de Identity recibida correctamente.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la solicitud POST.');
  }
});


// Ruta para la solicitud GET desde el frontend con número
app.get('/get-login', async (req, res) => {
  try {
    const data = await loginAndGetIdentity();  // Usar la función actualizada
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la solicitud GET LOGIN.');
  }
});


// Ruta para codificación en base64
app.post('/base64encode', (req, res) => {
  const { username, password } = req.body;
  const userApiKey = base64Encode(username, password);
  res.json({ userApiKey });
});


// Ruta para obtener la lista de monedas
app.get('/currencies', async (req, res) => {
  try {
    const currencies = await getCurrencies();
    res.json(currencies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la solicitud GET de monedas.');
  }
});

// Ruta para obtener la lista de tipos de documentos
app.get('/documentType', async ( res) => {
  try {
    const documentType = await getDocumentType();
    res.json(documentType);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la solicitud GET de tipos de documentos.');
  }
});

// Ruta para obtener la información de los códigos internacionales para celulares
app.get('/international-codes', async (req, res) => {
  try {
    const internationalCodes = await getInternationalCodes();
    res.status(200).json(internationalCodes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al recuperar códigos móviles internacionales' });
  }
});


// Ruta para la solicitud GET desde el frontend con número
app.get('/get-data/:number', async (req, res) => {
  const number = req.params.number;
  try {
    const data = await getIdentityByNumber(number);  // Usar la función actualizada
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la solicitud GET.');
  }
});

// Ruta para la solicitud GET de transacciones por identityId
app.get('/get-transactions/:identityId', async (req, res) => {
  const identityId = req.params.identityId;
  try {
    const transactions = await getTransactionsByIdentityId(identityId);
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la solicitud GET de transacciones.');
  }
});

// Ruta para la solicitud GET de retiros por identityId
app.get('/get-withdrawals/:identityId', async (req, res) => {
  const identityId = req.params.identityId;
  try {
    const withdrawals = await getWithdrawalsByIdentityId(identityId);
    res.json(withdrawals);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la solicitud GET de retiros.');
  }
});

// Ruta para la solicitud GET de envíos desde identityId
app.get('/get-sends-from/:identityId', async (req, res) => {
  const identityId = req.params.identityId;
  try {
    const sendsFrom = await getSendsFromByIdentityId(identityId);
    res.json(sendsFrom);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la solicitud GET de envíos desde.');
  }
});

// Ruta para la solicitud GET de envíos hacia identityId
app.get('/get-sends-to/:identityId', async (req, res) => {
  const identityId = req.params.identityId;
  try {
    const sendsTo = await getSendsToByIdentityId(identityId);
    res.json(sendsTo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la solicitud GET de envíos hacia.');
  }
});


// Ruta para la solicitud GET desde el frontend con número
app.get('/get-all-send', async (req, res) => {
  try {
    const data = await getAllSend();  // Usar la función actualizada
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la solicitud GET.');
  }
});


// Incluir ruta de subir archivos
const postVerification = require('./POST/verification');

// Usar la ruta de subir archivos
app.use(postVerification);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

