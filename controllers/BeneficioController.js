const { Beneficio, TipoBeneficio } = require ('../models');
const { Op } = require("sequelize");

class BeneficioController {
    async getAll(req,res) {
        try {

            const beneficios = await Beneficio.findAll({
            include: [{
                model: TipoBeneficio, 
                as: "tipo",
                attributes: { exclude: ['createdAt', 'updatedAt'] }                   
            }],
            attributes: { exclude: ['tipoId', 'createdAt', 'updatedAt'] } 
        });
            res.status(200).json(beneficios);
        }
        catch(err) {
            res.status(400).json({error: err.message});
        }
    }
    async getById(req, res){
        try{
            const beneficio = await Beneficio.findOne({
                where:{ id: req.params.id },
                include: [{ 
                    model: TipoBeneficio, 
                    as: "tipo",
                    attributes: { exclude: ['createdAt', 'updatedAt'] }              
                }],
                attributes: { exclude: ['tipoId','createdAt', 'updatedAt'] }
            });
            if(beneficio){
                res.status(200).json(beneficio)
            }else{
                res.status(400).json({mensagem: 'ID não encontrado'})
            }
        }catch(err){
            res.status(400).json({error: err.message})
        }
    }
    async getByTipoBeneficio(req, res){
        try {
            const beneficios = await Beneficio.findAll({
                include: [{ 
                    model: TipoBeneficio, 
                    as: "tipo",
                    where: { id: {
                        [Op.eq]: Number(req.params.id) 
                    }},
                    attributes: { exclude: ['createdAt', 'updatedAt'] }                   
                    },
                ],
                attributes: { exclude: ['tipoId', 'createdAt', 'updatedAt'] }
            })
            res.status(200).json(beneficios);
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }
    async create(req,res) {
        try {
            let beneficioTipo = await TipoBeneficio.findByPk(req.body.tipoId);

            if (!beneficioTipo) {
                res.status(400).json({erro: 'Tipo de beneficio não existe'});
            }else{
                
                let beneficio = {
                    descricao: req.body.descricao,
                    tipoDesconto: req.body.tipoDesconto,
                    desconto: req.body.desconto,
                    tipoId: Number(req.body.tipoId)
                }

                const beneficioResponse = await Beneficio.create(beneficio);
                res.status(201).json({mensagem:`Benefício ${beneficioResponse.id} criado com sucesso`});
            }
        }
        catch(err) {
            res.status(400).json({error: err.message});
        }
    }
    async update(req,res) {
        try{
            const beneficio = await Beneficio.findByPk(req.params.id);
            if(beneficio){
                let beneficioObj = {
                    descricao: req.body.descricao || beneficio.descricao,
                    tipoBeneficio: Number(req.body.tipoBeneficio) || beneficio.tipoBeneficio,
                    tipoId: req.body.tipoId || beneficio.tipoId,
                    desconto: req.body.desconto || beneficio.desconto
                }
                await beneficio.update(beneficioObj);
                return res.status(200).json({mensagem: "Benefício atualizado com sucesso"});
            }else{
                return res.status(400).json({mensagem: "Benefício não encontrado"})
            }
        }catch(e){
            return res.status(400).json({error: e.message});
        }
     
    }
    async delete(req, res){
        try{
            const beneficio = await Beneficio.findByPk(req.params.id);
            if(beneficio){
                await beneficio.destroy();
                return res.status(200).json({message: "Beneficio removido"});
            }else{
                return res.status(400).json({message: "Beneficio não encontrado"});
            }
        }catch(e){
            return res.status(400).json({error: e.message});
        }
    }

}

module.exports = new BeneficioController();