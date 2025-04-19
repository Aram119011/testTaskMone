# **NestJS Project with PostgreSQL and Migrations**

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
[![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)

## **Description**

This project uses the **NestJS** framework to build a server-side application with **PostgreSQL** for handling user and
friend requests. It includes **migrations** for creating and managing the database schema with **node-pg-migrate**.

## **Project Setup**

Follow these steps to get your project up and running.

### 1. **Clone the Repository**

First, clone the project to your local machine.

```bash
  git clone <repository-url>
  cd <project-directory>

```

### 2. Install Dependencies

Run the following command to install the project dependencies:

```bash
  npm install
```

### 3. Configure Environment Variables

Create a .env file in the root of your project and add the following environment variables:

```
PORT=3001
DB_HOST=127.0.0.1  # Or your database host
DB_PORT=5432       # Or your custom PostgreSQL port
DB_USER=your-user  # Replace with your DB username
DB_PASSWORD=your-password  # Replace with your DB password
DB_NAME=m1db       # Replace with your database name
DATABASE_URL=postgres://your-user:your-password@127.0.0.1:5432/m1db  # Adjust with your DB credentials
JWT_SECRET_KEY=your-secret-key-here  # Replace with your secret JWT key
```
These variables are used to configure the PostgreSQL connection and JWT secret for the app.


### 4. Configure Environment Variables

Ensure that PostgreSQL is installed on your system, and you have a database named m1db.

```
psql -U root -d m1db -h 127.0.0.1 -p 5432
```
If the database doesn’t exist, you can create it using:


```
CREATE DATABASE m1db;
```

### 5. Run Migrations

The migrations will automatically create the necessary tables in your PostgreSQL database.

To run the migrations, execute the following command:

```bash
  npx node-pg-migrate up
```
Or, if you’ve added the migration:up script to package.json, run:

```bash
  npm run migration:up
```

### 6. Start the Application

After setting up the database and running migrations, start the NestJS application with:

```bash
  npm run start
```
Or for development mode with hot-reloading:

```bash
  npm run start:dev
```
Your application should now be running at http://localhost:3001.

### 7. Test the Endpoints

You can use Postman or cURL to test the routes. Some of the important routes include:


POST /auth/register <br/>
POST /auth/login <br/>
GET /auth/search <br/>
POST /friends/send-request/:receiverId <br/>
POST /friends/accept/:requestId <br/>
POST /friends/decline/:requestId <br/># testTaskMone
