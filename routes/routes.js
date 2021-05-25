const { Router } = require ('express');
const FuncionarioController = require('../controllers/FuncionarioController');
const SituacaoController = require('../controllers/SituacaoController');
const BeneficioController = require('../controllers/BeneficioController');
const TipoBeneficioController = require('../controllers/TipoBeneficioController');
const FuncBeneficioController = require('../controllers/FuncBeneficioController');
/* IMPORTAR CONTROLLERS */

const routes = Router();

routes.get('/', (req,res) => {
    res.status(200).send({workspace: "rhweb-api"});
})

//Funcionario routes
routes.post('/funcionario/novo', FuncionarioController.create);
routes.get('/funcionario/:id', FuncionarioController.getById);
routes.get('/funcionario', FuncionarioController.getByCpf);
routes.get('/funcionarionome', FuncionarioController.getByNome); // req.query.q
routes.put('/funcionario/:id', FuncionarioController.update);
routes.get('/funcionarios/ativos', FuncionarioController.getFuncAtivos);
routes.get('/funcionarios/desligados', FuncionarioController.getFuncInativos);
routes.put('/funcionario/inativar/:id', FuncionarioController.desativar);
routes.put('/funcionario/reativar/:id', FuncionarioController.reativar);

//Situacao Funcionario routes
routes.get('/situacoes', SituacaoController.getAll);
routes.post('/situacao/novo', SituacaoController.create);

//Beneficio routes
routes.get('/beneficios/listar', BeneficioController.getAll);
routes.get('/beneficio/:id', BeneficioController.getById);
routes.get('/beneficios/tipo/:id', BeneficioController.getByTipoBeneficio);
routes.put('/beneficio/:id', BeneficioController.update);
routes.delete('/beneficio/:id', BeneficioController.delete);
routes.post('/beneficio/novo', BeneficioController.create);

//TipoBeneficio routes
routes.get('/beneficios/tipos', TipoBeneficioController.getAll);
routes.get('/beneficio/tipo/:id', TipoBeneficioController.getById);
routes.post('/beneficio/tipo/novo', TipoBeneficioController.create);
routes.put('/beneficio/tipo/:id', TipoBeneficioController.update);

//FuncBeneficio routes
routes.post('/funcionario/beneficio/inserir', FuncBeneficioController.insertBenefit);
routes.post('/funcionario/beneficios/inserir/lote', FuncBeneficioController.insertBenefitsList);
routes.get('/beneficios/aplicados', FuncBeneficioController.getAll); // retorna todos os beneficios e respectivos funcionarios
routes.get('/beneficios/funcionario/:id', FuncBeneficioController.getBeneficiosByFunc); //retorna beneficios de um funcionario
routes.get('/funcionarios/beneficio/:id', FuncBeneficioController.getFuncBeneficiados); // retorna os funcionarios de um beneficio

module.exports = routes;