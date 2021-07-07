# rhweb-api
###### Documentação completa da API:
_https://rh-web-api.herokuapp.com/docs_ ou<br> 
_https://documenter.getpostman.com/view/13895802/TzeZDRxW_

###### Vídeo de apresentação do trabalho:
_https://drive.google.com/file/d/1xAcydt5r5ODn8VZIlR8HjhuIMyHmJ5yY/view?usp=sharing_

##### Instalação dos componentes utilizados:

##### Requisições HTTP:<br>
*`npm install express`* <br>

##### Banco de dados (ORM):<br>
*`npm install sequelize`* <br>
*`npm install -d sequelize-cli`* <br>
*`npm install mysql2`* <br>

##### Autenticação: <br>
*`npm install crypto-js`* <br>
*`npm install dotenv`* <br>
*`npm install jsonwebtoken`* <br>

##### Deploy: <br>
*`npm install heroku-cli`* <br>

##### *Inicialização do Projeto*:
> *npm -y init* <br>
> *npx sequelize init* <br>
##### Executando os migrations (sequelize ORM):
> *sequelize db:migrate*
##### Ordem de excecução dos migrations: 
> *Situação, Funcionario, Login, TipoBeneficio, Beneficio, FuncBeneficio*




