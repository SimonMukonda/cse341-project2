const router = require('express').Router();
const apidevController = require('../controllers/apidevController');
const isAuthenticated = require('../middleware/isAuthenticated');

// #swagger.tags = ['APIDev']
router.get('/', apidevController.getAll);

// #swagger.tags = ['APIDev']
router.get('/:id', apidevController.getSingle);

// #swagger.tags = ['APIDev']
// #swagger.security = [{ "githubOAuth": [] }]
router.post('/', isAuthenticated, apidevController.createEntry);

// #swagger.tags = ['APIDev']
// #swagger.security = [{ "githubOAuth": [] }]
router.put('/:id', isAuthenticated, apidevController.updateEntry);

// #swagger.tags = ['APIDev']
// #swagger.security = [{ "githubOAuth": [] }]
router.delete('/:id', isAuthenticated, apidevController.deleteEntry);

module.exports = router;