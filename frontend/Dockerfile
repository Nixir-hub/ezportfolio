# --- BUILD STAGE ---
FROM node:20 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ARG REACT_APP_USER_API
ARG REACT_APP_ML_API
RUN REACT_APP_USER_API=$REACT_APP_USER_API REACT_APP_ML_API=$REACT_APP_ML_API npm run build

# --- PRODUCTION STAGE ---
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
