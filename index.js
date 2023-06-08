const express = require("express");
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//Using_Middleware
app.use(cors());
app.use(express.json());

// MongoDB Script
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vin9bep.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // database and collection
    const toyCarsCollection = client.db('toyMarket').collection('toycars');

    app.get('/allToyCars', async (req, res) => {
        const cursor = toyCarsCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    // Add a toy to Database
    app.post('/addToy', async (req, res) => {
      const addToy = req.body;
      console.log(addToy)
      const result = await toyCarsCollection.insertOne(addToy);
      res.send(result);
  });



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




// Default Route
app.get("/", (req, res) => {
  res.send("toy marketplace server is running sucessfully");
});

app.listen(port, () => {
  console.log(`toy marketplace server is running on port: ${port}`);
});
