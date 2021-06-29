const { Login, Funcionario } = require ('../models');
const CryptoJS = require("crypto-js");
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');

const ROLE_USER = 'employee';
const ROLE_ADMIN = 'administrator';

class LoginController {
    
    async login(req, res){
        
        try{
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
                
                await Login.update(
                    { 
                        token: token,
                        ultimoLogin:  Date.now()
                    },
                    { where: { funcionarioId: userId } });
                    
                    res.status(200).json({ 
                        id: userId,
                        adm: loginFunc.isAdmin,
                        token: token
                    });
                    
                }else{
                    res.status(401).json({Falha: "Nao autorizado"});
                }
                
            }catch(e){
                res.status(400).json({erro: e.message});
            }   
        }
        
        async logout(req, res){
            try{
                const token = req.headers['authorization'];
                let bearerToken = token.split(' ')[1] || token.split(' ')[0];
                let userId;
                jwt.verify(bearerToken, process.env.ACCESS_SECRET, function(error, decodedInfo) {
                    userId = decodedInfo.userId
                    
                });
                await Login.update(
                    { token: null },
                    { where: { funcionarioId: userId } });
                    
                    res.status(200).json({mensagem: 'logout realizado'});
                }catch (e) {
                    res.status(400).json({mensagem: e.message});
                }
            }
        }
        
        module.exports = new LoginController();