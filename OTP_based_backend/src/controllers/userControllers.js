const {StatusCodes} = require('http-status-codes');
const {conexaoBaseDados} = require('../../config/database');
const { emailEnviado, compareCodigo } = require('../service/oneTimePassword');

const login = (req, res) => {
    const {email} = req.body;
    if(!email) {
        res.status(StatusCodes.BAD_REQUEST).json({response: 'É necessário e-mail!'});
    } else {
        const verificarEmail = 'SELECT Email FROM Utilizadores WHERE Email = $1';
        conexaoBaseDados.query(verificarEmail, [email], (erro, resultado) => {
            if(erro){
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({erro: 'Problema no servidor! Houve algum erro ao verificar o correio eletrónico.'});
            } else {
                if(resultado.rowCount > 0){
                    if(emailEnviado(email)){
                       res.status(StatusCodes.OK).json({ resultado });
                    } else {
                        res.status(StatusCodes.FORBIDDEN).json({response: 'Problema no envio do código de confirmação!'});
                    }
                } else {
                    const novoUtilizador = 'INSERT INTO Utilizadores (email) VALUES ($1)';
                    conexaoBaseDados.query(novoUtilizador, [email], (erro, resultado) => {
                        if(erro){
                            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({response: 'Problema no servidor, não foi possível fazer o registo!', erro});
                        } else {
                            res.status(StatusCodes.OK).json({ resultado });
                        };
                    });
                };
            };
        });
    };
};

// Verifica se o código introduzido é igual ao que foi enviado no email.
const verificaCodigo = (req, res) => {
    const { otp } = req.body;
    const sessao = 'SELECT * FROM Utilizadores WHERE Email = $1';
    if(compareCodigo(otp)){
        conexaoBaseDados.query(sessao, [email], (erro, resultado) => {
            if(erro){
                res.status(StatusCodes.BAD_REQUEST)
                    .json({erro: 'Erro ao tentar recuperar a sessão, contacte o administrador do sistema!'});
            }
            res.status(StatusCodes.OK).json({ response: true, resultado });
        });
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ erro: 'Código incorreto, verifique o seu correio eletrónico!'});
    }
};

module.exports = { login, verificaCodigo };
