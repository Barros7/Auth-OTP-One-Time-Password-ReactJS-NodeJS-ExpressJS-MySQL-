var { Formulario, Grupo, Pergunta, TipoPergunta, Resposta, Livro, EstadoPedido, Categoria_Livro, Cliente, UserIncommun, UserIncommunRole, Visita, Categoria, Cliente_Livro } = require('../model/tabelas')
var sequelize = require('../model/db')
const { Op } = require("sequelize");



module.exports = {



    all: async (req, res) => {


        await sequelize.sync()
            .then(async () => {
                const data = await Livro
                    .findAll({
                        where: { deleted: 0},

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
        console.log("entrou")
        
        const titulo = req.body.titulo 
        const autor = req.body.autor 
        const sinopse = req.body.sinopse 
        const foto = req.body.foto 
        const stock = req.body.stock 
        const id_categoria = req.body.id_categoria
        const categoria = req.body.categoria
       

        await sequelize.sync()

            
        const data = await Livro.create({
                    

                        titulo: titulo,
                        autor: autor,
                        sinopse: sinopse,
                        foto: foto,
                        stock: stock,
                        id_categoria: id_categoria,
                        classificacao: 0,
                        n_lido: 0,
                        deleted: 0,
                        categoria: categoria
                    })
                    .then(
                        await Categoria.update({n_livros: sequelize.literal('n_livros + 1')},
                            {
                            where: { id: id_categoria }
                        })
                    )
                    .then(function (data) {
                        return data;
                    })
                    .catch(error => {
                        console.log("Erro: " + error)
                        return error;
                    })
                    
                // return res
                res.status(200).json({
                    success: true,
                    message: "Registado",
                    data: data
                })
                
        
    },
    list: async (req, res) => {
        // para filtrar por estado
        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'

        await sequelize.sync()
            .then(async () => {
                await Livro.findAll({  
                    
                    
                    include: [
                        { model: Categoria }
                    ],
                    
                    order: [
                        [filtro, ordem]
                    ]
                })

                    .then(response => res.status(200).json({ success: true, data: response }))
            })
    },
    list_recomendados: async (req, res) => {
        // para filtrar por estado
        const categoria = req.query.categoria ?? 0
        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'

        await sequelize.sync()
            .then(async () => {
                await Livro.findAll({  
                    
                     where: { id_categoria: categoria },
                    include: [
                        { model: Categoria }
                    ],
                    
                    order: [
                        [filtro, ordem]
                    ]
                })

                    .then(response => res.status(200).json({ success: true, data: response }))
            })
    },
    update_livro: async (req, res) => {

        if (
            !req.body.id ||
            !req.body.classificacao
        ) { res.status(400); return }

        const id = req.body.id
        const classificacao = req.body.classificacao

        await sequelize.sync()
            .then(async () => {
                await Cliente_Livro
                    .update({
                        classificacao: classificacao
                    }, {
                        where: { id: id }
                    })
                    .then(count => {
                        message = !!count ? 'Pedido atualizado! ' : 'Erro a atualizar pedido. '

                        respostas.forEach(async resposta => {
                            await Resposta
                                .update({
                                    valor_unitario: resposta.valor_unitario
                                }, {
                                    where: {
                                        id: resposta.id,
                                        pedido_id: resposta.pedido_id
                                    }
                                })
                                .then(count => countRespostas += count)
                        })
                    })
            })
            .then(() => res.status(200).json({ success: true, message: message }))
            .catch(alert("errrrrrrrrrrrrro"))

    },
    count: async (req, res) => {
       
        const oquecontar = req.query.oquecontar ?? ""

        let response = {}

        await sequelize.sync()

            .then(async () => {
                switch (oquecontar) {
                    case "cliente":
                        
                            await Cliente
                                .count({
                                })
                                .then(count => { response = { ...response, count: count } })
                        
                        break;
                    

                }

            })
        res.json(response)
    },
    
}