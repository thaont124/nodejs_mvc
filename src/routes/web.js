const express = require('express')
const router = express.Router()
const {getHomepage, getPTIT, createUser, goToCreateUser, goToUpdateUser, updateUser} = require('../controller/homeController')

//khai bao route
router.get('/', getHomepage)

router.get('/ptit', getPTIT)
router.get('/create', goToCreateUser)
router.get('/update/:userId', goToUpdateUser)

router.post('/create-user', createUser)
router.post('/edit-user', updateUser)

//
module.exports = router;