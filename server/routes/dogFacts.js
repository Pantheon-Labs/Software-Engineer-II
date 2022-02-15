const { response } = require("express");
const express = require("express");
const router = express.Router();

const axios = require("axios");

function getRandomInt(max) {
   return Math.floor(Math.random() * max);
}

const getDogFacts = async () => {
   try {
      return await axios.get(
         `https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?index=${getRandomInt(
            200
         )}`
      );
   } catch (e) {
      console.log("RESPONSE", e);
   }
};

router.get("/", async (req, res) => {
   try {
      const dogFact = await getDogFacts();
      const { data } = dogFact;
      res.send(data[0].fact);
   } catch (e) {
      console.log(e);
   }
});

module.exports = router;
