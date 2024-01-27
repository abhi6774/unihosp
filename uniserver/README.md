# UniServer

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
`your_private_token_key = 0eedfcd5776881153393943dc8a86478c100d58366ac277d84053703...`

3. Save the `.env` file and restart the server. The application will now have access to the values you set in the `.env` file.


4. Prisma Generate

```bash
npx prisma migrate dev ---name dev
npx prisma generate
```

5. Start Server

```bash
npm run start:dev        
```