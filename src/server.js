require('dotenv').config();
const app = require('./api');
const categoryController = require('./controllers/categoryController');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const validateCategory = require('./middlewares/validateCategory');
const validateLogin = require('./middlewares/validateLogin');
const validatePost = require('./middlewares/validatePost');
const validateToken = require('./middlewares/validateToken');
const validateUser = require('./middlewares/validateUser');
const validateUpdatePost = require('./middlewares/validateUpdatePost');
const verifyUser = require('./middlewares/verifyUser');
const validateNonexistentPost = require('./middlewares/validateNonexistentPost');

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
app.post('/post', validatePost, validateToken, postController.create);
app.get('/post', validateToken, postController.getAll);
app.get('/post/:id', validateToken, postController.getById);
app.put('/post/:id', validateToken, verifyUser, validateUpdatePost, postController.updatePost);
app.delete('/post/:id', validateToken, validateNonexistentPost,
verifyUser, postController.deletePost);
app.delete('/user/me', validateToken, userController.deleteUser);

app.listen(port, () => console.log('ouvindo porta', port));
