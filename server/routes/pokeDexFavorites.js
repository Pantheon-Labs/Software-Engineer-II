const { response } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../database");
require("dotenv").config();

const axios = require("axios");

router.post("/", async (req, res) => {
   try {
      const newName = await pool.query(
         `INSERT INTO ${process.env.TABLE_NAME} (name) VALUES ($1)`,
         [req.query.name]
      );

      const allNames = await pool.query(
         `SELECT * FROM ${process.env.TABLE_NAME}`
      );
      res.send(allNames);
   } catch (e) {
      console.log(e);
   }
});

router.get("/", async (req, res) => {
   try {
      const allNames = await pool.query(
         `SELECT * FROM ${process.env.TABLE_NAME}`
      );
      res.send(allNames);
   } catch (e) {
      console.log(e);
   }
});

router.delete("/", async (req, res) => {
   try {
      const deleteFavorite = await pool.query(
         `DELETE FROM ${process.env.TABLE_NAME} WHERE favorites_id = $1`,
         [req.query.id]
      );

      const allNames = await pool.query(
         `SELECT * FROM ${process.env.TABLE_NAME}`
      );
      res.send(allNames);
   } catch (e) {
      console.log(e);
   }
});

module.exports = router;
