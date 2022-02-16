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
            console.log("RESPONSE", e);
         }
      };

      const pokeDex = await getPokeDexOffset();
      res.send(pokeDex.data);
   } catch (e) {
      console.log(e);
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
            console.log("RESPONSE", e);
         }
      };

      const pokeDex = await getPokeDexOffset();
      res.send(pokeDex.data);
   } catch (e) {
      console.log(e);
   }
});

module.exports = router;
