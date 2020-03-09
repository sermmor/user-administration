FROM node
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli
RUN npm install
EXPOSE 8001
CMD ["ng", "serve"]
