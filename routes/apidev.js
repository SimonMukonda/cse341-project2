const router = require('express').Router();
const apidevController = require('../controllers/apidevController');

// #swagger.tags = ['APIDev']
router.get('/', apidevController.getAll);

// #swagger.tags = ['APIDev']
router.get('/:id', apidevController.getSingle);

// #swagger.tags = ['APIDev']
router.post('/', apidevController.createEntry);

// #swagger.tags = ['APIDev']
router.put('/:id', apidevController.updateEntry);

// #swagger.tags = ['APIDev']
router.delete('/:id', apidevController.deleteEntry);

module.exports = router;
