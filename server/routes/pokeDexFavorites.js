const { response } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../database");

const axios = require("axios");

router.post("/", async (req, res) => {
   try {
      if (!req.query.name) {
         return res.status(400).send("Pokemon name is required.");
      }

      const newName = await pool.query(
         `INSERT INTO favorites (name) VALUES ($1)`,
         [req.query.name]
      );

      const allNames = await pool.query(`SELECT * FROM favorites`);
      res.status(200).send(allNames);
   } catch (err) {
      res.status(500).send(err);
   }
});

router.get("/", async (req, res) => {
   try {
      const allNames = await pool.query(`SELECT * FROM favorites`);
      res.status(200).send(allNames);
   } catch (err) {
      res.status(500).send(err);
   }
});

router.delete("/", async (req, res) => {
   try {
      const deleteFavorite = await pool.query(
         `DELETE FROM favorites WHERE favorites_id = $1`,
         [req.query.id]
      );

      if (deleteFavorite.rowCount !== 1) {
         return res.status(404).send("Unable to delete item.");
      }

      const allNames = await pool.query(`SELECT * FROM favorites`);
      res.status(200).send(allNames);
   } catch (err) {
      res.status(500).send(err);
   }
});

module.exports = router;
