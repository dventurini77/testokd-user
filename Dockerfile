FROM nginx:alpine

RUN chmod 777 /var/cache/nginx/ \
    && sed -i 's/^pid.*/pid \/tmp\/nginx.pid;/g' /etc/nginx/nginx.conf\
    && sed -i '/^user/d' /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/nginx.conf

# support running as arbitrary user which belogs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx  && chmod -R g+w /etc/nginx

WORKDIR /usr/share/nginx/html
COPY dist/testokd-user/ .

EXPOSE 4200
