# Nextjs-Auth-App

Nextjs-Auth-App is a secure authentication system built with Next.js using JWT-based authentication. It allows users to register, log in, log out, and view their profiles. The app uses Nodemailer and Mailtrap services to send emails for account verification, signup confirmation, and password recovery. Focused on backend security, it ensures a reliable and scalable authentication process.

## Features

- User registration and login with JWT authentication
- Email verification on signup
- Password reset functionality
- Secure email delivery using Nodemailer
- Profile management

## Technologies Used

- **Next.js** – Server-side rendering and API routes
- **MongoDB** – Database for storing user data
- **Bcrypt.js** – Password hashing for secure authentication
- **jsonwebtoken (JWT)** – Token-based authentication
- **Nodemailer** – Email verification and password recovery

## Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/syedhisham/nextjs-auth-app.git
cd nextjs-auth-app
npm install
```

Then, create a `.env` file and configure the required environment variables:

```env
MONGO_URI=your_mongodb_connection_string
SECRET_TOKEN=your_jwt_secret_key
DOMAIN=your_domain
```

### Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

## API Endpoints

- **POST /api/users/signup** – Register a new user
- **POST /api/users/login** – Authenticate user and return JWT
- **POST /api/users/logout** – Log out user
- **POST /api/users/verifyemail** – Verify user email
- **POST /api/users/resetpassword** – Reset user password
- **GET /api/users/me** – Fetch logged-in user details

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) – Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) – An interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

