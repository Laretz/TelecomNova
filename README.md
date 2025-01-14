# TelecomNova - Dashboard de Monitoramento de Rede

Este é um projeto de dashboard para monitoramento de tráfego de rede, latência, perda de pacotes e outros parâmetros de rede, utilizando **React**, **Vite**, **Material UI** para o frontend, **Node.js** no backend e **PostgreSQL** com **Prisma** para o banco de dados. O banco de dados está sendo executado em um container Docker.

## Tecnologias Utilizadas

- **Frontend**: React, Vite, Material UI
- **Backend**: Node.js
- **Banco de Dados**: PostgreSQL com Prisma (executado em Docker)
- **Outras Tecnologias**: Docker, API RESTful

## Funcionalidades

Este projeto é um dashboard interativo que exibe informações sobre o desempenho de uma rede, incluindo métricas como tráfego, latência, perda de pacotes, e disponibilidade. As principais informações apresentadas na dashboard são:

- **Tráfego de Rede**: Exibe a quantidade de tráfego consumido na rede.
- **Perda de Pacotes**: Mostra a média de perda de pacotes entre os clientes.
- **Disponibilidade de Rede**: Exibe a disponibilidade geral da rede.
- **Latência Acima de 50ms**: Identifica clientes com latência maior que 50ms.
- **Clientes Conectados**: Exibe dados sobre os clientes atualmente conectados à rede.
- **Média de Latência**: Mostra a média de latência dos clientes conectados.

A dashboard é alimentada por dados dinâmicos provenientes de APIs backend, permitindo a visualização em tempo real do estado da rede.

## Comandos para Executar o Projeto

###  Clonando e executando o Repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/Laretz/TelecomNova.git
cd TelecomNova
cd backend
npm install
npx prisma migrate dev
npx prisma generate
npm start

cd ../frontend
npm install
npm run dev
