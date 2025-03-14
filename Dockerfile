FROM node:20.18.3-bullseye

COPY ./front/ /app
WORKDIR /app

RUN npm install
RUN npm run build
RUN npm install -g serve
EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]