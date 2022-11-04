const User = require('../models/userModel');

const index = (req, res) => { // Récupérer les users et les afficher dans la vue
    User.find((err, users) => {
        res.status(200).json(users)
        // res.status(200).render('users', { users })
    })
}

const create = (req, res) => { // Créer un user
    const { name, age, city } =  req.body

    User.create({ name, age, city })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => res.status(500).json(err))
}

const findUser = (req, res) => { // Récupérer un user par son id
    const {id} = req.params

    User.findById(id, (err, user) => {

        if (err) res.status(500).json({err, message: "Unable to find user"}) // Si erreur, renvoyer un code 500 et l'erreur
        if (user === null) res.status(404).json({message: "user not found"}) // Si pas de user, renvoyer un code 404 et un message

        else res.status(200).json(user)
    })
}

const deleteUser = (req, res) => { // Supprimer un user par son id
    const {id} = req.params

    User.findByIdAndDelete(id, (err, user) => {
        if (err) res.status(500).json({err, message: "Unable to delete user"}) // Si erreur, renvoyer un code 500 et l'erreur
        if (user === null) res.status(404).json({message: "user not found"}) // Si pas de user, renvoyer un code 404 et un message
        else res.status(200).json({message: "user deleted", user})
    })
}

const editUser = (req, res) => { // edit un user par son id
    const {id} = req.params
    const {name, age, city} = req.body

    User.findByIdAndUpdate(id, {name, age, city}, (err, user) => {
        if (err) res.status(500).json({err, message: "Unable to update user"}) // Si erreur, renvoyer un code 500 et l'erreur
        if (user === null) res.status(404).json({message: "user not found"}) // Si pas de user, renvoyer un code 404 et un message
        else res.status(200).json(user)
    })
}

module.exports = { // Exporter les méthodes
    index,
    create,
    findUser,
    deleteUser,
    editUser
}