FROM nginx:alpine

RUN chmod 777 /var/cache/nginx/ \
    && sed -i 's/^pid.*/pid \/tmp\/nginx.pid;/g' /etc/nginx/nginx.conf\
    && sed -i '/^user/d' /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY dist/testokd-user/ .

EXPOSE 4200
