const express = require('express');
const router = express.Router();
const jwt_middleware = require('../midllewers/jwt_middleware')
const livrosController = require('../controllers/livrosControllers')
const categoriaController = require('../controllers/categoriaControllers')

router.get('/', (req, res) => {
    res.send('estás dentro de /livros/')
})
router.post('/add', livrosController.add)
router.get('/list', livrosController.list)
router.get('/count', jwt_middleware.checkToken, livrosController.count)
router.get('/list_recomendados', livrosController.list_recomendados)
router.get('/all', jwt_middleware.checkToken, livrosController.all)
router.get('/categorias', jwt_middleware.checkToken, categoriaController.all)
router.post('/addcategoria', jwt_middleware.checkToken, categoriaController.add)
router.get('/categoria', jwt_middleware.checkToken, categoriaController.categoria)

//router.post('/new', pedidosController.new)

module.exports = router;