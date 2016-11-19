const router = require('express').Router(); //eslint-disable-line

router.use('/api/tree', require('./api/tree'));
router.use('/api/node', require('./api/node'));

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
