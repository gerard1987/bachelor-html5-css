FROM nginx:latest
COPY  ./pages/index.html /usr/share/nginx/html/index.html
EXPOSE 80