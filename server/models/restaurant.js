const mongoose = require('mongoose')

const {Schema} = mongoose

function isUnique(resId){
    return new Promise((resolve, reject) => {
        restaurant.findOne({ resId })
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

const restaurantSchema = new Schema({
    user : { type: Schema.Types.ObjectId, ref: 'User'},
    resId : {
        type: String,
        validate:[
            { validator: isUnique, msg: props => ` restaurant already in favorite`}
        ]
    },
    name : String,
    address: String,
    rating: Number,
    image: String
})
const restaurant = mongoose.model('restaurant', restaurantSchema)
module.exports = restaurant