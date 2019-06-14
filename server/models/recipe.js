const mongoose = require('mongoose')
const Schema = mongoose.Schema
// var uniqueValidator = require('mongoose-unique-validator');

function isUnique(name) {
  return new Promise((resolve, reject) => {
    Recipe.findOne({ name })
      .then(row => {
        if (row)
          resolve(false)
        else
          resolve(true)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const recipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  uri: String,
  name: {
    type: String,
    validate: [
      { validator: isUnique, msg: props => `${props.value} is already in your favorites!` }]
  },
  image: String,
  source: String,
  url: String
})

// recipeSchema.plugin(uniqueValidator);

const Recipe = mongoose.model('Recipe',recipeSchema)

module.exports = Recipe