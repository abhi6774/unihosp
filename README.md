# UniHosp - United Hospital

UniHosp stands for United Hospitals acronym we made for our website name. We built this project with the thinking to convert entire health sector digital by recording all the medical history of the citizen of India into database and which they can by a given Uni ID which a user can create during the registration. We are trying built a prototype to connect  all the hospital like UPI connected all the banks for online revolution of Indian Financial Sector.

## Problem Being Addressed
Suppose a person had a medical surgery in one state and changed city after few years. If he needed a new surgery the doctor might need past medical records and checkup reports. 
Now If that is the case it can be possible that those documents got lost or damaged or not in very good condition to be read or understand. And if that's the case, that person might to go through another body check up which is cost him a lot money. As India's health sector is not cheap, If you are in India there is great chance you know that.

## Solution 
There is very simple solution to convert entire health sector of India digital and save all  the data related to citizens health in clouds and give access to user of these services to monitor there health profile and control the access who see and who can't so that can be accessed as they need the profile can be shared.

This service will work like UPI, Every Person will be given a Uni ID as we named it for a while. With the Help Of Uni ID hospitals will be able update citizen health report on cloud which is going to be managed centrally like any other servers. User is can access these reports in there Health Profile.

## Addressed Problem and Services

1. Anytime access of past medical records using UniID
2. Helps in finding Hospital and Making appointments with doctors
3. Notifications related Profile Access, Health Issues, Doctor Appointments
4. Health Profile Access Management

### User Flow

![](https://github.com/glxymesh/unihosp/blob/main/source/userflow.png)


To view the currently deployed app [Click Here](https://unihosp.live)


There are two main folders and branches which are webfront (client) and uniserver.

#### Webfront
Webfront is an angular app
In main branch it is located at:




`client`
client consists of our app frontend design and app flow logic

It's not fully completed yet so we have deployed a development build right some features might break. 


![](https://github.com/glxymesh/unihosp/blob/main/source/registerpage.png)


##### Dashboard

![](https://github.com/glxymesh/unihosp/blob/main/source/welcome.png)


Note:
We are trying to hide as much as secret keys and token as we can so please be carefull if you are trying to exploit.



#### Uniserver
Uniserver is an nest.js server which is the main server
In main branch it is located at:
`uniserver`
In the uniserver main folder one is `prisma` and `src`
`prisma` Consits of our database schema
`src` Consists of authentication and all the logics of it's not yet completely perfect



## Technologies Used:
1. Google Cloud Instance for website building and deployment.
2. Google Cloud SQL for Database hosting.
3. Node.js, Nest.js for server design, Prisma ORM For database connection 
4. Socket IO for notification services.
5. Programming Languages - _Typescript/Javascript_
6. Angular framework for frontend.
7. Services Used - Elastic Mail

---

## Conclusion

UniHosp is a revolutionary digital platform that aims to make healthcare accessible and convenient for patients and doctors. By providing patients with a centralised platform to manage their medical records, access medical services, and communicate with healthcare providers, UniHosp enables doctors to provide better care and improve patient outcomes. The use of advanced technologies such as Google Maps API, Socket.IO, and Angular framework, combined with the ease of use and convenience of the platform, makes UniHosp an ideal solution for addressing the challenges faced by the healthcare sector in India.

---

# Project Setup

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/)

To Setup this project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/abhi6774/unihosp.git
    ```

2. Navigate to the project directory:
    ```bash
    cd unihosp
    ```
### Server Setup

## Setting Up Environment Variables

This project requires certain environment variables to be set. Here's how you can set them up:

1. In the root directory of the project inside the uniserver folder, create a new file and name it `.env`.

2. Open the `.env` file and set the environment variables in this format:

    ```bash
    DATABASE_URL_ROOT=<your_postgres_database_url>
    PRIVATE_TOKEN_KEY=<your_private_token_key>
    JWT_REFRESH_EXPIRE=86400000
    ACCESS_TOKEN_EXPIRATION=86400000
    REFRESH_TOKEN_EXPIRATION=86400000
    DEVELOPMENT_KEY=86dff15115508c9fb1da8c748740e753
    BEARER=<bearer_name>
    ```

Replace `<your_database_url>` and `<your_private_token_key>` with your actual database URL and private token key.

example your_private_token_key = 0eedfcd5776881153393943dc8a86478c100d58366ac277d84053703...

3. Save the `.env` file and restart the server. The application will now have access to the values you set in the `.env` file.

3. Install the dependencies:
```bash
cd uniserver && npm install
```

4. Prisma Generate

```bash
npx prisma migrate dev ---name dev
npx prisma generate
```

5. Start Server

```bash
npm run start:dev        
```

## Docker Setup or Build

If you want to use the docker directly

You have two options to set up Docker for this project:

```bash
cd uniserver
```

1. **Build the Docker image locally:**

    Use the following command to build the Docker image on your local machine:

    ```bash
    docker build . -t uniserver:latest \
    --build-arg DATABASE_URL_ROOT=<your_postgres_database_url> \
    --build-arg PRIVATE_TOKEN_KEY=<your_private_token_key> \
    --build-arg JWT_REFRESH_EXPIRE=86400000 \
    --build-arg ACCESS_TOKEN_EXPIRATION=86400000 \
    --build-arg REFRESH_TOKEN_EXPIRATION=86400000 \
    --build-arg DEVELOPMENT_KEY=86dff15115508c9fb1da8c748740e753 \
    --build-arg BEARER=<bearer_name>
    ```

    Replace `<your_postgres_database_url>`, `<your_private_token_key>`, and `<bearer_name>` with your actual values.

2. **Pull the Docker image from a registry:**

    If the Docker image is available in a Docker registry, you can pull it using the following command:

    ```bash
    docker pull abhishek6774/uniserver:latest
    ```

3. **Running the Docker Container**

    After you have either built the Docker image locally or pulled it from a registry, you can run the Docker container using the following command:

    ```bash
    docker run -e DATABASE_URL_ROOT=<your_postgres_database_url> \
    -e PRIVATE_TOKEN_KEY=<your_private_token_key> \
    -e JWT_REFRESH_EXPIRE=86400000 \
    -e ACCESS_TOKEN_EXPIRATION=86400000 \
    -e REFRESH_TOKEN_EXPIRATION=86400000 \
    -e DEVELOPMENT_KEY=86dff15115508c9fb1da8c748740e753 \
    -e BEARER=<bearer_name> \
    -d -p 3000:3000 uniserver:latest
    ```

Choose the option that best fits your needs.


## Client Setup

To use unihosp, follow these steps:

1. Start the client:
    ```bash
    cd client
    npm install
    npm run start
    ```

2. Open your web browser and visit `http://localhost:4200`

3. If you are not on the `http://localhost:4200` update the cors settings in the `uniserver/src/main.ts `respectively and add the root api endpoint in the `client/src/app/rootEndPoint.ts`


### By Team - Creators

If You See any issue with deployed app please contact us at: 

##### creator6774@gmail.com
---


##### UNIHOSP - UNITED HOSPITAL
