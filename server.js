//======== setting =========//
const express = require('express')
const app = require("liquid-express-views")(express())
const methodOverride = require('method-override')
const rowdy = require('rowdy-logger')
const routesReport = rowdy.begin(app)
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


// New page - render html

app.get('/pokedex/new', (req, res) => {
    res.render('new')
})

// New page - put new req.body to pokemons
app.post('/pokedex', (req, res) => {
  
    pokemons.unshift(req.body);
    console.log(req.body);
    res.redirect('/pokedex'); 
});



//Show Page(Individual pokemon page render)
app.get('/pokedex/:index',(req,res) =>{
    // res.send("hello")
    res.render(
        'show',{
            pokemon: pokemons[req.params.index]
        }
    )
})

//Delete from Homepage
app.delete('/pokedex/:index',(req,res) => {
pokemons.splice(req.params.index,1)
res.redirect('/pokedex')
}
)





app.get("/pokedex/:index/edit", (req, res) => {
    res.render(
      "edit",
      {
        
        pokemon: pokemons[req.params.index], //the fruit object
        index: req.params.index //... and its index in the array
      }
    );
  });






app.put("/pokedex/:index", (req, res) => {
  console.log(req.body)

//   pokemons[req.params.index].name = req.body.name; 
//   pokemons[req.params.index].img = req.body.img; 
//   pokemons[req.params.index].type = req.body.type; 
//   pokemons[req.params.index].stats = req.body.stats; 
//   pokemons[req.params.index].damage = req.body.damages;
//   pokemons[req.params.index].abilities= req.body.abilities;
pokemons[req.params.index]= { 
    name:req.body.name,
    img:req.body.img,
    type:req.body.type,
    stats:req.body.stats,
    damages:req.body.damages,
    ability:req.body.abilities
}
  res.redirect("/pokedex"); 
});
