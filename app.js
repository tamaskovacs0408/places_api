const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
// const fs = require('fs');
//const mongoMethods = require('./mongo');
const mongooseMethods = require('./mongoose');

// const api = require('./datas.json');

const app = express()

const PORT = 8080;

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.get('/', (req, res) => {
//   res.json(api);
// });

// With MongoDB code:

// app.post('/places', mongoMethods.createPlaces);

// app.get('/places', mongoMethods.getPlaces)

// With Mongoose Schema/models:

app.post('/places/create', mongooseMethods.createPlace);

app.get("/places", mongooseMethods.getPlaces);

app.get("/places/:pId", mongooseMethods.getOnePlace);

app.put("/places/:pId", mongooseMethods.updatePlace);
//app.patch("/places/:pId", mongooseMethods.updatePlace);

app.delete("/places/:pId", mongooseMethods.deletePlace);

app.listen(PORT, () => {
  `Server runs at port ${PORT}.`
})