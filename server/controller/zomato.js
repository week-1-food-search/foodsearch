const zomatoAPI = require('../api/zomato')

class zomatoController{
    static getRestaurants(req,res,next){
        let {food} = req.params
        zomatoAPI
            .get(`/search?=q${food}`)
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
}
module.exports= zomatoController    