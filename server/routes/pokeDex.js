const { response } = require("express");
const express = require("express");
const router = express.Router();

const axios = require("axios");

router.get("/", async (req, res) => {
   try {
      const getPokeDexOffset = async () => {
         return await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${req.query.offset}`
         );
      };

      const pokeDex = await getPokeDexOffset();
      res.status(200).send(pokeDex.data);
   } catch (err) {
      res.status(500).send(err);
   }
});

router.get("/all", async (req, res) => {
   try {
      const getPokeDexOffset = async () => {
         return await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
      };

      const pokeDex = await getPokeDexOffset();
      res.status(200).send(pokeDex.data);
   } catch (err) {
      res.status(500).send(err);
   }
});

module.exports = router;
