require('dotenv').config();
const app = require('./api');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const validateLogin = require('./middlewares/validateLogin');
const validateUser = require('./middlewares/validateUser');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', validateLogin, loginController.login);
app.post('/user', validateUser, userController.createUser);

app.listen(port, () => console.log('ouvindo porta', port));
