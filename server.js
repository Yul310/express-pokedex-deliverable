//======== setting =========//
const express = require('express')
const app = require("liquid-express-views")(express())
const methodOverride = require('method-override')
const pokemons = require('./models/pokedex/pokemon.js')


app.listen(3000,() => {
    
    console.log("working")

})

app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

app.use(express.urlencoded({
    extended: false
})) // allows us to view body of a post request


app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'
app.use(express.json()) // This prepares our api to receive json data from the body of all incoming requests.
//use methodOverride. We'll be adding a query parameter to our delete form named_method
app.use(methodOverride('_method'))


//======= Page Construction =====//



//Index page(Home)

app.get('/pokedex',(req,res) =>{
    // res.send("hello")
    res.render(
        'index',{
            allPokemons: pokemons
        }
    )
})


app.get('/pokedex/:index',(req,res) =>{
    // res.send("hello")
    res.render(
        'show',{
            pokemon: pokemons[req.params.index]
        }
    )
})