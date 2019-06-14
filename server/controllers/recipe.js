const axios = require('axios')
axios.defaults.baseURL = `https://api.edamam.com`
const Recipe = require('../models/recipe')
var mongoose = require('mongoose');

class RecipeCont {
  static addToFav(req, res, next){
    Recipe.create({
      user: req.decoded._id,
      uri: req.body.uri,
      name: req.body.name,
      image: req.body.image,
      source: req.body.source,
      url: req.body.url,
    })
    .then(row =>{
      res.status(201).json(row)
    })
    .catch(next)
  }

  static removeFav(req, res, next){
    Recipe.deleteOne({ _id: req.params.id })
    .then(result =>{
      res.status(200).json(result)
    })
    .catch(next)
  }

  static search(req, res, next) {
    axios.get(`/search?q=${req.query.name}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`)
      .then(({ data }) => {
        res.json({
          data: data.hits.splice(0,10)
        })
      })
      .catch(next)
  }

  static detail(req, res, next) {
    axios.get(`/search?r=${req.params.uri}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`)
      .then(({ data }) => {
        res.json({
          data: data[0]
        })
      })
      .catch(next)
  }

  static listfav (req, res, next) {
    Recipe.find({user: mongoose.Types.ObjectId(req.decoded._id)}, function (err, recipes) {
      if (err) {
        next ({code: 400, message: err.message})
      } else {
        let output = []
        for (let i = 0; i < recipes.length; i++){
          let recipe = {
            name: recipes[i].name,
            uri: recipes[i].uri,
            image: recipes[i].image,
            source: recipes[i].source,
            url: recipes[i].url,
          }
          output.push(recipe)
        }
        res.status(200).json(output)
      }
    })
  }
}

module.exports = RecipeCont