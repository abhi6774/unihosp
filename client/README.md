# Unihosp UI

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