FROM node:alpine as build
WORKDIR /static
COPY package*.json /static/
RUN npm i --ignore-scripts
COPY gulpfile.js /static/
COPY ./src /static/src
RUN npm run build

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/
COPY --from=build /static/dist /usr/share/nginx/static/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
