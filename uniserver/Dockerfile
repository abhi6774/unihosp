FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Bundle app source

COPY . .

RUN npx prisma generate

RUN npm run build

CMD [ "npm", "run" ,"start:prod" ]

