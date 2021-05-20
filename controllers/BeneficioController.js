const { Beneficio, TipoBeneficio } = require ('../models');

class BeneficioController {
    async getAll(req,res) {
        try {
            const beneficios = await Beneficio.findAll();
            res.status(200).json(beneficios);
        }
        catch(err) {
            res.status(400).json({error: err.message});
        }
    }
    async getByTipoBeneficio(req, res){
        //get by VT/VA/VR, etc
    }
    async create(req,res) {
        try {
            let beneficioTipo = await TipoBeneficio.findByPk(req.body.tipoBeneficio);       
            if (!beneficioTipo) {
                res.status(400).json({erro: 'Tipo de beneficio não existe'});
            }else{
                const beneficio = await Beneficio.create(req.body)
                res.status(201).json(beneficio);
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
                    tipoDesconto: req.body.tipoDesconto || beneficio.tipoDesconto,
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