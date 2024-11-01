const express = require('express')
const router = express.Router()
const itemsCtrl = require('../../controllers/api/items')

// GET ALL /items
router.get('/', itemsCtrl.index)
// GET ONE /items/:id
router.get('/:id', itemsCtrl.show)

module.exports = router
