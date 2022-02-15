const express = require("express");
const server = express();

const cors = require("cors");
server.use(cors());

const PORT = 4000;

const catFactsRoute = require("./routes/catFacts");
server.use("/catFacts", catFactsRoute);

server.listen(PORT, () => {
   console.log(`Now running on port ${PORT}`);
});
