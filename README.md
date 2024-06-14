
# Clonar e Configurar um Projeto Angular 16

Este documento fornece um guia passo a passo para clonar e configurar o projeto Angular 16 disponível no repositório [AgendaHub](https://github.com/agendahub/app.agendahub).

## Pré-requisitos

Antes de iniciar, certifique-se de ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [Angular CLI](https://angular.io/cli) (versão 16 ou superior)(opcional)
- Git

## Passos para Clonar e Configurar o Projeto

### 1. Clonar o Repositório

  1. Abra o terminal ou Git Bash.
  2. Navegue até o diretório onde você deseja clonar o repositório.
  3. Execute o comando abaixo para clonar o repositório:
        
 ```sh
  git clone https://github.com/agendahub/app.agendahub.git
 ```
    
### 2. Instalar Dependências
  Certifique-se de estar no diretório raiz do projeto (app.agendahub).
  Execute o comando abaixo para instalar as dependências do projeto:
    
  ```sh
  npm install
  ```
   
### 3. Executar o Projeto
  Para iniciar o servidor de desenvolvimento, execute o comando abaixo:
    
  ```sh
  npm start
  ```
  ou caso possua o Angular CLI
  ```sh
  ng serve
  ```
    
  A aplicação está de pé e está disponível na url http://localhost:4200
    
## Estrutura do Projeto
  Aqui está uma breve visão geral da estrutura do projeto Angular:
  ```
    `src/`: Contém o código-fonte do aplicativo.
        `app/`: Contém os módulos e componentes principais do aplicativo.
        `assets/`: Contém os arquivos estáticos como imagens e estilos CSS.
        `environments`/: Contém os arquivos de configuração para diferentes ambientes (desenvolvimento, produção).
    angular.json: Arquivo de configuração principal do Angular CLI.
    package.json: Arquivo de configuração do Node.js e lista de dependências do projeto.
  ```
