const express = require('express');
const router = express.Router();


// Load each controller
const authController = require('./auth');
const otherController = require('./other');

const itemsController = require('./items');
const usersController = require('./users');
const recipesController = require('./recipes');
const listsController = require('./lists');

//const postsController = require('./posts.js');
const spoonController = require('./spoon');

const appConfigController = require('./appConfig.js');

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use('/auth', authController);
router.use('/other', otherController);
router.use('/items', itemsController);
router.use('/lists', listsController);
router.use('/users', usersController);
router.use('/recipes', recipesController);
router.use('/food', spoonController);

//router.use('/posts', postsController);
router.use('/application-configuration', appConfigController);


module.exports = router;