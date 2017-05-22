# README #

## Boxing Lab APP ##

O Boxing Lab APP é uma aplicação para tornar a procura de objetos no Laboratório de maneira mais fácil e eficiente.
A aplicação foi desenvolvida em AngularJS.
Estejam à vontade para reportar melhorias e/ou contribuir com PullRequests

* O ramo mais atualizado (com funcionalidades em testes) é o "master branch"
* O ramo que está atualmente pronto a correr no servidor é o "production branch"

## Companion Repo: The API ##

* Esta aplicação requer RESTful API
* Você vai encontrar um repositório contendo a API em https://github.com/lcdporto/boxing-api
* Para facilitar a instalação da API criámos uma imagem do Docker https://hub.docker.com/r/lcdporto/boxing-api/
* A aplicação vai procurar a API no "localhost" na porta 80. Pode ser alterado em app/core/settings.js
* Exemplo de como criar e inicializar um contentor

```
#!shell
$ docker run -tid --name boxing-api -p 80:80 lcdporto/boxing-api
```
### Dependências ###

* node and npm (dependendo do OS)
* bower
* gulp

### Como instalar? ###

* Faça clone do repositório
* Verifique que está na raiz do diretório (i.e. boxing-app)
* Verifique que tem node e npm instalado
* Instale as dependências Dev

```
#!shell
$ npm install
```

* Instalar Bower e Gulp 

```
#!shell
$ npm install -g bower
```

```
#!shell
$ npm install -g gulp
```

* Instalar as dependências da APP

```
#!shell
$ bower install
```

* Abra o ficheiro dist/angular/development/settings.js
* Se necessário altere o apiUrl para o seu URL (e.g http://127.0.0.1:8080/)
* Inicie o servidor:

```
#!shell
$ gulp serve
```

### Guia de contribuições ###

* Quando terminar o desenvolvimento de algo, por favor, verifique se existem conflitos com a versão mais recente no "master branch"
* Se possível, escreva testes para a sua nova funcionalidade

#### Verifique o seu código ####

* Nós implementámos "linting" com jshint e analisador de código com jdcd, a sua contribuição tem que ser validade nesses testes
* As regras do jshint estão definidas no ficheiro .jshintrc, para uma melhor compreensão aconselha-se a leitura em http://jshint.com/docs/options/
* As regras do jscs estão definidas no ficheiro .jscsrc, para uma melhor compreensão aconselha-se a leitura em: http://jscs.info/rules
* Ambos os ficheiros com as definições das regras estão em desenvolvimento, se encontrar algum defeito crie um alerta

```
#!shell
$ gulp check
```

* Se você achar que uma regra do jshint não faz sentido num caso especifico, pode ignorar o aviso com um "snippet" do código
* Para isso, adicione o seguinte "snippet" ao seu ficheiro (/* jshint -W034 */), a parte -W034 deve estar de acordo com a regra que quere ignorar

#### Orientações do projeto ####

* Nós estamos a migrar o projeto para John Papa's angular-styleguide https://github.com/johnpapa/angular-styleguide
* Use estas orientações como referência, se encontrar algo de errado no código, por favor crie um alerta

### Quem devo contactar? ###

Caso tenha algo a dizer pode contactar:

* Ighor Martins (ighor.martins@gmail.com)
* Ricardo Lobo (ricardolobo@audienciazero.org)

É sempre bem-vindo ao nosso laboratório :)

Mais informações em: http://labcd.org/
