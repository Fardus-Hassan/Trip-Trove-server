const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 3000

// middle ware

app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.ak5lvkp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {

    const TouristsSpotsCollection = client.db("TouristsDB").collection("TouristsSportsCollection");


    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        app.get('/touristSpots', async (req, res) => {
            const cursor = TouristsSpotsCollection.find()
            const result = await cursor.toArray();
            res.send(result)
        })

        app.get('/touristSpots/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await TouristsSpotsCollection.findOne(query);
            res.send(result)
        })

        app.get('/touristSpots/myList/:email', async (req, res) => {
            const email = req.params.email
            const query = { email : email }
            const cursor = TouristsSpotsCollection.find(query)
            const result = await cursor.toArray();
            res.send(result)
        })

        app.post('/touristSpots', async (req, res) => {
            const touristsData = req.body
            const result = await TouristsSpotsCollection.insertOne(touristsData)
            res.send(result)
        })

        app.delete('/touristSpots/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await TouristsSpotsCollection.deleteOne(query)
            res.send(result)
        })

        app.put('/touristSpots/:id', async (req, res) => {
            const id = req.params.id
            const touristsData = req.body
            const query = { _id: new ObjectId(id) }
            const optional = { upsert: true }
            const data = {
                $set: touristsData
            }
            const result = await TouristsSpotsCollection.updateOne(query, data, optional)
            res.send(result)
        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('This is TripTrove-server')
})

app.listen(port, () => {
    console.log(`TripTrove-server running on port ${port}`)
})