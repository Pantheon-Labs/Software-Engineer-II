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

      if (pokeDex.status == 200) {
         return res.status(200).send(pokeDex.data);
      }
   } catch {
      return res
         .status(500)
         .send(
            "Something went wrong with the request in fetching the next/previous Pokemon."
         );
   }
});

router.get("/all", async (req, res) => {
   try {
      const getPokemonCollection = async () => {
         return await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
      };

      const pokemonCollection = await getPokemonCollection();

      if (pokemonCollection.status == 200) {
         return res.status(200).send(pokemonCollection.data);
      }
   } catch {
      return res
         .status(500)
         .send(
            "Something went wrong with the request in fetching Pokemon list."
         );
   }
});

module.exports = router;
