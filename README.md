# ArFudy BackEnd com NestJs

Para iniciar, instalar as dependencias do projeto
``` bash
npm i
```

Após isso, gerar o prisma client

``` bash
npx prisma generate
```

## Rodando o projeto
modo de desenvolvimento:
``` bash
npm run start:dev
```

Produção:
``` bash
npm run start:prod
```

## Testes

não esquecer de adicionar ambas as strings de conexão, assim como o example.env

casos de uso
```bash
npm run test
```

testes de integração
```bash
npm run test:e2e
```