# Portfolio Api

## Portfolio Api Management

[Live URL](portfolio-api-lilac.vercel.app)

### Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage Guide](#usage-guide)
- [Usage](#usage)
- [Contact](#contact)

## Project Overview

Portfolio Apis For Managing the Dashboard of the Portfolio.

## Features

- **User Authentication:** Secure login functionality.
- **Create Blogs:** Admin can Create Blogs.
- **Management:** Admin can manage portfolio information.

## Technologies Used

- **Backend:** Typescript, Node.js, Express
- **ODM:** Mongoose
- **Database:** MongoDB
- **Deployment:** Vercel

## Usage Guide

Follow the following instructions to run the application locally.

### Step 1

Open command prompt(`cmd`) in folder where you want to add the project.

### Step 2

Run the following command to clone the repository:

```
git clone https://github.com/rakibul58/portfolio-api.git
```

### Step 3

Open the cloned folder or run the following in cmd:

```
cd portfolio-api
```

### Step 4

In the cloned folder run the following command on cmd:

```
npm install
```

### Step 5

On the root directory add a `.env` file and add your database url and other environment variables bellow:

```
NODE_ENV=development
PORT=5000
DATABASE_URL=
BCRYPT_SALT_ROUNDS=
JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=
DEFAULT_PASSWORD=
DEFAULT_USER=
```

### Step 6

Run the following code to start the development server:

```
npm start
```

Other commands can be found in package.json scripts

## Usage

Once the application is set up and running, you can access it at http://localhost:5000 (or the appropriate port if specified differently). From there, you can create an account, log in, and start booking cars.

## Contact

For any questions or feedback, please contact:

- **Name:** Muhammed Rakibul Hasan
- **Email:** rhrahi14@gmail.com
