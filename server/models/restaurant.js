const mongoose = require('mongoose')

const {Schema} = mongoose
const restaurantSchema = new Schema({
    user : { type: Schema.Types.ObjectId, ref: 'User'},
    resId : String,
    name : String,
    address: String,
    rating: Number,
    image: String
})
const restaurant = mongoose.model('restaurant', restaurantSchema)
module.exports = restaurant