const express = require('express')
const { createInventoryController, getInventoryController, getDonarsController, getRecentInventoryController, getInventoryHospitalController, getHospitalController, getOrgnaisationController, getOrgnaisationForHospitalController } = require('../controllers/inventoryController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

//routes
//ADD INVENTORY ||POST
router.post('/create-inventory', authMiddleware, createInventoryController)

//GET all blood records
router.get('/get-inventory', authMiddleware, getInventoryController)


router.get(
    "/get-recent-inventory",
    authMiddleware,
    getRecentInventoryController
);

router.post(
    "/get-inventory-hospital",
    authMiddleware,
    getInventoryHospitalController
);


//GET DONAR RECORDS
router.get("/get-donars", authMiddleware, getDonarsController);

//GET HOSPITAL RECORDS
router.get("/get-hospitals", authMiddleware, getHospitalController);

//GET orgnaisation RECORDS
router.get("/get-orgnaisation", authMiddleware, getOrgnaisationController);

//GET orgnaisation RECORDS
router.get(
    "/get-orgnaisation-for-hospital",
    authMiddleware,
    getOrgnaisationForHospitalController
);

module.exports = router