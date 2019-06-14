const mongoose = require('mongoose')
const Schema = mongoose.Schema
<<<<<<< HEAD
var uniqueValidator = require('mongoose-unique-validator');
=======
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
>>>>>>> 6aed9fc40b2b8a4ee4dc2f350faba034d6dfe1ee

const recipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
<<<<<<< HEAD
  name: {
    type: String,
    unique: true
=======
  uri: String,
  name: {
    type: String,
    validate: [
      { validator: isUnique, msg: props => `${props.value} is already in your favorites!` }]
>>>>>>> 6aed9fc40b2b8a4ee4dc2f350faba034d6dfe1ee
  },
  image: String,
  source: String,
  url: String
})

<<<<<<< HEAD
recipeSchema.plugin(uniqueValidator);
=======
// recipeSchema.plugin(uniqueValidator);
>>>>>>> 6aed9fc40b2b8a4ee4dc2f350faba034d6dfe1ee

const Recipe = mongoose.model('Recipe',recipeSchema)

module.exports = Recipe