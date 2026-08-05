# ProFootball Real-Time Match API

A backend application built with **NestJS** that provides football match data through a REST API. The project is designed using clean architecture principles and integrates with external football data providers while caching data with Redis.

## Features

- RESTful API built with NestJS
- Swagger API documentation
- Football data integration (Football-Data.org)
- Redis caching
- Repository Pattern
- Dependency Injection
- Request validation
- Standardized API responses
- Global exception handling

## Tech Stack

- NestJS
- TypeScript
- Redis
- Docker
- Swagger (OpenAPI)
- Axios
- Class Validator
- Football-Data.org API

## Project Structure

```
src/
├── common/
├── config/
├── infrastructure/
│   ├── football-provider/
│   ├── logger/
│   └── redis/
├── modules/
│   ├── football/
│   ├── health/
│   └── matches/
└── main.ts
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root.

```env
NODE_ENV=development

PORT=3000

API_PREFIX=api

APP_NAME=ProFootball Match API

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

FOOTBALL_DATA_BASE_URL=https://api.football-data.org/v4
FOOTBALL_DATA_API_KEY=YOUR_API_KEY
```

## Running Redis

Start Redis using Docker:

```bash
docker compose up -d
```

Verify the container is running:

```bash
docker ps
```

## Running the Application

Development mode:

```bash
npm run start:dev
```

Production:

```bash
npm run build
npm run start:prod
```

## API Documentation

Swagger documentation is available at:

```
http://localhost:3000/api/docs
```

## Available Endpoints

### Health

```
GET /api/v1/health
```

### Football

```
GET /api/v1/football/competitions

GET /api/v1/football/fixtures

GET /api/v1/football/fixtures?date=YYYY-MM-DD

GET /api/v1/football/fixtures/{id}

GET /api/v1/football/standings/{competition}

GET /api/v1/football/live
```

### Matches

```
POST /api/v1/matches

GET /api/v1/matches

GET /api/v1/matches/{id}

PATCH /api/v1/matches/{id}

DELETE /api/v1/matches/{id}
```

## Example Response

```json
{
  "success": true,
  "message": "Request completed successfully.",
  "data": {},
  "timestamp": "2026-08-05T14:53:24.894Z"
}
```

## Current Architecture

- Controller layer
- Service layer
- Repository layer
- Infrastructure layer
- Provider abstraction for external football APIs

## Future Improvements

- Scheduled synchronization of football fixtures
- WebSocket support for live updates
- PostgreSQL persistence
- Match simulation engine
- Authentication and authorization
- Unit and integration tests

## Author

Zeddy Isu