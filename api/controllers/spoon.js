const router = require('express').Router();
const axios = require('axios');

const User = require('../models/User');

const ingredientReduction = require('../middlewares/ingredient-reduce');

// @route GET
// @body {
//     value: {Type: String}
// }
// @desc  Supplies suggestions to autocomplete a query based on letters already entered.
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
// @route GET
// @body {
//     user_id: {Type: String} (REQUIRED),
//     diet: {Type: String},
//     type: {Type: String}
//    
// }
// @desc  Gets recipe suggestions based on user inventory and specifications
router.get('/pantrySuggest', (req, res) => {
  const {user_id, diet, type} = req.query;
  const apiKey = process.env.SPOON_API_KEY;

  User.findOne({_id: user_id})
  .then(user => {
    if(!user) throw new Error("User not found");

    const items = user.inventory;
    if(items.length === 0) throw new Error("No ingredients in inventory");
    const ingredientStr = ingredientReduction(items); 

    axios({
      "method":"GET",
      "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
      "useQueryString":true
      },"params":{
      // Our Required Params
      "includeIngredients": ingredientStr,
      "excludeIngredients": "water",
      "addRecipeInformation": true,
      //"fillIngredients": true,
      "instructionsRequired": true,
      "ranking":"1",
      // The Options from the front end
      //"cuisine": cuisine,
      //"type":type,
      // Route Requried Params
      "limitLicense":"false",
      "offset":"0",
      "number":"6"
      } 
      })
      .then((response)=>{
        console.log("Suggest Responses:")
        console.log(response.data.results);
        res.status(200).json({results: response.data.results});
      })
      .catch((error)=>{
        console.log(error)
        res.status(400).json({"msg": "Bad"});
      })
  })
  .catch(err => {
    console.log(err);
    res.status(400).json({"msg": "Bad"});
  });
  





});

// @route GET
// @body {
//     value: {Type: String} (REQUIRED),
//     diet: {Type: String},
//     type: {Type: String}
//     excludeIngredients: {Type: String},
//     intolerances: {Type: String},
//     number: {Type: Number},
// }
// @desc  Supplies suggestions to autocomplete a query based on letters already entered.
router.get('/recipeSearch', (req, res) => {
    const {value, diet, excludeIngredients, intolerances, number, type} = req.query;
    const apiKey = process.env.SPOON_API_KEY;
    
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