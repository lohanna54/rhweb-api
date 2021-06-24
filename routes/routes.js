const { Router } = require ('express');
const routes = Router();

const FuncionarioController = require('../controllers/FuncionarioController');
const SituacaoController = require('../controllers/SituacaoController');
const BeneficioController = require('../controllers/BeneficioController');
const TipoBeneficioController = require('../controllers/TipoBeneficioController');
const FuncBeneficioController = require('../controllers/FuncBeneficioController');
const LoginController = require('../controllers/LoginController');

const Authenticate = require('../middlewares/AuthMiddleware');
const ROLE_USER = 'employee';
const ROLE_ADMIN = 'administrator';

routes.get('/', Authenticate([ROLE_ADMIN]), (req,res) => {
    res.status(200).send({workspace: "rhweb-api"});
});

//JWT auth routes
routes.post('/login', LoginController.login);
routes.post('/logout', LoginController.logout); 

//Funcionario routes
routes.post('/funcionario/novo', Authenticate([ROLE_ADMIN]), FuncionarioController.create);
routes.get('/funcionario/:id', Authenticate([ROLE_ADMIN, ROLE_USER]), FuncionarioController.getById);
routes.get('/funcionario', Authenticate([ROLE_ADMIN]), FuncionarioController.getByCpf);
routes.get('/funcionarionome', Authenticate([ROLE_ADMIN]), FuncionarioController.getByNome); // req.query.q
routes.put('/funcionario/:id', Authenticate([ROLE_ADMIN]), FuncionarioController.update);
routes.get('/funcionarios/ativos', Authenticate([ROLE_ADMIN]), FuncionarioController.getFuncAtivos);
routes.get('/funcionarios/desligados', Authenticate([ROLE_ADMIN]), FuncionarioController.getFuncInativos);
routes.put('/funcionario/inativar/:id', Authenticate([ROLE_ADMIN]), FuncionarioController.desativar);
routes.put('/funcionario/reativar/:id', Authenticate([ROLE_ADMIN]), FuncionarioController.reativar);

//Situacao Funcionario routes
routes.get('/situacoes', Authenticate([ROLE_ADMIN]), SituacaoController.getAll);
routes.post('/situacao/novo', Authenticate([ROLE_ADMIN]), SituacaoController.create);

//Beneficio routes
routes.get('/beneficios/listar', Authenticate([ROLE_ADMIN]), BeneficioController.getAll);
routes.get('/beneficio/:id', Authenticate([ROLE_ADMIN]), BeneficioController.getById);
routes.get('/beneficios/tipo/:id', Authenticate([ROLE_ADMIN]), BeneficioController.getByTipoBeneficio);
routes.put('/beneficio/:id', Authenticate([ROLE_ADMIN]), BeneficioController.update);
routes.delete('/beneficio/:id', Authenticate([ROLE_ADMIN]), BeneficioController.delete);
routes.post('/beneficio/novo', Authenticate([ROLE_ADMIN]), BeneficioController.create);

//TipoBeneficio routes
routes.get('/beneficios/tipos', Authenticate([ROLE_ADMIN]), TipoBeneficioController.getAll);
routes.get('/beneficio/tipo/:id', Authenticate([ROLE_ADMIN]), TipoBeneficioController.getById);
routes.post('/beneficio/tipo/novo', Authenticate([ROLE_ADMIN]), TipoBeneficioController.create);
routes.put('/beneficio/tipo/:id', Authenticate([ROLE_ADMIN]), TipoBeneficioController.update);

//FuncBeneficio routes
routes.post('/funcionario/beneficio/inserir', Authenticate([ROLE_ADMIN]), FuncBeneficioController.insertBenefit);
routes.post('/funcionario/beneficios/inserir/lote', Authenticate([ROLE_ADMIN]), FuncBeneficioController.insertBenefitsList);
routes.put('/funcionario/beneficios/atualizar', Authenticate([ROLE_ADMIN]), FuncBeneficioController.update);
routes.get('/beneficios/aplicados', Authenticate([ROLE_ADMIN]), FuncBeneficioController.getAll); 
routes.get('/beneficios/funcionario/:id', Authenticate([ROLE_ADMIN]), FuncBeneficioController.getBeneficiosByFunc); 
routes.get('/funcionarios/beneficio/:id', Authenticate([ROLE_ADMIN]), FuncBeneficioController.getFuncBeneficiados);


module.exports = routes;