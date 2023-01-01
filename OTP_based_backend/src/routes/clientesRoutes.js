
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesControllers')


router.get('/', (req, res) => {
    res.send('estás dentro de /clientes/')
})
router.get('/update_classificacao', clientesController.update_classificacao)
router.get('/countclassificacao', clientesController.countclassificacao)
router.post('/login',clientesController.login);
router.get('/cliente',clientesController.cliente);
router.get('/list', clientesController.list)
router.get('/list_livros', clientesController.list_livros)
router.get('/list_categorias', clientesController.list_categorias)
router.get('/total', clientesController.total)
router.post('/new', clientesController.new)
router.put('/update_livro', clientesController.update_livro)
router.put('/update_lido', clientesController.update_lido)
router.put('/update_lido2', clientesController.update_lido2)
router.put('/update_estado', clientesController.update_estado)
router.post('/add_livro_cliente', clientesController.add_livro_cliente)
router.post('/add_categoria_cliente', clientesController.add_categoria_cliente)
router.post('/add_livro_cliente2', clientesController.add_livro_cliente2)

module.exports = router;