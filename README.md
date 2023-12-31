<h1 align="center">
🌐 Spense Challenge
</h1>
<p align="center">
MongoDB, Expressjs, React/TypeScript, Nodejs
</p>

> The challenge requires participants to build a functional E-commerce store with different access levels for Super Admins, Vendors, and end-users. The Super Admin dashboard allow monitoring of reviews, ratings, and orders, while vendors can add products, manage inventory and perform CRUD operations. End-users can view products, add them to the cart, and checkout. A reward system is implemented where users earn coins when they shop, and multiple discount campaigns should also be possible.

# Incomplete Features

### Most of the features are completed but some of them are incomplete

- Forget Password
- Search Functionality
- Redeem gold coins obtain from purchasing a product/writing a review
- To add a super admin from super admin dashboard (In the )
- Currently vendor can add only one image
- Super Admin Dashboard
- Lazy loading of components and pages

## clone or download

```terminal
$ git clone https://github.com/farhankolad12/Spense-Challenge.git
```

## project structure

```terminal
server/
   package.json
   .env (to create .env, check [prepare your secret session])
client/
    EndUsers/
        package.json
        .env
    Admins/
        package.json
        .env
...
```

# Usage (run fullstack app on your machine)

## Prerequisites

- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other and also there are 2 client app so you have to run them in different terminal

## Client-side usage(ENDUSERS_PORT: 5173, ADMINS_PORT: 5174)

```terminal
$ cd ./client/EndUsers          // go to EndUsers folder
$ yarn # or npm i    // npm install packages
$ npm run dev        // run it locally

$ cd ./client/Admins          // go to Admins folder
$ yarn # or npm i    // npm install packages
$ npm run dev        // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called dist in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## Server-side usage(PORT: 4000)

### Prepare your secret

run the script at the first level:

(You need to add a JWT_SECRET_KEY, DATABASE_URL, CLIENT_HOST_NAME, CLIENT_ADMIN_HOST_NAME, MY_EMAIL, MY_EMAIL_PASSWORD in .env to connect to MongoDB)

```terminal
// in the root level
$ cd server
$ echo "JWT_SECRET_KEY=YOUR_JWT_SECRET"
$ echo "DATABASE_URL=DATABASE_URL_MONGODB"
$ echo "CLIENT_HOST_NAME=CLIENT_HOST_NAME OR http://localhost:5173/"
$ echo "CLIENT_ADMIN_HOST_NAME=CLIENT_ADMIN_HOST_NAME OR http://localhost:5174/"
```

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm i nodemon --save-dev // Change the scripts of start from package.json nodemon server.js
$ npm start // run it locally
```

# Dependencies(tech-stacks)

| Client-side               | Server-side           |
| ------------------------- | --------------------- |
| nanoid: ^4.0.2            | bcrypt: ^5.1.0        |
| react: ^18.2.0            | body-parser: ^1.20.2  |
| react-dom: ^18.2.0        | cookie-parser: ^1.4.6 |
| react-router-dom: ^6.12.1 | cors: ^2.8.5          |
|                           | dotenv: ^16.1.4       |
|                           | express: ^4.18.2      |
|                           | jsonwebtoken: ^9.0.0  |
|                           | mongoose: ^7.2.2      |
|                           | multer: ^1.4.5-lts.1  |
|                           | nodemailer: ^6.9.3    |
|                           | otp-generator: ^4.0.0 |

# Screenshots of this project

User visit public and Home page
![User visit public and Home page](http://i.imgur.com/NrEicBw.png)

User can sign in or sign up
![User can sign in or sign up](http://i.imgur.com/pdLt2mT.png)

After signing in user can go to account route and make request to token-protected API endpoint
![After signing in user can go to account route update their details add products to cart/wishlist and many more...](http://i.imgur.com/jHf7LC4.png)

## BUGs or comments

[Create new Issues](https://github.com/farhankolad12/Spense-Challenge/issues) (preferred)

Email Me: farhankolad@gmail.com (welcome, say hi)

## Author

[Farhan Kolad]
