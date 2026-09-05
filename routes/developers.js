const router = require('express').Router();
const developersController = require('../controllers/developersController');

// #swagger.tags = ['Developers']
router.get('/', developersController.getAll);

// #swagger.tags = ['Developers']
router.get('/:id', developersController.getSingle);

// #swagger.tags = ['Developers']
router.post('/', developersController.createDeveloper);

// #swagger.tags = ['Developers']
router.put('/:id', developersController.updateDeveloper);

// #swagger.tags = ['Developers']
router.delete('/:id', developersController.deleteDeveloper);

module.exports = router;
