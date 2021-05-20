const { TipoBeneficio } = require ('../models');

class TipoBeneficioController {
    async getAll(req,res) {
        try {
            const beneficios = await TipoBeneficio.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] } 
            });
            res.status(200).json(beneficios);
        }
        catch(err) {
            res.status(400).json({error: err.message});
        }
    }
    async getById(req, res){
        try{
            const tipoBeneficio = await TipoBeneficio.findOne({
                where:{ id: req.params.id },
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
            if(tipoBeneficio){
                res.status(200).json(tipoBeneficio)
            }else{
                res.status(400).json({mensagem: 'ID não encontrado'})
            }
        }catch(err){
            res.status(400).json({error: err.message})
        }
}
    async create(req,res) {
        try {
            if(req.body.descricao){
                const beneficio = await TipoBeneficio.create(req.body)
                res.status(200).json(beneficio);
            }else{
                res.status(400).json({error: "Descrição obrigatória"});
            }
        }
        catch(err) {
            res.status(400).json({error: err.message});
        }
    }
    async update(req,res) {
        try{
            const beneficioTipo = await TipoBeneficio.findByPk(req.params.id);
            if(beneficioTipo){
                if(req.body.descricao){
                    let beneficioTipoObj = {
                        descricao: req.body.descricao
                    }
                    await beneficioTipo.update(beneficioTipoObj);
                    return res.status(200).json({mensagem: "Atualizado com sucesso"});
                }else{
                    return res.status(400).json({mensagem: "Falta descrição"})
                }
            }else{
                return res.status(400).json({mensagem: "ID não encontrado"})
            }
        }catch(e){
            return res.status(400).json({error: e.message});
        }
     
    }
}

module.exports = new TipoBeneficioController();