require('dotenv').config();
const app = require('./api');
const userController = require('./controllers/userController');
const validateLogin = require('./middlewares/validateLogin');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', validateLogin, userController.createLogin);

app.listen(port, () => console.log('ouvindo porta', port));
