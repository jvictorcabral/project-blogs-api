require('dotenv').config();
const app = require('./api');
const categoryController = require('./controllers/categoryController');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const validateCategory = require('./middlewares/validateCategory');
const validateLogin = require('./middlewares/validateLogin');
const validateToken = require('./middlewares/validateToken');
const validateUser = require('./middlewares/validateUser');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', validateLogin, loginController.login);
app.post('/user', validateUser, userController.createUser);
app.get('/user', validateToken, userController.listAllUsers);
app.get('/user/:id', validateToken, userController.listUser);
app.post('/categories', validateCategory, validateToken, categoryController.createCategory);
app.get('/categories', validateToken, categoryController.listAllCategories);

app.listen(port, () => console.log('ouvindo porta', port));
