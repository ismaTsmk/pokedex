const Favoris = require('../models/favorisModel');



const pokeDetails = (req, res) => {
    pokeName = req.params.pokeName
    console.log('https://pokeapi.co/api/v2/pokemon/'+pokeName)
    // return res.json({poke:"ststs"})
    fetch('https://pokeapi.co/api/v2/pokemon/'+pokeName)
        .then(res => res.json())
        .then(data => {
             res.json( data);
        })
 
}


const index = (req, res) => { // Récupérer les users et les afficher dans la vue
    Favoris.find((err, favs) => {
        res.status(200).json(favs)
        // res.status(200).render('users', { users })
    })
}


const create = (req, res) => { // Créer un user

    console.log('hdsgdyd')
    const { name,level ,height, image, comment  } =  req.body
    Favoris.create({ name,level ,height, image, comment  })
        .then(favori => {
            res.status(201).json(favori)
        })
        .catch(err => res.status(500).json(err))
}


const deleteFav = (req, res) => { // Créer un user

    console.log('hdsgdyd')
    const { name,level ,height, image, comment  } =  req.body
    Favoris.findByIdAndDelete(req.params.id)
        .then(favori => {
            res.status(201).json(favori)
        })
        .catch(err => res.status(500).json(err))
}


module.exports = { // Exporter les méthodes
    create,
    pokeDetails,
    index,
    deleteFav
}