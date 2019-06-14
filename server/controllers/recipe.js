const axios = require('axios')
axios.defaults.baseURL = `https://api.edamam.com`
const Recipe = require('../models/recipe')

class AudioDBCont {
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
}

module.exports = AudioDBCont