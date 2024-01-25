FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Bundle app source

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run" ,"start:prod" ]

