const { response } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../database");

const axios = require("axios");

router.post("/", async (req, res) => {
   try {
      const newName = await pool.query(
         `INSERT INTO favorites (name) VALUES ($1)`,
         [req.query.name]
      );

      const allNames = await pool.query(`SELECT * FROM favorites`);
      res.send(allNames);
   } catch (e) {
      console.log(e);
   }
});

router.get("/", async (req, res) => {
   try {
      const allNames = await pool.query(`SELECT * FROM favorites`);
      res.send(allNames);
   } catch (e) {
      console.log(e);
   }
});

router.delete("/", async (req, res) => {
   try {
      const deleteFavorite = await pool.query(
         `DELETE FROM favorites WHERE favorites_id = $1`,
         [req.query.id]
      );

      const allNames = await pool.query(`SELECT * FROM favorites`);
      res.send(allNames);
   } catch (e) {
      console.log(e);
   }
});

module.exports = router;
