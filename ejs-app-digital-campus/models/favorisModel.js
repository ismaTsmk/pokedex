const mongoose = require('mongoose');

const favorisSchema = new mongoose.Schema({
    name: String,
    level: Number,
    height: Number,
    image: String,
    comment:String
})

const Favoris = mongoose.model('Favoris', favorisSchema);

module.exports = Favoris;


// - Se connecter à la base de données mongo
// - Créer un model User
// - Créer une route permettant d'utiliser 
// la méthode d'un controller
// - Tester cette route à l'aide de postman