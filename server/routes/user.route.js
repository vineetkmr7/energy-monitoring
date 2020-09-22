var express = require('express');
var router = express.Router();
const { UserController } = require('../app/controllers');
const { authMiddleware } = require('../app/middlewares');

/* GET users listing. */
router.post('/', UserController.registerUser);
router.post('/login', UserController.login);
router.post('/logout', authMiddleware, UserController.logout);
router.post('/logoutAll', authMiddleware, UserController.logoutAll);
// router.get('/', authMiddleware, UserController.getAllUsers);
router.get('/me', authMiddleware, UserController.getUser);
router.patch('/me', authMiddleware, UserController.updateUser);
router.delete('/me', authMiddleware, UserController.deleteUser);

module.exports = router;
