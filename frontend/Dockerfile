# --- BUILD STAGE ---
FROM node:18 AS build
WORKDIR /app

# kopiujemy package.json
COPY package.json package-lock.json ./
RUN npm install

# kopiujemy cały projekt
COPY . .
RUN npm run build

# --- PRODUCTION STAGE ---
FROM nginx:alpine

# kopiujemy gotowy build CRA
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

