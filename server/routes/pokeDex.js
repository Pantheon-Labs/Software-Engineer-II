const { response } = require("express");
const express = require("express");
const router = express.Router();

const axios = require("axios");

router.get("/", async (req, res) => {
   try {
      const getPokeDexOffset = async () => {
         try {
            return await axios.get(
               `https://pokeapi.co/api/v2/pokemon/${req.query.offset}`
            );
         } catch (e) {
            res.status(404).send(
               "Not able to fetch the next/previous pokemon."
            );
         }
      };

      const pokeDex = await getPokeDexOffset();
      res.send(pokeDex.data);
   } catch (e) {
      res.status(404).send("Not found.");
   }
});

router.get("/all", async (req, res) => {
   try {
      const getPokeDexOffset = async () => {
         try {
            return await axios.get(
               `https://pokeapi.co/api/v2/pokemon?limit=1000`
            );
         } catch (e) {
            res.status(404).send("Not able to fetch all pokemon.");
         }
      };

      const pokeDex = await getPokeDexOffset();
      res.send(pokeDex.data);
   } catch (e) {
      res.status(404).send("GET request unavailable.");
   }
});

module.exports = router;
