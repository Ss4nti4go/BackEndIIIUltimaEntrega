# indicamos la imagen base del proyecto

FROM node 

# estableecmeos el nombre de la app/ directorio trabajo

WORKDIR /coderserver-sm

# copiamos el package.json y el package-lock.json
COPY package.json ./
RUN npm install
COPY . .

# Exponemos el puerto 8080

EXPOSE 8080 

# Ejecutamos el servidor
CMD ["npm", "start"]