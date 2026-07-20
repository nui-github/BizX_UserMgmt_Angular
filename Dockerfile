FROM node:18-alpine as install

RUN sed -i -e 's/http/https/g' /etc/apk/repositories

RUN apk update && apk add --no-cache

WORKDIR /app

COPY package*.json /app/

COPY .npmrc /app/

RUN npm set progress=false && npm install

COPY ./ /app/

RUN npm run build-prod --output-path=./dist

FROM nginxinc/nginx-unprivileged

USER root
RUN mkdir -p /usr/share/nginx/html && chown -R 101:101 /usr/share/nginx/html
USER 101

COPY ./nginx/default.conf.template /etc/nginx/templates/


COPY --from=install /app/dist/usermanagement/browser /usr/share/nginx/html/usermanagement/

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]

