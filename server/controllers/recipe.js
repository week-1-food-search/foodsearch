const axios = require('axios')
axios.defaults.baseURL = `https://api.edamam.com`

class AudioDBCont {
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
    axios.get(`/search?r=${req.query.uri}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`)
      .then(({ data }) => {
        res.json({
          data: data[0]
        })
      })
      .catch(next)
  }
}

module.exports = AudioDBCont