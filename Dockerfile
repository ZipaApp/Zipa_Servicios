# ========================
# Etapa 1: Build
# ========================
FROM node:20-alpine AS build

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar TypeScript
RUN npm run build

# ========================
# Etapa 2: Run
# ========================
FROM node:20-alpine

WORKDIR /usr/src/app

# Copiar dependencias de la etapa de build
COPY package*.json ./
RUN npm install --only=production

# Copiar el código compilado
COPY --from=build /usr/src/app/dist ./dist

# Exponer puerto
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "dist/main.js"]

