const express = require("express");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;

const app = express();

const port = 5000;

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.dbName}:${process.env.dbPass}@cluster0.sn2gl.mongodb.net/${process.env.db}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("Degency").collection("services");
  const orderCollection = client.db("Degency").collection("orders");
  const reviewCollection = client.db("Degency").collection("reviews");
  const adminCollection = client.db("Degency").collection("admins");
  const blogCollection = client.db("Degency").collection("blogs");

  app.post("/addService", (req, res) => {
    const service = req.body;
    console.log(service);

    collection
      .insertOne(service)
      .then((resultt) => console.log("Service Added"));
  });

  app.get("/services", (req, res) => {
    collection.find({}).toArray((err, doc) => {
      res.send(doc);
    });
  });

  app.get("/order/:id", (req, res) => {
    collection.find({ _id: ObjectId(req.params.id) }).toArray((err, doc) => {
      res.send(doc);
    });
  });

  app.post("/addOrder", (req, res) => {
    const order = req.body;

    orderCollection
      .insertOne(order)
      .then((result) => console.log("Order Added"));
  });

  app.get("/orders", (req, res) => {
    orderCollection.find({}).toArray((err, doc) => {
      res.send(doc);
    });
  });
  app.post("/addReview", (req, res) => {
    const review = req.body;

    reviewCollection
      .insertOne(review)
      .then((result) => console.log("Review Added"));
  });

  app.get("/review", (req, res) => {
    reviewCollection.find({}).toArray((err, doc) => {
      res.send(doc);
    });
  });

  app.post("/addAdmin", (req, res) => {
    const admin = req.body;

    adminCollection.insertOne(admin).then((result) => console.log(result));
  });

  app.post("/addBlogs", (req, res) => {
    const blog = req.body;

    blogCollection.insertOne(blog).then((result) => console.log(result));
  });
  app.get("/blog", (req, res) => {
    blogCollection.find({}).toArray((err, doc) => {
      res.send(doc);
    });
  });
  console.log("Database Connected");
});

app.listen(process.env.port || port, () =>
  console.log(`Server listening to ${port}`)
);
