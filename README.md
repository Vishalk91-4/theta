Welcome to Chef's Choice , the AI/ML-driven meal kit ordering platform designed for convenience, sustainability, affordability, and customer satisfaction!

To run our program locally on your device, please follow the instructions below...

## Setting Up Your Development Environment

### Step 1: Clone the Repository

To get started, Fork the Repository and clone it to your local machine:

```bash
git clone https://github.com/Vishalk91-4/Theta.git
cd Theta
```

### Step 1.5: Create an env file and Seed the database!

You must connect your repo to a mongodb database by creating a new .env file in the server folder. <strong>It is critical to create the .env file within the server folder</strong>. You can follow the template available in .env.sample to format. Quick reference below!

```
MONGO_URI=your_mongodb_connection_string
```

###### Google OAuth Client Access

1. [Open Link](https://console.cloud.google.com/apis/credentials) and login to Google if necessary
2. Click *Create Project*
3. Name the project whatever you want and click *Create*
4. Click *Configure Consent Screen* and choose *External*. Click *Create*
5. Choose an *App Name* and a *User Support Email*. Also Choose an email address under *Developer Contact Email*. Click *Save and Continue*
6. On the next two screens click *Save and Continue*.
7. Click *Back to Dashboard* and then on the next screen click the *Credentials* tab on the left
2. Click *Create Credentials* > OAuth client ID.
3. Click Application type > Web application.
4. In the Name field, type a name for the credential. This can be whatever you want.
5. Under Authorized JavaScript origins, click Add URI. Then, enter http://localhost:4000. This identifies the domains from which your application can send API requests to the OAuth 2.0 server.
6. Under Authorized redirect URIs, click Add URI. Then, enter http://localhost:4000/auth/google/redirect which tells the OAuth 2.0 server where it can send responses.
7. Click Create. The OAuth client created screen appears, showing your new Client ID and Client secret.
These should be put into the .env file in the server folder. Follow the template below.

```
GOOGLE_CLIENT_ID=*client_id*
GOOGLE_CLIENT_SECRET=*client_secret*
```

###### Stripe API Access

1. [Open Link](https://dashboard.stripe.com/login) and login or signup if necessary
# Remember to toggle 'test mode' button to on position to allow for usage of the test cards in payment.
2. Click the *Developers* button
3. Click *API keys*
4. On the page you will see a *Publishable key* and *Secret Key*
Follow the template below to see which .env files these keys should be put into

```
Client Folder .env
REACT_APP_STRIPE_PUBLISHABLE_KEY=*Publishable key*
```

```
Server Folder .env
STRIPE_SECRET_KEY=*Secret key*
```

## Rules for test card usage:
An accepted test card to run mock stripe payments contains the following data:
Card number: 4242424242424242
Exp: 12/29
CVC: 111
Country: United States
Zip: 94122

###### Paypal API Access

1. [Open Link](https://developer.paypal.com/dashboard/) and login or signup if necessary
2. Click *Apps & Credentials*
3. Below you will see *Client ID* and *Secret*
Follow the template below to see which .env files these keys should be put into

```
Client Folder .env
REACT_APP_PAYPAL_CLIENT_ID=*Client ID*
```

```
Server Folder .env
PAYPAL_CLIENT_ID=*Client ID*
PAYPAL_CLIENT_SECRET=*Secret*
```

Don't forget to add data regarding your seed password preferences to the .env file as well! This is the password that you can use to login a test user.

```
SEED_PASSWORD=<yourpreferredpassword>
```

Make sure to add the above to the .env file to ensure your seed file will run.

to run the seed file, cd into the server folder. BEFORE initializing the docker container, run the following command:

```
npm run seed
```

 This will populate your mongo database with the relevant seed schemas.

 Want to do some troubleshooting / debugging and wipe the database clean and empty? Run the following command while in the server folder:

 ```
 npm run seedDeleter
 ```

 CAUTION: the above action cannot be undone and is meant for development purposes only. Do not run in production code.


### Step 2: Build and Run Using Docker Compose

Precursor: Your device MUST have docker desktop installed and open in order to work with docker containers. Please do so before moving forward.

Docker Compose is used to simplify the process of building and running multi-container Docker applications. To start both the frontend and backend services, use the following command:

```bash
docker-compose up --build
```

This command performs the following actions:

- **Builds the Docker images** for both the frontend and backend if they don't already exist.
- **Starts the containers** according to the specifications in `docker-compose.yml`.
- **Maps the ports** to your local machine, allowing you to access the services (frontend on port 3000 and backend on port 8080).

### Step 3: Access the Services

- **Frontend**: Open your browser and navigate to `http://localhost:3000` to view the React application.
- **Backend**: Access the backend API directly via `http://localhost:4000`.

### Step 4: Making Changes

Any changes you make to the source files will be reflected in the running containers, thanks to Docker volumes:

- **Frontend**: Changes in the `client/src` directory will automatically trigger a rebuild and refresh in the browser.
- **Backend**: Changes in the Go files will require you to restart the Docker container to compile the changes. You can do this by stopping the container (`Ctrl+C`) and rerunning the `docker-compose up` command.

## Additional Commands

To stop the Docker containers, you can use:

```bash
docker-compose down
```

This command stops and removes all running containers based on your `docker-compose.yml` configuration. If you want to remove the volumes along with the containers, use:

```bash
docker-compose down -v
```