var { Formulario, Categoria ,Grupo, Pergunta, TipoPergunta, Resposta,Livro, Pedido, EstadoPedido, MotivoRecusa, Cliente, UserIncommun, UserIncommunRole, Visita } = require('../model/tabelas')
var sequelize = require('../model/db')
const { Op } = require("sequelize");



module.exports = {

   

    all: async (req, res) => {

        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'
        await sequelize.sync()
            .then(async () => {
                const data = await Categoria
                    .findAll({
                        order: [
                            [filtro, ordem]
                        ]
                    })
                    .then(function (data) {
                        return data;
                    })
                    .catch(error => {
                        return error;
                    });
                res.json({ success: true, data: data });
            })
    },
    add: async (req, res) => {
        
        
        const nome = req.body.nome 
        const n = 0
        
        await sequelize.sync()
        .then(async () => {

            
        await Categoria.create({
                    

                        nome: nome,
                        n_livros: n
                       
                    })
                    .then(function (data) {
                        return data;
                    })
                    .catch(error => {
                        console.log("Erro: " + error)
                        return error;
                    })
                // return res
                .then(data => {
                    res.status(200).json({
                        success: true,
                        message: "Utilizador registado com sucesso!",
                        data
                    });
                })
                .catch(error => { throw new Error(error) })
            })
    },
    categoria: async (req, res) => {
        const idc = req.query.id ?? 0
    
        await sequelize.sync()
            .then(async () => {
                const data = await Categoria
                    .findOne({
                       where:{
                        id: idc
                       }
                        
                    })
                    .then(function (data) {
                        return data;
                    })
                    .catch(error => {
                        return error;
                    });
                res.json({ success: true, data: data });
            })
    }, 
}