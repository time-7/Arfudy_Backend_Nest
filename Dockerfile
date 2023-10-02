FROM node:20.5.1-alpine as builder

WORKDIR /app 

RUN chown -R node:node /app

COPY --chown=node:node package*.json ./

RUN npm prune --production && npm ci

COPY --chown=node:node  . .

USER node

RUN npx prisma generate && npm run build

FROM node:20.5.1-alpine  

ENV DATABASE_URL=mongodb+srv://app:Mongodb123@cluster0.qtf63hr.mongodb.net/app?retryWrites=true&w=majority
ENV VERSION=1.0.0

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3333

CMD [ "node", "dist/src/infra/main" ]