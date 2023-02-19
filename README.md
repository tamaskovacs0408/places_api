# Places API

## About

The Places REST API made with Express is a web service that allows users to retrieve information about various places along with their images and locations. The API provides endpoints for creating, retrieving, updating, and deleting places, as well as adding and retrieving image urls with each place. The Places REST API is a useful tool for building location-based applications that require access to information about places and their associated images and locations. 

## Prerequisites 

- Node.js
- npm

## Installation

1. Clone the repository to your local machine

`git clone https://github.com/tamaskovacs0408/**places_api`

2. Install the required dependencies

`npm install`

## Usage

1. Start the API by running the following command:

`node app.js`

2. The API should now be running on http://localhost:8080

## Endpoints

The following endpoints are available in this API:

- GET /api/places
- POST /api/places
- PUT /api/places/:pId
- DELETE /api/places/:pId

## Examples

1. Get all places

`GET http://localhost:8080/api/places`

2. Get a place by id

`GET http://localhost:8080/api/places/:pId`

3. Get places by locations

`GET http://localhost:8080/api/places/location/:loc`

4. Add new place

```js
POST `http://localhost:8080/api/places`

{
  "placeName": "The name of the place",
  "location": "The location of the place(by country)",
  "image": "An image url of the place"
}
```

5. Update a place

```js
PUT `http://localhost:8080/api/places/:pId`

{
  "placeName": "Updated place name",
  "location": "Updated location",
  "image": "Updated image url"
}
```

6. Delete a place

`DELETE http://localhost:8080/api/places/:pId`

## Contributing

Contributions are welcome. Please open an issue or submit a pull request if you have any improvements to make.

## License

This project is licensed under the MIT License.