const { response } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../database");

const axios = require("axios");

router.post("/", async (req, res) => {
   try {
      if (!req.query.name) {
         return res.status(404).send("Pokemon name is required.");
      }

      const newName = await pool.query(
         `INSERT INTO favorites (name) VALUES ($1)`,
         [req.query.name]
      );

      if (newName.command == "INSERT") {
         const allNames = await pool.query(`SELECT * FROM favorites`);
         return res.status(200).send(allNames);
      } else {
         return res.status(400).send("Unable to add favorite to database.");
      }
   } catch (err) {
      return res
         .status(500)
         .send(
            "Something went wrong with the request in adding the item to the database."
         );
   }
});

router.get("/", async (req, res) => {
   try {
      const allNames = await pool.query(`SELECT * FROM favorites`);
      return res.status(200).send(allNames);
   } catch {
      return res
         .status(500)
         .send(
            "Something went wrong with the request in fetching all favorite Pokemon from the database."
         );
   }
});

router.delete("/", async (req, res) => {
   try {
      const deleteFavorite = await pool.query(
         `DELETE FROM favorites WHERE favorites_id = $1`,
         [req.query.id]
      );

      if (deleteFavorite.rowCount !== 1) {
         return res
            .status(404)
            .send("Unable to delete item as it was not found in the database.");
      } else {
         const allNames = await pool.query(`SELECT * FROM favorites`);
         return res.status(200).send(allNames);
      }
   } catch {
      return res
         .status(500)
         .send(
            "Something went wrong with the request in deleting the item in the database."
         );
   }
});

module.exports = router;
