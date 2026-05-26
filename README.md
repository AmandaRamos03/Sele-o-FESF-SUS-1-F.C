# DevConnect

O DevConnect é uma plataforma criada para conectar pessoas que estão iniciando na área de tecnologia com empresas que buscam talentos em nível júnior e estágio.

A proposta do sistema é facilitar esse primeiro contato entre candidatos e empresas, permitindo a visualização e o gerenciamento de oportunidades de forma simples e intuitiva.

O projeto foi desenvolvido utilizando React no front-end e FastAPI no back-end, como parte do processo seletivo da FESF-SUS.

## Funcionalidades

- Visualização de vagas
- Cadastro de novas vagas
- Edição de vagas
- Exclusão de vagas
- Busca por vagas
- Filtro por tecnologias
- Visualização detalhada das vagas
- Perfis separados para candidato e empresa
- Integração entre front-end e API
- Containerização com Docker

## Perfis disponíveis

### Candidato

- Visualizar vagas
- Buscar oportunidades
- Filtrar tecnologias
- Visualizar detalhes da vaga
- Realizar candidatura

### Empresa

- Cadastrar vagas
- Editar vagas
- Excluir vagas
- Gerenciar oportunidades

## Tecnologias utilizadas

### Front-end

- React
- Vite
- JavaScript
- CSS

### Back-end

- Python
- FastAPI
- Pydantic
- Uvicorn

### Ferramentas

- Git
- GitHub
- Docker
- Docker Compose

## Como executar o projeto

Primeiro clone o repositório:

```bash
git clone https://github.com/AmandaRamos03/Selecao-FESF-SUS.git
```

Entre na pasta do projeto:

```bash
cd Seleção-FESF-SUS
```

Execute a aplicação utilizando Docker:

```bash
docker compose up --build
```

Após iniciar a aplicação:

Frontend:

```txt
http://localhost:5173
```

Documentação da API:

```txt
http://localhost:8000/docs
```

## Observações

Este projeto foi desenvolvido para fins de demonstração e aprendizado, com foco na integração entre React, FastAPI e conteinerização utilizando Docker.