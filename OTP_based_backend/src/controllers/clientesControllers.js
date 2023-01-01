var { Cliente_Livro, Cliente_Categoria, Livro, Categoria, Cliente, UserIncommun, UserIncommunRole, Visita } = require('../model/tabelas')
const nodemailer = require('nodemailer')
require('dotenv').config()
var sequelize = require('../model/db')
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');


module.exports = {

   
    new: async (req, res) => {
        const nome = req.body.nome
        const email = req.body.email
        const tlm = req.body.tlm
        const password = req.body.password


        await sequelize.sync()


        Cliente
            .create({

                nome: nome,
                email: email,
                tlm: tlm,
                password: password,
                estado: 1,
                n_livros: 0

            })
        res.json({ success: true });

    },
    add_livro_cliente: async (req, res) => {
        const titulo = req.body.titulo
        const autor = req.body.autor
        const sinopse = req.body.sinopse
        const foto = req.body.foto
        const stock = req.body.stock
        const id_cliente = req.body.id
        const id_categoria = req.body.id_categoria
        const categoria = req.body.categoria
        const id_livro = req.body.id_livro

        await sequelize.sync()


        Cliente_Livro
            .create({

                titulo: titulo,
                autor: autor,
                sinopse: sinopse,
                foto: foto,
                id_categoria: id_categoria,
                classificacao: 0,
                id_livro: id_livro,
                lido: "false",
                id_cliente: id_cliente,
                categoria: categoria

            })
            .then(
                await Livro.update({ stock: sequelize.literal('stock - 1') ,
                n_lido: sequelize.literal('n_lido + 1')},
                    {
                        where: { id: id_livro }
                    })
            )
            .then(
                await Cliente.update({ n_livros: sequelize.literal('n_livros + 1') },
                    {
                        where: { id: id_cliente }
                    })
            )
        res.json({ success: true });

    },
    add_livro_cliente2: async (req, res) => {
        const titulo = req.body.titulo
        const autor = req.body.autor
        const sinopse = req.body.sinopse
        const foto = req.body.foto
        const stock = req.body.stock
        const id_cliente = req.body.id
        const id_categoria = req.body.id_categoria
        const categoria = req.body.categoria
        const id_livro = req.body.id_livro

        await sequelize.sync()


        Cliente_Livro
            .create({

                titulo: titulo,
                autor: autor,
                sinopse: sinopse,
                foto: foto,
                id_categoria: id_categoria,
                classificacao: 0,
                id_livro: id_livro,
                lido: "true",
                id_cliente: id_cliente,
                categoria: categoria

            })
            .then(
                await Livro.update({ stock: sequelize.literal('stock - 1'),
                n_lido: sequelize.literal('n_lido + 1')},
                    {
                        where: { id: id_livro }
                    })
            )
            .then(
                await Cliente.update({ n_livros: sequelize.literal('n_livros + 1') },
                    {
                        where: { id: id_cliente }
                    })
            )
        res.json({ success: true });

    },
    add_categoria_cliente: async (req, res) => {
        const id_cliente = req.body.id
        const id_categoria = req.body.id_categoria
        const nome = req.body.nome
        await sequelize.sync()

        let categoria = await Cliente_Categoria
            .findOne({
                where: {
                    id_cliente: id_cliente,
                    id_categoria: id_categoria
                }
            })
            

            if (categoria) {
                res.json({
                    success: false,
                    message: 'Esta Categoria já é uma das tuas favoritas.'
                })
                return
            }
        
            Cliente_Categoria
                .create({
                    nome: nome,
                    id_categoria: id_categoria,
                    id_cliente: id_cliente

                })
                .then(data => {
                    res.status(200).json({
                        success: true,
                        message: "Categoria Adicionada",
                        data
                    });
                })
                .catch(error => { throw new Error(error) })
        
        
    },
    // devolve todos os clientes
    list: async (req, res) => {
        // para filtrar por estado
        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'

        await sequelize.sync()
            .then(async () => {

                const data = await Cliente.findAll({
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

    cliente: async (req, res) => {
        const email = req.query.mail ?? 0
        const pass = req.query.pass ?? 0

        await sequelize.sync()
            .then(async () => {
                const data = await Cliente
                    .findOne({
                        where: {
                            email: email,
                            password: pass
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
    login: async (req, res) => {

        let email, password = null

        if (!!req.body.email && !!req.body.password) {
            email = req.body.email
            password = req.body.password
        } else {
            res.status(403).json({
                success: false,
                message: 'Dados necessários: email e password'
            });
            return
        }

        let user = await Cliente
            .findOne({ where: { email: email } })
            .then(data => { return data })
            .catch(error => { console.log(error) })

        console.log(user)


        if (!!user) {
            const passwordMatch = bcrypt.compareSync(password, user.password);
            console.log("b")
            if (user.estado == 1) {
                res.status(403).json({
                    success: false,
                    message: 'Esta conta de cliente está pendente, aguarde que um admin a autorize para puder fazer login'
                });
                return
            }
            else if (user.estado == 2){
                if (user.password == password) {
                    console.log("a")
                    let token = jwt.sign({ email: email }, config.JWT_SECRET,
                        // { expiresIn: '24h' }
                    );
    
                    res.status(200).json({
                        success: true,
                        message: 'Autenticação realizada com sucesso!',
                        token: token,
                        username: user.username,
                        email: user.email
                    });
                    return
                }
            }
            
        }

        res.status(403).json({
            success: false,
            
            message: 'Dados inválidos.'
        });
    },
    update_livro: async (req, res) => {
       
        if (
            !req.body.id ||
            !req.body.classificacao
        ) { res.status(400); return }

        const soma = 0
        const id = req.body.id
        const id_livro = req.body.id_livro
        const classificacao = req.body.classificacao

        await sequelize.sync()
            .then(async () => {
                await Cliente_Livro
                    .update({
                        classificacao: classificacao
                    }, {
                        where: { id: id }
                    })

            })



            .then(() => res.status(200).json({ success: true, message: "Classificação atualizada" }))


    },
    update_classificacao: async (req, res) => {
       
        const id = req.query.id ?? 0
       


        await sequelize.sync()
            .then(async () => {
                const data = await Cliente_Livro
                    .findAll({
                        where: {
                            id_livro: id
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
    update_estado: async (req, res) => {
       
        const id = req.body.id 
        const estado = req.body.estado 

    

        await sequelize.sync()
            .then(async () => {
                await Cliente
                .update({
                    estado: estado
                }, {
                    where: { id: id }
                })
                .then(() => res.status(200).json({ success: true, message: "Estado atualizado" }))
                .catch(error => { res.status(400); throw new Error(error); });
            })


    },
    countclassificacao: async (req, res) => {
      
        const id = req.query.id ?? 0
        
        let response = {}

        await sequelize.sync()
            .then(async () => {
                await Cliente_Livro
                    .count({
                        where: {
                            id_livro: id
                        }

                    })
                    .then(count => { response = { ...response, count: count } })


                res.json(response)
            })


    },
    update_lido: async (req, res) => {
       
        if (
            !req.body.id ||
            !req.body.lido
        ) { res.status(400); return }
        const id = req.body.id
        const id_livro = req.body.id_livro
        const lido = req.body.lido

        if (lido == "true") {
            await sequelize.sync()
                .then(async () => {
                    await Cliente_Livro
                        .update({
                            lido: "false"
                        }, {
                            where: { id: id }
                        })

                })
                .then(
                    await Livro.update({ n_lido: sequelize.literal('n_lido - 1') },
                        {
                            where: { id: id_livro }
                        })
                )
                .then(() => res.status(200).json({ success: true, message: "Classificação atualizada" }))
                .catch(error => { res.status(400); throw new Error(error); });
        }
        else if (lido == "false") {
            await sequelize.sync()
                .then(async () => {
                    await Cliente_Livro
                        .update({
                            lido: "true"
                        }, {
                            where: { id: id }
                        })

                })
                .then(
                    await Livro.update({ n_lido: sequelize.literal('n_lido + 1') },
                        {
                            where: { id: id_livro }
                        })
                )
                .then(() => res.status(200).json({ success: true, message: "Classificação atualizada" }))
                .catch(error => { res.status(400); throw new Error(error); });
        }
        console.log(id)





    },
    update_lido2: async (req, res) => {
        
        if (
            !req.body.id ||
            !req.body.lido
        ) { res.status(400); return }

        

        const id = req.body.id
        const lido = req.body.lido

        await sequelize.sync()
            .then(async () => {
                await Cliente_Livro
                    .update({
                        lido: true
                    }, {
                        where: { id: id }
                    })

            })
            .then(() => res.status(200).json({ success: true, message: "Classificação atualizada" }))
            .catch(error => { res.status(400); throw new Error(error); });




    },
    list_livros: async (req, res) => {
        const cliente = req.query.cliente ?? 0
        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'

        await sequelize.sync()
            .then(async () => {
                await Cliente_Livro
                    .findAll({
                        where: { id_cliente: cliente },
                        order: [[filtro, ordem]]
                    })
                    .then(data => { res.status(200).json({ success: true, data: data }) })
                    .catch(error => { res.status(400); throw new Error(error); });

            })
    },
    list_categorias: async (req, res) => {
        const cliente = req.query.cliente ?? 0
        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'

        await sequelize.sync()
            .then(async () => {
                await Cliente_Categoria
                    .findAll({
                        where: { id_cliente: cliente },
                        order: [[filtro, ordem]]
                    })
                    .then(data => { res.status(200).json({ success: true, data: data }) })
                    .catch(error => { res.status(400); throw new Error(error); });

            })
    },

    // devolve o numero de clientes na BD
    total: async (req, res) => {
        const data = await Cliente.count({

        })

            .then(function (data) {
                return data;
            })
            .catch(error => {
                return error;
            });
        res.json({ success: true, data: data });
    },

}