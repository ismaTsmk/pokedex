var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

// Toutes les routes users commence par /users (voir app.js ligne 8)

router.get('/', userController.index);
router.post('/', userController.create);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.editUser);
router.get('/:id', userController.findUser) // :id est un paramètre, on peut y accéder avec req.params.id dans le controller






module.exports = router;
