const { response } = require("express");
const express = require("express");
const router = express.Router();

const axios = require("axios");

const getCatFact = async () => {
   try {
      return await axios.get(`https://cat-fact.herokuapp.com/facts/random`);
   } catch (e) {
      console.log("RESPONSE", e);
   }
};

router.get("/", async (req, res) => {
   try {
      const catFact = await getCatFact();
      console.log(catFact.data.text);
      res.send(catFact.data.text);
   } catch (e) {
      console.log(e);
   }
});

module.exports = router;
