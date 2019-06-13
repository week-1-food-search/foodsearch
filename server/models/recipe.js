const mongoose = require('mongoose')
const Schema = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator');

const recipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    unique: true
  },
  image: String,
  source: String,
  url: String
})

recipeSchema.plugin(uniqueValidator);

const Recipe = mongoose.model('Recipe',recipeSchema)

module.exports = Recipe