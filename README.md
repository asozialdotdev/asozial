# asozial
## :noun

*"social media for the anti-social developer"*

It was created at Ironhack, Berlin by three students, one teacher, and a thousand cups of coffee as a final project. That was only the beginning.

We found that while Github is the place to be for developers, it isn't easy to find specific devs with a skillset that you're looking for - both as friends and as collaborators. So, we created asozial to match you with other like-minded creatives who speak your language, and code your language (or any language you may be looking for help with).

We want asozial to be the place where developers of all types come to meet, match and collaborate. As long as you have a GitHub account, you're in.

## Tech stack

- MongoDB
- Express.js
- Next.js
- Node.js

We use Mongoose to query the database. The frontend is hosted on Vercel, and the backend is hosted on Railway.

## Installation

Plans to dockerize are underway. However, for the time being, with Github CLI you can clone the repo by running the commands:

```
 # ~/code/asozial

 $ gh repo clone asozialdotdev/asozial
```

The app is divided in 2 main folders: backend and frontend. That means there are 3 different package.json files.

In your terminal, run the command:

```
 # ~/code/asozial

 $ npm install
```

Now let's do the same for both backend and frontend folders.

```
 # ~/code/asozial

 $ cd frontend && npm install
```


Run .. to get back to the outer folder and run the command:

```
 # ~/code/asozial

 $ cd backend && npm install
```
Secrets and Environment

Once you become a contributor, you should have access to the Hashicorp account through your personal email. In the Vault Secrets you'll find all environment variables.

In the backend folder, create a .env file, copy and paste the variables from Hashicorp into the file.

```
# asozial/backend/.env

MONGODB_URI=
SERVER_PORT=
JWT_TOKEN_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Similarly, in the frontend folder, create a .env.local file, and paste the right variables in your project.

```
# asozial/frontend/.env.local

NEXT_PUBLIC_API_BASE_URL=
AUTH_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
MONGODB_URI=
```

## TypeScript

Both backend and frontend are coded in TypeScript. We love Typescript.

## Backend

Asozial app is built with Express.js for the backend. The logic to access the database through routes is stored in there.

## Frontend

For the frontend, the app is built with Next.js 14 , a framework for React, with many out of the box features.

Tailwind is the choice for CSS styles and Shadcn for UI complements.

## Database

The database used in this project is MongoDB. It's necessary to have MongoDB and MongoDB Compass installed in your local machine.

## Deployment

The app has the backend deployed in Railway and the frontend in Vercel.

## Run the application

With all the setup done, you should be able to run the app. In the asozial (outer) folder, run the command npm run dev to start the backend and frontend application. Optionally, you can run the backend in one terminal window and frontend in another. Backend runs in http://localhost:5005

Frontend runs in http://localhost:3000 , going to this URL to test the connection.
