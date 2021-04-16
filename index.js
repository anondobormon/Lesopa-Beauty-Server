const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;



const pass = 'beauty12345875632';
const app = express()
app.use(cors());
app.use(bodyParser.json())
const port = 5000



const uri = "mongodb+srv://beauty:beauty12345875632@cluster0.bmrke.mongodb.net/LeospaBeauty?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("LeospaBeauty").collection("devices");
  const adminCollection = client.db("LeospaBeauty").collection("admin");
  const serviceCollection = client.db("LeospaBeauty").collection("service");
  const orderCollection = client.db("LeospaBeauty").collection("order");


  console.log('Database connected');

  app.post('/addAdmin', (req, res) => {
    const newAdmin = req.body;
    adminCollection.insertOne(newAdmin)
      .then(result => {
        console.log('inserted-count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  });

  app.get('/service', (req, res) => {
    serviceCollection.find()
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


  app.post('/bookService', (req, res) => {
    const newOrder = req.body;
    orderCollection.insertOne(newOrder)
      .then(result => {
        console.log('inserted-count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)