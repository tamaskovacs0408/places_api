const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');

const placeRoutes = require('./routes/places');


const app = express()

const PORT = 8080;

app.use(placeRoutes);

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
  `Server runs at port ${PORT}.`
})