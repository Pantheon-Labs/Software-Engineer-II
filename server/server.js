const express = require("express");
const server = express();

const cors = require("cors");
const PORT = 4000;

const dogFactsRoute = require("./routes/dogFacts");
const catFactsRoute = require("./routes/catFacts");
const pokeDexRoute = require("./routes/pokeDex");
const pokeDexFavoritesRoute = require("./routes/pokeDexFavorites");

server.use(cors());

server.use("/dogFacts", dogFactsRoute);
server.use("/catFacts", catFactsRoute);
server.use("/pokeDex", pokeDexRoute);
server.use("/pokeDexFavorites", pokeDexFavoritesRoute);

server.listen(PORT, () => {
   console.log(`Now running on port ${PORT}`);
});
