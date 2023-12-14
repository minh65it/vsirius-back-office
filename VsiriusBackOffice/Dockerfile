FROM node:18.19.0-alpine As build


WORKDIR /usr/src/app


COPY ./ /usr/src/app/

# Run npm install @angular/cli


RUN npm install -g @angular/cli

# Copy all files

COPY . .

# Run ng build through npm to create dist folder
RUN npm i --legacy-peer-deps

RUN ng build


# ARG NODE_ENV=production

# ENV NODE_ENV=$NODE_ENV

# ENV API_URL=http://192.168.1.25:8082/api/


# Define nginx for front-end server

FROM nginx:latest

# Copy dist from ng build to nginx html folder

COPY --from=build /usr/src/app/dist/vsirius-back-office /usr/share/nginx/html

EXPOSE 80