require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");
const schema = require("./graphql/schema");
const { authenticate } = require("./middleware/auth");

//Connection to DataBase
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("db connecting");
    } else {
      console.log(`error ${err}`);
    }
  }
);

const app = express();
const PORT = process.env.PORT;

app.use(authenticate);

app.get("/", (req, res) => {
  res.send("Bonjour bienvenue");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => console.log(`server is running on : ${PORT}`));
