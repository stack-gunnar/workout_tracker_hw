const router = require("express").Router();
const mongoose = require("mongoose");
const db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .sort({ day: 1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .sort({ day: -1 }) 
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
    db.Workout.update(
        {
          _id: req.params.id
        },
        {
          $push: {
            exercises: req.body
          }
        },
        (error, data) => {
          if (error) {
            res.send(error);
          } else {
            res.send(data);
          }
        }
      );
});

module.exports = router;