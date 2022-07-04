FROM node:16.13.2-alpine AS development
ENV PORT=3333
ENV PORT_SSR=4000
EXPOSE ${PORT}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "dist/main" ]