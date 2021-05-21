const { Router } = require ('express');
const FuncionarioController = require('../controllers/FuncionarioController');
const SituacaoController = require('../controllers/SituacaoController');
const BeneficioController = require('../controllers/BeneficioController');
const TipoBeneficioController = require('../controllers/TipoBeneficioController');
/* IMPORTAR CONTROLLERS */

const routes = Router();

routes.get('/', (req,res) => {
    res.status(200).send({workspace: "rhweb-api"});
})

//Funcionario routes ->> 
routes.post('/funcionario', FuncionarioController.create);
routes.get('/funcionario/:id', FuncionarioController.getById);
routes.get('/funcionario', FuncionarioController.getByCpf);
routes.get('/funcionarionome', FuncionarioController.getByNome);
routes.put('/funcionario/:id', FuncionarioController.update);
routes.get('/funcionarios', FuncionarioController.getFuncAtivos);
routes.get('/desligados', FuncionarioController.getFuncInativos);
routes.put('/funcionario/inativar/:id', FuncionarioController.desativar);
routes.put('/funcionario/reativar/:id', FuncionarioController.reativar);

//Situacao Funcionario routes
routes.get('/situacoes', SituacaoController.getAll);
routes.post('/situacao', SituacaoController.create);

//Beneficio routes
routes.get('/beneficios', BeneficioController.getAll);
routes.get('/beneficio/:id', BeneficioController.getById);
routes.get('/beneficiotipo/:id', BeneficioController.getByTipoBeneficio);
routes.put('/beneficio/:id', BeneficioController.update);
routes.delete('/beneficio/:id', BeneficioController.delete);
routes.post('/beneficio', BeneficioController.create);

//TipoBeneficio routes
routes.get('/tipobeneficios', TipoBeneficioController.getAll);
routes.get('/tipobeneficio/:id', TipoBeneficioController.getById);
routes.post('/tipobeneficio', TipoBeneficioController.create);
routes.put('/tipobeneficio/:id', TipoBeneficioController.update);

//PENDENTE:
//Implementar modelo FUNC_BENEFICIO (N funcionarios x N beneficios)
//Fazer ajustes necessários no controller de funcionario para tratar IDs de beneficio no cadastro e update
//Adicionar documentação do projeto com swagger
//Definir servidor de banco e de arquivos (p/ salvar fotos dos funcionários)

module.exports = routes;