FROM node:carbon
# Create app directory
WORKDIR /usr/src/app
# Bundle app src
COPY . .
# Install app dependencies
RUN npm install
EXPOSE 3001
CMD [ "npm", "start" ]