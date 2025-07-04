FROM node:alpine

WORKDIR /app
COPY package.json .
# do not install dev dependencies
# RUN npm install --omit=dev
RUN npm install
COPY . .

CMD ["npm", "run", "start"]