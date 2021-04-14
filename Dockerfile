FROM nginx:1.19.10-alpine

COPY entrypoint.sh /
COPY nginx.conf /etc/nginx/nginx.conf.template
COPY extra-files /var/www/extra-files
ENTRYPOINT [ "/entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]
