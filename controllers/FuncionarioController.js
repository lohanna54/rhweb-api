const { Funcionario, Situacao, Login } = require ('../models/');
const { Op } = require("sequelize");
const FUNCSITUAO_ATIVO = 1;
const FUNCSITUAO_INATIVO = 2;

class FuncionarioController {
    async getFuncAtivos(req,res) {
        try {
            const funcionarios = await Funcionario.findAll({
                include: [{ 
                    model: Situacao, 
                    as: "situacao",
                    where: { 
                       descricao:{ [Op.not]: 'Inativo'}
                    },
                    attributes: { exclude: ['createdAt', 'updatedAt'] }                   
                    },
                    { 
                    model: Login, 
                    as: "login",
                    attributes: { exclude: ['FuncionarioId', 'funcionarioId', 'createdAt', 'updatedAt'] } 
                    },
                              
                ],
                attributes: { exclude: ['loginId','situacaoId','SituacaoId', 'createdAt', 'updatedAt'] }
            })
            res.status(200).json(funcionarios);
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }
    async getFuncInativos(req,res) {
        try {
            const funcionarios = await Funcionario.findAll({
                include: [{ 
                    model: Situacao, 
                    as: "situacao", where: { descricao: 'Inativo' },
                    attributes: { exclude: ['createdAt', 'updatedAt'] }              
                },
                { 
                    model: Login, 
                    as: "login",
                    attributes: { exclude: ['FuncionarioId', 'funcionarioId', 'createdAt', 'updatedAt'] } 
                }],
                attributes: { exclude: ['loginId', 'situacaoId','SituacaoId', 'createdAt', 'updatedAt'],
                              include: [['updatedAt','ultima atualizacao']]  }
            })
            res.status(200).json(funcionarios);
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }
    async getByCpf(req, res){
        try{
            const funcionario = await Funcionario.findOne({
                where:{ cpf: req.query.cpf },
                include: [{ 
                    model: Situacao, 
                    as: "situacao",
                    attributes: { exclude: ['createdAt', 'updatedAt'] }              
                },
                { 
                    model: Login, 
                    as: "login",
                    attributes: { exclude: ['FuncionarioId', 'funcionarioId', 'createdAt', 'updatedAt'] } 
                }],
                attributes: { exclude: ['loginId', 'situacaoId','SituacaoId', 'createdAt', 'updatedAt'] }
            });

            if(funcionario){
                res.status(200).json(funcionario)
            }else{
                res.status(400).json({mensagem: 'CPF não encontrado'})
            }
        
        }catch(err){
            res.status(400).json({error: err.message})
        }
    }
    async getById(req, res){
        try{
            const funcionario = await Funcionario.findOne({
                where:{ id: req.params.id },
                include: [{ 
                    model: Situacao, 
                    as: "situacao",
                    attributes: { exclude: ['createdAt', 'updatedAt'] }              
                },
                { 
                    model: Login, 
                    as: "login",
                    attributes: { exclude: ['FuncionarioId', 'funcionarioId', 'createdAt', 'updatedAt'] } 
                }],
                attributes: { exclude: ['loginId', 'situacaoId','SituacaoId', 'createdAt', 'updatedAt'] }
            });

            if(funcionario){
                res.status(200).json(funcionario)
            }else{
                res.status(400).json({mensagem: 'ID não encontrado'})
            }
        
        }catch(err){
            res.status(400).json({error: err.message})
        }
    }
    async getByNome (req, res) {
        let searchNome = '%' + req.query.q + '%';
        try{
            const funcionarios = await Funcionario.findAll({
                where: {nome: { [Op.like] : searchNome } },
                include: [{ 
                    model: Situacao, 
                    as: "situacao",
                    attributes: { exclude: ['createdAt', 'updatedAt'] }              
                },
                { 
                    model: Login, 
                    as: "login",
                    attributes: { exclude: ['FuncionarioId', 'funcionarioId', 'createdAt', 'updatedAt'] } 
                }],
                attributes: { exclude: ['loginId', 'situacaoId','SituacaoId', 'createdAt', 'updatedAt'] }
            });
            if(funcionarios.length > 0){
                return res.status(200).json(funcionarios);
            }  
            else{
                return res.status(400).json({mensagem: "Nenhum funcionario encontrado"})
            }          
        }catch(e){
            return res.status(400).json({error: e.message});
    }
    }
    async create(req,res) {
        try {

            let funcSituacaoRes = await Situacao.findByPk(req.body.situacaoId);       
            if (!funcSituacaoRes) {
                res.status(400).json({erro: 'Situação não encontrada'});
            }
            let funcCPF = await Funcionario.findOne({ where: { cpf: req.body.cpf } });
            if(funcCPF){
                res.status(400).json({erro: 'CPF já cadastrado'});
            }else {
                let funcionario = {
                    nome: req.body.nome,
                    cpf: req.body.cpf,
                    dataNascimento: req.body.dataNascimento,
                    estadoCivil: req.body.estadoCivil,
                    sexo: req.body.sexo,
                    email: req.body.email,
                    graduacao: req.body.graduacao,
                    cep: req.body.cep,
                    numero: req.body.numero,
                    complemento: req.body.complemento,
                    celular: req.body.celular,
                    fixo: req.body.fixo,
                    emergencia: req.body.emergencia,
                    nomeReferencia: req.body.nomeReferencia,
                    parentesco: req.body.parentesco,
                    deficiencia: req.body.deficiencia,
                    cargo: req.body.cargo,
                    ferias: req.body.ferias,
                    salario: req.body.salario,
                    foto: req.body.foto,
                    situacaoId: Number(req.body.situacaoId)
                }
                
                const funcResponse = await Funcionario.create(funcionario);
                const loginFuncionario = await createLogin(funcResponse);
                const funcObj = await Funcionario.update(
                    { loginId: loginFuncionario.id },
                    { where: { id: funcResponse.id } });

                    res.status(201).json({mensagem:`Funcionario ${funcResponse.id} criado com sucesso`});
                
                async function createLogin(){
                    let usuarioObj = funcResponse.nome.split(' ');
                    let userLogin = usuarioObj[0]+'.'+usuarioObj[usuarioObj.length-1];

                    let funcionarioLogin = {
                        ativo: true,
                        funcionarioId: funcResponse.id,
                        usuario: userLogin,
                        senha: funcResponse.cpf
                    }
                    console.log(funcionarioLogin)
                    const loginReponse = await Login.create(funcionarioLogin);

                    return loginReponse;
                }
                
            }  
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }
    async update(req, res){
        try{
            const funcionario = await Funcionario.findByPk(req.params.id);
            if(funcionario){
                let funcObj = {
                    nome: req.body.nome || funcionario.nome,
                    cpf: funcionario.cpf,
                    dataNascimento: funcionario.dataNascimento,
                    estadoCivil: req.body.estadoCivil || funcionario.dataNascimento,
                    sexo: req.body.sexo || funcionario.sexo,
                    email: req.body.email || funcionario.email,
                    graduacao: req.body.graduacao || funcionario.graduacao, 
                    cep: req.body.cep || funcionario.cep,
                    numero: req.body.numero || funcionario.numero,
                    complemento: req.body.complemento || funcionario.complemento,
                    celular: req.body.celular || funcionario.celular,
                    fixo: req.body.fixo || funcionario.fixo,
                    emergencia: req.body.emergencia || funcionario.emergencia,
                    nomeReferencia: req.body.nomeReferencia || funcionario.nomeReferencia,
                    parentesco: req.body.parentesco || funcionario.parentesco,
                    deficiencia: req.body.deficiencia || funcionario.deficiencia,
                    cargo: req.body.cargo || funcionario.cargo,
                    ferias: req.body.ferias || funcionario.ferias,
                    salario: req.body.salario || funcionario.salario,
                    foto: req.body.foto || funcionario.foto,
                    situacaoId: Number(req.body.situacaoId) || funcionario.situacaoId
                }
                
                await funcionario.update(funcObj);
                return res.status(200).json({mensagem: "Funcionário atualizado com sucesso"});
            }else{
                return res.status(400).json({mensagem: "Funcionário inexistente"})
            }
        }catch(e){
            return res.status(400).json({error: e.message});
        }
    }
    async desativar(req, res){
        try{
            const funcionario = await Funcionario.findByPk(req.params.id);
            if(funcionario){
                    funcionario.situacaoId = FUNCSITUAO_INATIVO;
                    await funcionario.update(funcionario);
                return res.status(200).json({mensagem: "Funcionario inativado com sucesso"});
            }else{
                return res.status(400).json({mensagem: "Funcionário inexistente"})
            }
        }catch(e){
            return res.status(400).json({error: e.message});
        }
    }
    async reativar(req, res){
        try{
            const funcionario = await Funcionario.findByPk(req.params.id);
            if(funcionario){
                    funcionario.situacaoId = FUNCSITUAO_ATIVO;
                    await funcionario.update(funcionario);
                return res.status(200).json({mensagem: "Funcionario reativado com sucesso"});
            }else{
                return res.status(400).json({mensagem: "Funcionário inexistente"})
            }
        }catch(e){
            return res.status(400).json({error: e.message});
        }
    }
}

module.exports = new FuncionarioController();