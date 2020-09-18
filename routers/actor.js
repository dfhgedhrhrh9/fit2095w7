const mongoose = require('mongoose');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
module.exports = {
    getAll: function (req, res) {
        Actor.find({}).populate('movies').exec(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    createMany: function (req, res) {
        let newActorDetails = req.body;
        for(let i=0;i<req.body.length;i++){
        newActorDetails[i]._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails[i]);
        actor.bYear=2020-Number(newActorDetails[i].currentAge);
        console.log(actor);
        if(Number.isInteger(actor.bYear)){
        actor.save(function (err) {
            if(err) return res.json(err);
        });
        }}
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    deleteOneMovie: function (req, res) {

        Actor.findOne({ _id: req.params.aid }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
                actor.movies.pull(req.params.mid);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
        });
    },
    deleteActorMovie: function (req,res){
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
        Actor.findOne({ _id: req.params.id },function(err,obj){
            console.log(obj);
            for(let i=0;i<obj.movies.length;i++){
                console.log(obj.movies[i]);
                Movie.findByIdAndDelete(obj.movies[i],function(err){
                    if (!err) res.json();
                });
            }
        });
        
    },
    //add movie to list of movies in actor
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    }
};