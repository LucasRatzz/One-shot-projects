FROM node:16.13.2
WORKDIR /consulta-cep-backend
COPY package*.json ./
RUN npm install -y
COPY . .
EXPOSE 3001
CMD ["node","index.js"]