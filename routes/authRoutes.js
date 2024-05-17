const express = require('express')
const { registerController, loginController, currentUserController, } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()
//register || post
router.post('/register', registerController);


//login||post
router.post('/login', loginController)

//GET CURRENT USER || GET
router.get('/current-user', authMiddleware, currentUserController)
module.exports = router