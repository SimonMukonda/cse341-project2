const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => { res.send('Project2 API is running. See /api-docs for documentation.'); });

router.use('/apidev', require('./apidev'));

module.exports = router;
