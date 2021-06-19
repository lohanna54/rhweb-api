const { FuncBeneficio, Beneficio, Funcionario } = require ('../models');
const { Op } = require("sequelize");

class FuncBeneficioController {

    async insertBenefit(req,res) {
        try {
            let funcionario = await Funcionario.findByPk(req.body.funcionarioId);
            let beneficio = await Beneficio.findByPk(req.body.beneficioId);
            let hasBeneficio = false;

            if (!funcionario) {
                res.status(400).json({erro: 'ID de funcionario nao encontrada'});
            }else if(!beneficio){
                res.status(400).json({erro: 'ID de beneficio nao encontrada'});
            }else{
                const funcBeneficio = await FuncBeneficio.findOne({
                    where: { funcionarioId: funcionario.id, beneficioId: beneficio.id }
                });

                if(funcBeneficio){ 
                    hasBeneficio = true;
                }

                if(hasBeneficio){
                    res.status(400).json({erro: 'Funcionario(a) já possui o(s) benefício(s) enviado(s)'});
                }else{
                    let funcBeneficioObj = {
                        funcionarioId: funcionario.id,
                        beneficioId: beneficio.id
                    }
                    const funcBeneficioRes = await FuncBeneficio.create(funcBeneficioObj);
                    res.status(200).json({mensagem:`Benefício incluso para o funcionário com sucesso`});
                }

            }

        }catch(err) {
            res.status(400).json({error: err.message});
        }
    }
    async insertBenefitsList(req, res){
        try {
            let funcionario = await Funcionario.findByPk(req.body.funcionarioId);
            const beneficios = req.body.beneficios.split(',').map(Number);
            let notInsertedBenefits = [];

            if (!funcionario) {
                res.status(400).json({erro: 'ID de funcionario nao encontrada'});
            }else{
                for (let i = 0; i < beneficios.length; i++) {

                    let _beneficioId = beneficios[i];
                    let funcHasBeneficio = false;
                    let existentBenefit = false;

                    let beneficio = await Beneficio.findByPk(_beneficioId);
                    if(beneficio != null){
                        existentBenefit = true;
                        const funcBeneficio = await FuncBeneficio.findOne({
                            where: { funcionarioId: funcionario.id, beneficioId: beneficio.id }
                        });
                        
                        if(funcBeneficio){ 
                            funcHasBeneficio = true;
                        }
                    }

                    if(!existentBenefit || funcHasBeneficio){
                        notInsertedBenefits.push(_beneficioId);
                    }else{

                        let funcBeneficioObj = {
                            funcionarioId: funcionario.id,
                            beneficioId: _beneficioId
                        }
                        
                        await FuncBeneficio.create(funcBeneficioObj);
                    }
                }
            }

            if(notInsertedBenefits.length == beneficios.length){
                res.status(400).json({erro: 'Falha. Beneficios inexistentes ou já inseridos no cadastro'});
            }
            res.status(200).json({
                "mensagem": "Processo finalizado",
                "detalhe": {
                    "sucesso": `${beneficios.length-notInsertedBenefits.length}`,
                    "falha":`${notInsertedBenefits.length}`,
                }
            });
        }catch(err) {
            res.status(400).json({erro: err.message});
        }
    }
    async update(req, res){
        try {
            let funcionario = await Funcionario.findByPk(req.body.funcionarioId);
            const beneficios = req.body.beneficios.split(',').map(Number);
            let notInsertedBenefits = [];

            if (!funcionario) {
                res.status(400).json({erro: 'ID de funcionario nao encontrada'});
            }else{
                    
                await FuncBeneficio.destroy({
                    where:{ funcionarioId: funcionario.id }
                });
            }
            for (let i = 0; i < beneficios.length; i++) {
                let _beneficioId = beneficios[i];
               
                let existentBenefit = false;
                let beneficio = await Beneficio.findByPk(_beneficioId);

                if(beneficio != null){
                    existentBenefit = true;
                }
                if(!existentBenefit){
                    notInsertedBenefits.push(_beneficioId);
                    if(notInsertedBenefits.length == beneficios.length){
                        res.status(400).json({erro: 'Falha. Beneficios inexistentes.'});
                    }
                }else{
                    let funcBeneficioObj = {
                        funcionarioId: funcionario.id,
                        beneficioId: _beneficioId
                    }
                    
                    await FuncBeneficio.create(funcBeneficioObj);
                }
            }
           
            res.status(200).json({
                "mensagem": "Processo finalizado",
                "detalhe": {
                    "sucesso": `${beneficios.length-notInsertedBenefits.length}`,
                    "falha":`${notInsertedBenefits.length}`,
                }
            });

        }catch(err) {
            res.status(400).json({erro: err.message});
        }
    }
    async getAll(req, res){
        try {
            const beneficiosAtivos = await FuncBeneficio.findAll({
            include: [{
                model: Beneficio, 
                as: "beneficio",
                attributes: { exclude: ['createdAt', 'updatedAt', 'tipoId'] }                   
            },
            {
                model: Funcionario, 
                as: "funcionario",
                attributes: { exclude: ['createdAt', 'updatedAt', 'situacaoId', 'loginId', 'SituacaoId'] }
            },
        ],
            attributes: { exclude: ['id', 'funcionarioId', 'FuncionarioId', 'beneficioId', 'createdAt', 'updatedAt'] } 
        });
            res.status(200).json(beneficiosAtivos);
        }
        catch(err) {
            res.status(400).json({error: err.message});
        }
    }
    async getBeneficiosByFunc(req, res){
        try {
            const beneficiosFuncionario = await FuncBeneficio.findAll({
            where:{ funcionarioId: req.params.id },    
            include: [{
                model: Beneficio, 
                as: "beneficio",
                attributes: { exclude: ['createdAt', 'updatedAt', 'tipoId'] }                   
            }],
            attributes: { exclude: ['id', 'funcionarioId', 'FuncionarioId', 'beneficioId', 'createdAt', 'updatedAt'] } 
        });

            res.status(200).json(beneficiosFuncionario);
        }
        catch(err) {
            res.status(400).json({error: err.message});
        }
    }
    async getFuncBeneficiados(req, res){
        try {
            const funcBeneficiados = await FuncBeneficio.findAll({
            where:{ beneficioId: req.params.id },    
            include: [{
                model: Funcionario, 
                as: "funcionario",
                attributes: { exclude: ['createdAt', 'updatedAt', 'situacaoId', 'loginId', 'SituacaoId'] }
            }],
            attributes: { exclude: ['id', 'funcionarioId', 'FuncionarioId', 'beneficioId', 'createdAt', 'updatedAt'] } 
        });
            res.status(200).json(funcBeneficiados);
        }
        catch(err) {
            res.status(400).json({error: err.message});
        }

    }

}

module.exports = new FuncBeneficioController();