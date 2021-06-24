const { Login, Funcionario } = require ('../models');
const CryptoJS = require("crypto-js");
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');

const ROLE_USER = 'employee';
const ROLE_ADMIN = 'administrator';

class LoginController {

    async login(req, res){
        
        let receivedPassword = req.body.senha;
        let bytesPassReceived, decodedPass;

        const loginFunc = await Login.findOne({
            where:{ 
                usuario: req.body.usuario,
                ativo: true
            }
        });
        let encodedPass = loginFunc.senha;

        const funcionario = await Funcionario.findOne({
            where:{ 
                id: loginFunc.funcionarioId,
            }
        });

        bytesPassReceived = CryptoJS.AES.decrypt(encodedPass, process.env.ACCESS_SECRET);
        decodedPass = bytesPassReceived.toString(CryptoJS.enc.Utf8);

        if(decodedPass == receivedPassword) {
            let role = ROLE_USER;
            let userId = funcionario.id;

            if(loginFunc.isAdmin){
                role = ROLE_ADMIN;
            }
            const token = jwt.sign({ userId, role }, process.env.ACCESS_SECRET,{
                expiresIn: process.env.ACCESS_LIFE
            });
            res.status(200).json({ 
                auth: true, 
                token: token
            });

        }else{
            res.status(401).json({Falha: "Nao autorizado"})
    }
    }
    async logout(req, res){
        res.status(200).json({
            auth: false, 
            token: null
        });
    }

}

module.exports = new LoginController();