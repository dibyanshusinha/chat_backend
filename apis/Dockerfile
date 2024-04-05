FROM node:alpine
WORKDIR /app
COPY ./package.json ./package-lock.json ./  
RUN npm ci --production && npm cache clean --force
COPY . .
CMD ["node", "./src/server.js"]
EXPOSE 5000