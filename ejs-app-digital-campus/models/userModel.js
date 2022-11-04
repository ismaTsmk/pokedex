const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;


// - Se connecter à la base de données mongo
// - Créer un model User
// - Créer une route permettant d'utiliser 
// la méthode d'un controller
// - Tester cette route à l'aide de postman