const express = require("express");
const server = express();

const cors = require("cors");
const PORT = 4000;

const dogFactsRoute = require("./routes/dogFacts");
const catFactsRoute = require("./routes/catFacts");

server.use(cors());

server.use("/dogFacts", dogFactsRoute);
server.use("/catFacts", catFactsRoute);

server.listen(PORT, () => {
   console.log(`Now running on port ${PORT}`);
});
