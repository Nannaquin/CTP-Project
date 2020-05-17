import React, {Component} from 'react';
import {Card, ListGroup, CardGroup, Button} from 'react-bootstrap';

function RecipeCard({id, title, dishTypes, cuisines, imageUrl, sourceUrl, diets}) {
    const recipeTitle = title;
    const cuisine = (cuisines.length != 0 ? <ListGroup.Item> {cuisines.toString()} </ListGroup.Item> : "")
    const dishType = (dishTypes.length != 0 ? <ListGroup.Item> {dishTypes.toString()} </ListGroup.Item> : "");
    let ingredientMatches = ""; // Assemble string

    
    return(
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body style={{ paddingBottom: '0px' }}>
                <Card.Title> {recipeTitle} </Card.Title>
            </Card.Body>
            <ListGroup>
                {cuisine}
                {dishType}
               {/* <ListGroup.Item> {ingredientMatches} </ListGroup.Item>*/}
            </ListGroup>
            <Card.Body><Button variant="primary" href={sourceUrl}>More Details</Button></Card.Body>
        </Card>
    )
}

function CardRow({elements}) {
    let cards = elements.map((recipe, ii) => {
        return(<RecipeCard id={recipe.id}
            title={recipe.title}
            dishTypes={recipe.dishTypes}
            cuisines={recipe.cuisines}
            imageUrl={recipe.image}
            diets={recipe.diets}
            sourceUrl={recipe.sourceUrl}
            key={ii} />);
    })
    return (<CardGroup>{cards}</CardGroup>);
}

class DisplayRecipes extends Component {


    constructor(props) {
        super(props);
        this.state = {
            recipes: this.props.recipes
        }
    }


    recipeGrouping(results) {
        let groups = []; // What we will return, holds the groups of 3

        while(results.length != 0) {
            groups.push(results.splice(0, 3));
        }
        return groups;
    }
    componentDidUpdate(prevProps) {
        if (this.props.recipes != prevProps.recipes) {
            
            // Divide recipes into array of groups of 3, and give back to this.state
            const formattedRecipes = this.recipeGrouping(this.props.recipes);
            this.setState({recipes: formattedRecipes});

        }
    }
    render() {
        console.log(this.state.recipes)

        let cards = ""; 
        if (this.state.recipes.length != 0) {
            console.log("Time to make cards")
            cards = this.state.recipes.map((group, ii) => {
                return(<CardRow elements={group}
                    key={ii} />
                );
            });
        } else cards = (<div><p>Give us something to find for you</p></div>);
        return cards;
    }
};

export default DisplayRecipes;