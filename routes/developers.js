const router = require('express').Router();
const developersController = require('../controllers/developersController');
const isAuthenticated = require('../middleware/isAuthenticated');

// #swagger.tags = ['Developers']
router.get('/', developersController.getAll);

// #swagger.tags = ['Developers']
router.get('/:id', developersController.getSingle);

// #swagger.tags = ['Developers']
// #swagger.security = [{ "githubOAuth": [] }]
router.post('/', isAuthenticated, developersController.createDeveloper);

// #swagger.tags = ['Developers']
// #swagger.security = [{ "githubOAuth": [] }]
router.put('/:id', isAuthenticated, developersController.updateDeveloper);

// #swagger.tags = ['Developers']
// #swagger.security = [{ "githubOAuth": [] }]
router.delete('/:id', isAuthenticated, developersController.deleteDeveloper);

module.exports = router;