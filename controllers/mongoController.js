const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv').config();

const URL =
  `mongodb+srv://tkwebdev:${process.env.MONGODB_PSW}@placescluster.wupqk8k.mongodb.net/?retryWrites=true&w=majority`;

const createPlaces = async (req, res, next) => {
  const newPlace = {
    place: req.body.place,
    image: req.body.image,
    visited: req.body.visited
  };
  const client = new MongoClient(URL);

  try {
    await client.connect(); // Connect to server
    const db = client.db(); // Access to the database
    const result = db.collection('places').insertOne(newPlace); // Got access to the collection and create a new document

  } catch (error) {
    return res.json({
      message: "Couldn't store data."
    })
  }
  //client.close(); // Close the collection after insert

  res.json(newPlace);
};

const getPlaces = async (req, res, next) => {
  const client = new MongoClient(URL);

  let places;

  try {
    await client.connect();
    const db = client.db();
    places = await db.collection('places').find().toArray();
  } catch (error) {
    return res.json({
      message: "Data couldn't be retrieved."
    })
  }
  client.close();

  res.json(places)
};

exports.createPlaces = createPlaces;
exports.getPlaces = getPlaces;