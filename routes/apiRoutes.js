const router = require("express").Router();
const mongojs = require("mongojs");
const { mongo } = require("mongoose");
const Workout = require("../models/Workout");


router.post("/api/workouts",function ({body},res){
   Workout.create(body)
    .then(data => res.json(data))
    .catch(err => {
        res.json(err)
    })
});


router.put("/api/workouts/:id", ( req ,res) => {

   Workout.updateOne({ _id: req.params.id}, { $push: { exercises: req.body } })

    .then(data => res.json(data))
    .catch(err => {
        res.json(err)
    })
});


router.get("/api/workouts",function(req,res){
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }
    ])
    .then(data =>{
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
});



router.get("/api/workouts/range",function(req,res){
    /*Workout.find({})*/
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }
    ])
    .sort({_id: -1})
    .then(data =>{
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
});


router.post("/api/workouts/range",function (req,res){
   Workout.create({})
    .then(data => res.json(data))
    .catch(err => {
        res.json(err)
    })
});


module.exports = router;