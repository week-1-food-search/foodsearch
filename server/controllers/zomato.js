const zomatoAPI = require('../api/zomato')
const restaurant = require('../models/restaurant')

class zomatoController{
    static getFavorite(req,res,next){
        let id = req.decoded._id
        restaurant
            .find({user:id})
            .then(response=>{
                res.send(response)
            })
            .catch(next)
    }
    static getRestaurants(req,res,next){
        let {food} = req.params
        zomatoAPI
            .get(`/search?q=${food}`)
            .then(({data})=>{
                res.status(200).json(data)
            })
            .catch(next)
    }
    static getRestaurantDetail(req,res,next){
        let {id} = req.params
        zomatoAPI
            .get(`/restaurant?res_id=${id}`)
            .then(({data})=>{
                res.status(200).json(data)
            })
            .catch(next)
    }
    static create(req,res,next){
        let user = req.decoded._id
        let {resId, name, address, rating, image} = req.body
        restaurant
            .create({user, resId, name, address, rating, image})
            .then(response=>{
                res.status(200).json(response)
            })
            .catch(next)
    }
    static remove(req,res,next){
        let id = req.params.id
        restaurant
            .findByIdAndRemove(id)
                .then( deleted => {
                    res.status(200).json(deleted)
                })
                .catch(next)
    }
}
module.exports= zomatoController    