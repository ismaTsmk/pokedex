var express = require('express');
var router = express.Router();
const favorisController = require('../controllers/favorisController');



router.get('/:pokeName', favorisController.pokeDetails);
router.get('/', favorisController.index);
router.post('/', favorisController.create);

module.exports = router;
