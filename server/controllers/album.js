// const axios = require('../axios')

const Album = require('../models/album')

class AlbumCont {
  static create(req, res, next) {
    const { idAlbum, strAlbum, strArtist, intYearReleased, strAlbumThumb } = req.body
    const album = new Album({ user: req.decoded._id, idAlbum, strAlbum, strArtist, intYearReleased, strAlbumThumb })
    album.save()
      .then(row => {
        res.status(201).json(row)
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    let obj = {}
    if(req.query.artist) obj.artist
    Album.find({})
      .then(row => {
        res.status(200).json(row)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    Album.findById(req.params.id)
      .then(row => {
        res.status(200).json(row)
      })
      .catch(next)
  }

  static update(req, res, next) {
    let obj = {}
    if (req.method === "PATCH") {
      if (req.body.idAlbum)
        obj.idAlbum = req.body.idAlbum
      if (req.body.strAlbum)
        obj.strAlbum = req.body.strAlbum
      if (req.body.strArtist)
        obj.strArtist = req.body.strArtist
      if (req.body.intYearReleased)
        obj.intYearReleased = req.body.intYearReleased
      if (req.body.strAlbumThumb)
        obj.strAlbumThumb = req.body.strAlbumThumb
    }
    else {
      obj = {
        idAlbum: req.body.idAlbum,
        strAlbum: req.body.strAlbum,
        strArtist: req.body.strArtist,
        intYearReleased: req.body.intYearReleased,
        strAlbumThumb: req.body.strAlbumThumb
      }
    }
    Album.findByIdAndUpdate(req.params.id, obj, { new: true })
      .then(row => {
        res.status(200).json(row)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    Album.findByIdAndDelete(req.params.id)
      .then(row => {
        res.status(200).json(row)
      })
      .catch(next)
  }
}

module.exports = AlbumCont

// class AlbumCont{
//   static create(req,res,next){
//     axios.get('/user/repos')
//     .then(({data}) =>{
//       res.json(data)
//     })
//     .catch(next)
//   }

//   static createRepos(req,res,next){
//     console.log(req.body)
//     axios.post('/user/repos', { 
//       name: req.body.name,
//       description: req.body.description,
//       auto_init: req.body.auto_init
//     })
//     .then(({data}) =>{
//       res.json(data)
//     })
//     .catch(next)
//   }

//   static getAllUsers(req,res,next){
//     axios
//     .get('/users')
//     .then(({data})=>{
//       res.status(200).json(data)
//     })
//     .catch(next)
//   }

//   static getUserRepo(req,res,next){
//     axios
//     .get(`/repos/${req.params.owner}/${req.params.repo}`)
//     .then(({data})=>{
//       res.status(200).json(data)
//     })
//     .catch(next)
//   }

//   static userLoggedIn(req,res,next){
//     axios
//     .get('/user')
//     .then(({data})=>{
//       res.status(200).json(data)
//     })
//     .catch(next)
//   }
// }

// module.exports = AlbumCont