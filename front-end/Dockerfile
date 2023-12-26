FROM node:18 as build
WORKDIR /home/reactapp
COPY . /home/reactapp/
RUN npm install
RUN npm run build
FROM nginx:alpine
COPY src/nginx/etc/conf.d/default.conf /etc/nginx/conf/default.conf
COPY --from=build /home/reactapp/build usr/share/nginx/html
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]