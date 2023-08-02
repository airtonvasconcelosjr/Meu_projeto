# Task Manager 

> Este app é um gerenciador de tarefas SPA (Single Page Application) feito utilizando como stacks: VueJs, Php e NodeJs.
> Utiliza como database o Mongodb.


## Capturas de Tela

![Captura de Tela]![image](https://github.com/airtonvasconcelosjr/Meu_projeto/assets/101413097/8c37dd56-3372-4839-ba1e-afe2701b2522)

## Instalação

1. Clone o repositório:
   ```shell
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
Ou baixe o arquivo;
Inserir na pasta htdocs - C:\xampp\htdocs (Windows) ou /opt/lampp/htdocs/ (Linux);
Rodar servidor Apache;
Cd Frontend - npm i (instalar dependências);
npm run build (cria versão otimizada e pronta para produção do aplicativo); 
Cd Backend - npm i (instalar dependências);
Nodemon app.js (rodar Api e comunicação com db);

Acessar no navegador: Localhost/Nome_da_pasta (Meu_projeto)


## Possíveis erros
O sistema pode não identificar automáticamente os componentes criados no npm run build, e pode se fazer necessário a atualização manual do nome dos arquivos no index.html
> Estes:
![image](https://github.com/airtonvasconcelosjr/Meu_projeto/assets/101413097/7434d3da-9f08-45e9-9d2e-1c2cfe2478ac)
> No lugar destes:
![image](https://github.com/airtonvasconcelosjr/Meu_projeto/assets/101413097/3d09fc9c-ec09-49ff-b82d-6983a98df2c8)

 O endereço da background-image está saindo incorreto;
 body{background-image:url(/img/bg.52d990f9.jpg) ;
 enquanto o correto é;
 body{background-image:url(../img/bg.52d990f9.jpg);


Contribuição
Contribuições são bem-vindas! Se você deseja contribuir com este projeto, siga as etapas abaixo:

Fork este repositório
Crie um branch para sua contribuição: git checkout -b feature/nova-funcionalidade
Faça suas alterações e faça commit: git commit -m 'Adicionei uma nova funcionalidade'
Envie suas alterações para o repositório remoto: git push origin feature/nova-funcionalidade
Abra uma solicitação de pull para revisão


Contato
Se tiver alguma dúvida ou feedback, entre em contato em airton.vasconcelosjr@gmail.com.
