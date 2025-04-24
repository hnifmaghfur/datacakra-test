# Trip Management API

A NestJS-based RESTful API for managing trip records with authentication, authorization, and data validation.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Contributing](#contributing)
- [License](#license)

## Features

- JWT-based authentication
- Role-based access control (Admin & Tenant)
- CRUD operations for trips
- Input validation with Zod
- Swagger (OpenAPI) documentation
- Bruno for developer-related support. ([link](https://docs.usebruno.com/introduction/what-is-bruno))

## Tech Stack

- Node.js & TypeScript
- NestJS framework
- TypeORM
- Database using SQLite 3
- Zod (validation)
- PostgreSQL (or any TypeORM‐supported database)
- Swagger (OpenAPI)

## Requirements

- Node.js v14+
- npm v6+
- SQLite 3

## Installation

```bash
git clone https://github.com/hnifmaghfur/datacakra-test.git
cd trip-api
npm install
```

## Running the Application

```bash
npm run start
```

Visit `http://localhost:3000/api/v1` for the API root and `http://localhost:3000/api-docs` for Swagger UI.

## API Documentation

Swagger UI is available at `/api-docs` and is generated automatically based on your controllers and Zod schemas.

Alternatively, you can contact Bruno for developer-related support. You can find it in the `api_collection` folder. Documentation for using Bruno can be found [here](https://docs.usebruno.com/introduction/what-is-bruno).

## API Endpoints

### Authentication

- **POST** `/auth/login` — Authenticate and receive JWT

### Users

- **GET** `/user` — List all users except the authenticated one (requires JWT)
- **POST** `/user` — Create a new users (Admin only)
- **PATCH** `/user/:id` — Update users details (Admin only)
- **DELETE** `/user/:id` — Delete a users (Admin only)

### Trips

- **POST** `/trip` — Create a new trip (Admin only)
- **GET** `/trip` — Retrieve all trips (Admin sees all, User/Tenant sees their own)
- **GET** `/trip/:id` — Retrieve a specific trip by ID (Admin only)
- **PATCH** `/trip/:id` — Update trip details (Admin only)
- **DELETE** `/trip/:id` — Delete a trip (Admin only)

## Data Models

### User Model

| Field       | Type   | Description               |
| ----------- | ------ | ------------------------- |
| `Id   `     | number | User identifier           |
| `email`     | string | Email of the trip creator |
| `password ` | string | Password for login        |
| `name`      | string | Name of user              |
| `role   `   | string | Role for user             |

### Trip Model

| Field         | Type   | Description                |
| ------------- | ------ | -------------------------- |
| `id`          | number | Trip identifier            |
| `userId`      | number | User identifier            |
| `createdBy`   | string | Admin create trip record   |
| `destination` | string | Destination of the trip    |
| `startDate`   | string | ISO datetime of start date |
| `endDate`     | string | ISO datetime of end date   |

## Contributing

- Hanif Maghfur

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
