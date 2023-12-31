# Task Manager 

> Este app é um gerenciador de tarefas SPA (Single Page Application) feito utilizando como stacks: VueJs, Php e NodeJs.
> Utiliza como database o Mongodb. 
> Segue as seguintes diretivas:
> Criação de rotas para realizar operações CRUD (Create, Read, Update, Delete).  Uso de bibliotecas adequadas para facilitar o desenvolvimento, como Express.js e Mongoose. b. Desenvolvimento de um frontend em Vue.js - Implementação de recursos como adicionar, editar, excluir e marcar tarefas como concluídas. - Utilização de componentes do Vue.js para modularizar a aplicação e facilitar a reutilização de código. c. Integração entre o frontend e a API: - Comunicação assíncrona entre o frontend e a API usando requisições HTTP. - Manipulação de respostas da API, incluindo tratamento de erros e exibição adequada das mensagens de retorno. d. Implementação de recursos adicionais: - Adicionar funcionalidades extras à aplicação, como pesquisa de tarefas.


## Capturas de Tela

![Captura de Tela]![image](https://github.com/airtonvasconcelosjr/Meu_projeto/assets/101413097/5e04fe1b-44ca-43db-8d95-b36df96afaf4)


## Instalação

1. Clone o repositório:
```
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```
Ou baixe o arquivo; <br>

• Inserir na pasta htdocs - C:\xampp\htdocs (Windows) ou /opt/lampp/htdocs/ (Linux);<br>

• Rodar servidor Apache;<br>

• Cd Frontend - npm i (instalar dependências);<br>

• npm run build (cria versão otimizada e pronta para produção do aplicativo);<br>

• Cd Backend - npm i (instalar dependências);<br>

• Nodemon app.js (rodar Api e comunicação com db);<br>

• Acessar no navegador: Localhost/Nome_da_pasta (Meu_projeto)<br>


## Possíveis erros
O sistema pode não identificar automáticamente os componentes criados no npm run build, e pode se fazer necessário a atualização manual do nome dos arquivos no index.html <br>
> Estes:<br>
![image](https://github.com/airtonvasconcelosjr/Meu_projeto/assets/101413097/7434d3da-9f08-45e9-9d2e-1c2cfe2478ac)<br>
> No lugar destes:<br>
![image](https://github.com/airtonvasconcelosjr/Meu_projeto/assets/101413097/3d09fc9c-ec09-49ff-b82d-6983a98df2c8)<br>

 > O endereço da background-image está saindo incorreto; <br>
``` body{background-image:url(/img/bg.52d990f9.jpg) ; ```<br>
 enquanto o correto é;<br>
``` body{background-image:url(../img/bg.52d990f9.jpg); ```

## Possíveis erros
No caso de insucesso pode-se seguir estes passos: <br>

• Cd Backend - npm i (instalar dependências);<br>

• Nodemon app.js (rodar Api e comunicação com db);<br>

• Cd Frontend - npm i (instalar dependências);<br>

• Npm run serve (rodar servidor pelo Vue Cli);<br> 



## Contribuição
Contribuições são bem-vindas! Se você deseja contribuir com este projeto, siga as etapas abaixo:<br>

## Fork este respositório
Crie um branch para sua contribuição: git checkout -b feature/nova-funcionalidade <br>
Faça suas alterações e faça commit: git commit -m 'Adicionei uma nova funcionalidade'<br>
Envie suas alterações para o repositório remoto: git push origin feature/nova-funcionalidade<br>
Abra uma solicitação de pull para revisão<br>

## Contato
Se tiver alguma dúvida ou feedback, entre em contato em airton.vasconcelosjr@gmail.com.
