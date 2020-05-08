const router = require('express').Router();
const axios = require('axios');

// Where we make calls to the schpoony api

// The thign that will make autocomplete calls
router.get('/ingredientAuto', (req, res) => {
    const {value} = req.query;
    const apiKey = process.env.SPOON_API_KEY;
    
    axios({
        "method":"GET",
        "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": apiKey
        },"params":{
        "number":"3",
        "metaInformation": "true",
        "query": value
        }
        })
        .then((response)=>{
          console.log(response.data)
          //return response.data;
          res.status(200).json({suggestions: response.data});
        })
        .catch((error)=>{
          console.log(error)
          res.status(400).json({suggestions:[]})
        });

});

// This will return recipe suggestions based pantry items
router.get('/pantrySuggest', (req, res) => {

});

// This will get recipes based upon user spec'd search
router.get('/recipeSearch', (req, res) => {
    const {value, diet, excludeIngredients, intolerances, number, type} = req.query;
    const apiKey = process.env.SPOON_API_KEY;
    console.log("Recieved params")
    // MAke a params JSON/Object
    /*
    let params = {
        query: value,
        instructionsRequired: true
    };
    if(diet) params.diet = diet;
    if(excludeIngredients) params.excludeIngredients = excludeIngredients; // comma sep list
    if(intolerances) params.intolernaces = intolerances; // comma sep list
    if(number) params.number = number;
    if(type) params.type = type; // single
    console.log(params)
    */
   
    axios({
        "method":"GET",
        "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": apiKey
        },"params":{
    //    "diet":"vegetarian",
    //   "excludeIngredients":"coconut",
    //    "intolerances":"egg%2C gluten",
        "number":"6",
        "offset":"0",
    //    "type":"main course",
        "query": value,
        "addRecipeInformation":true
        }
        })
        .then((response)=>{
          console.log(response.data.results)
          res.status(200).json({recipes: response.data.results})
        })
        .catch((error)=>{
          console.log(error)
          res.status(400).json({recipes: []})
        })
        
    //res.status(200).json({msg: "Returned Data"});
});

module.exports = router;