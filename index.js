const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;




const app = express()
app.use(cors());
app.use(bodyParser.json())
const port = 5000



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bmrke.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("LeospaBeauty").collection("devices");
  const adminCollection = client.db("LeospaBeauty").collection("admin");
  const serviceCollection = client.db("LeospaBeauty").collection("service");
  const orderCollection = client.db("LeospaBeauty").collection("order");
  const reviewCollection = client.db("LeospaBeauty").collection("review");


  console.log('Database connected');

  app.post('/addAdmin', (req, res) => {
    const newAdmin = req.body;
    adminCollection.insertOne(newAdmin)
      .then(result => {
        console.log('inserted-count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  });

  app.get('/allOrders', (req, res) => {
    orderCollection.find()
      .toArray((err, pd) => {
        res.send(pd)
      })
  })

  app.post('/addService', (req, res) => {
    const newAdmin = req.body;
    serviceCollection.insertOne(newAdmin)
      .then(result => {
        console.log('inserted-count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  app.post('/addReview', (req, res) => {
    const newReview = req.body;
    reviewCollection.insertOne(newReview)
      .then(result => {
        console.log('inserted-count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })

  app.get('/review', (req, res) => {
    reviewCollection.find()
      .toArray((err, reviews) => {
        res.send(reviews)
      })
  })

  app.get('/service', (req, res) => {
    serviceCollection.find()
      .toArray((err, pd) => {
        res.send(pd)
      })
  })

  app.post('/isAdmin', (req, res) => {
    const email = req.body.email;
    adminCollection.find({ email: email })
      .toArray((err, admin) => {
        res.send(admin.length > 0)
      })
  })


  app.post('/bookService', (req, res) => {
    const newOrder = req.body;
    orderCollection.insertOne(newOrder)
      .then(result => {
        console.log('inserted-count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })

  app.delete('/delete/:id', (req, res) => {
    orderCollection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        console.log(result);
      })
  })


});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)