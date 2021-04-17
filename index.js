const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;

const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()



const port = process.env.PORT || 5059;

app.use(cors());
app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.send('Hello World!')
})




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ifp7e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log('connection error', err)
  const bookingCollection = client.db("Airplane").collection("bookings");



  app.get('/addAirline', (req, res) => {
    bookingCollection.find()
      .toArray((error, items) => {
        res.send(items)
      })
  })

  app.get('/isAdmin', (req, res) => {
    bookingCollection.find()
    const email = req.body.email;
    bookingCollection.find({ email: email })
      .toArray((error, items) => {
        res.send(items.length > 0);

      })
  })


  app.get('/addAirline/:id', (req, res) => {
    bookingCollection.find({ _id: ObjectId(req.params.id) })
      .toArray((error, items) => {
        res.send(items)
      })
  })



  app.post('/addAirline', (req, res) => {
    const newAirlines = req.body;
    console.log('adding new airlines', newAirlines)
    bookingCollection.insertOne(newAirlines)
      .then(result => {
        console.log('inserted count', result.insertedCount)
        res.send(result.insertedCount > 0)
      })
  })
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})