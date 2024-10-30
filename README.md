# arfudy back-end

O arfudy backend foi desenvolvido em Node utilizando o framework NestJs junto do PrismaORM e utiliza tanto de REST API quanto de WebSockets (utilizado para envio de notificações) para se comunicar com o front-end/mobile.

O deploy foi feito na plataforma [Render](https://dashboard.render.com/) a partir de uma imagem docker armazenada no [DockerHub](https://hub.docker.com/r/stvnreis/arfudy).

Sempre que for feito alguma atualização na imagem, deve ser feito o redeploy manual a partir da referencia mais nova.

## Documentações
- [Nestjs](https://docs.nestjs.com/)
- [PrismaORM](https://www.prisma.io/docs)

## Instalando dependências e gerando schema do Prisma

Para iniciar, é necessário instalar as dependências do projeto

``` bash

npm install

```


Após isso, gerar o prisma-client (sempre rodar este comando quando fizer alguma alteração no arquivo "schema.prisma")
  

``` bash

npx prisma generate

```


## Como rodar o projeto

modo de desenvolvimento:

``` bash

npm run start:dev

```


Produção:

``` bash

npm run start:prod

```

## Como rodar o projeto localmente usando docker

Adicione as váriaveis de ambiente em um arquivo .env e rode o comando:

``` bash

docker-compose up

```

## Endpoints:
Os endpoints do projeto podem ser acessados através do seguinte endereço após rodar o projeto:

``` bash

http://localhost:3333/api/doc

```

## Testes
não esquecer de adicionar ambas as strings de conexão, assim como o example.env

testes unitários

```bash

npm run test

```

testes de integração/ponta a ponta

```bash

npm run test:e2e

```

## Atualizar a imagem Docker

abrir o terminal no diretório do projeto e rodar os seguintes comandos:

```bash
docker build -t stvnreis/arfudy:latest .
```

```bash
docker push stvnreis/arfudy:latest
```