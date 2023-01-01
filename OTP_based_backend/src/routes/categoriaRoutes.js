const express = require('express');
const router = express.Router();
const jwt_middleware = require('../midllewers/jwt_middleware')
const categoriaController = require('../controllers/categoriaControllers')


router.get('/', (req, res) => {
    res.send('estás dentro de /categorias/')
})



router.post('/all',categoriaController.all)

module.exports = router;