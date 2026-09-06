const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => { res.send('Project2 API is running. See /api-docs for documentation.'); });

router.use('/', require('./auth'));
router.use('/apidev', require('./apidev'));
router.use('/developers', require('./developers'));

module.exports = router;