const index = (req, res) => {

    const users = [
        { name: 'John', age: 20, active: true },
        { name: 'Jane', age: 30, active: false },
        { name: 'Jack', age: 40, active: true },
    ]

    fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
        .then(res => res.json())
        .then(data => {
            res.json({ 
                title: 'Express',
                message: "Hello world",
                users,
                pokemon: data.results
            });
        })
 
}





// Créer un controller qui va renvoyer 
// une view "users"
// Renvoyer un tableau avec des users
// {name: "John", age: 25, city: "Paris"}
// Dans la vue : afficher ces données 
// sous la forme d'une liste 

module.exports = {
    index
}