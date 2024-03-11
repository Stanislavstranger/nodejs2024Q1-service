# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Clone this repository:

```
git clone https://github.com/Stanislavstranger/nodejs2024Q1-service.git
```
## Navigate to the project directory:

```
cd nodejs2024Q1-service
```

## Installing NPM modules

```
npm install
```

## Set up environment variables:
Create a .env file in the root directory and define the following variables:
```
PORT=4000
```
## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Usage:

### User:

- `GET /user` - Get all users.
- `GET /user/:id` - Get a single user by ID (ex. “/users/123”)
- `POST /user` - Create a new user.
- `PUT /user/:id}` - Update a user's password (ex. “/users/123”)
- `DELETE /user/:id` - Delete a user (ex. “/users/123”)

### Artists:

- `GET /artist` - Get all artists.
- `GET /artist/:id` - Get a single artist by ID (ex. “/artist/123”)
- `POST /artist` - Create a new artist.
- `PUT /artist/:id` - Update an artist's information (ex. “/artist/123”)
- `DELETE /artist/:id` - Delete an artist (ex. “/artist/123”)

### Tracks:

- `GET /track` - Get all tracks.
- `GET /track/:id` - Get a single track by ID (ex. “/track/123”)
- `POST /track` - Create a new track.
- `PUT /track/:id` - Update a track's information (ex. “/track/123”)
- `DELETE /track/:id` - Delete a track (ex. “/track/123”)

### Albums:

- `GET /album` - Get all albums.
- `GET /album/:id` - Get a single album by ID (ex. “/album/123”)
- `POST /album` - Create a new album.
- `PUT /album/:id` - Update an album's information (ex. “/album/123”)
- `DELETE /album/:id` - Delete an album (ex. “/album/123”)

### Favorites:

- `GET /favs` - Get all favorites split by entity type.
- `POST /favs/track/:id` - Add a track to favorites (ex. “/favs/track/123”)
- `DELETE /favs/track/:id` - Delete a track from favorites (ex. “/favs/track/123”)
- `POST /favs/album/:id` - Add an album to favorites (ex. “/favs/album/123”)
- `DELETE /favs/album/:id` - Delete an album from favorites (ex. “/favs/album/123”)
- `POST /favs/artist/:id` - Add an artist to favorites (ex. “/favs/artist/123”)
- `DELETE /favs/artist/:id` - Delete an artist from favorites (ex. “/favs/artist/123”)

### Docs:

- `GET /dosc` - Get docs.

## Data Format

All requests and responses should be in JSON format.

## Validation

Incoming requests are validated to ensure data integrity and consistency.

## Next Steps

Currently, the service operates with in-memory data. In subsequent tasks, we will integrate a database for persistent storage.