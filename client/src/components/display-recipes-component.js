import React, {Component} from 'react';
import {Card, ListGroup, CardGroup, Button} from 'react-bootstrap';


function makeListGroupItem(data) {
    return (<ListGroup.Item>{data}</ListGroup.Item>);
}

function makeMatchString(usedCount, missingCount) {
    return (
        <span className="text-success">{`${usedCount} Owned`}</span>
        /
        <span className="text-secondary">{`${missingCount} Missing`}</span>
    )
}

function RecipeCard({id, title, imageUrl, sourceUrl, dishTypes, cuisines, diets, usedCount, missingCount}) {
    console.log(`c: ${cuisines}, dT: ${dishTypes}`)

    const cuisine = makeListGroupItem(
        ( (cuisines !== undefined && (cuisines.length !== 0) ) ? cuisines.toString() : "Unavailable"));
    const dishType = ( (dishTypes !== undefined && (dishTypes.length !== 0) ) 
        ? makeListGroupItem(dishTypes[0]) : "");
    //const dietElem = (diets.length != 0 ? makeListGroupItem(diets.toString()) : "");
    const matchElem = (usedCount !== undefined ? 
        makeListGroupItem(makeMatchString(usedCount, missingCount)) : "");



    
    return(
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body style={{ paddingBottom: '0px' }}>
                <Card.Title> {title} </Card.Title>
            </Card.Body>
            <ListGroup>
                {cuisine}
                {dishType}
                {matchElem}
            </ListGroup>
            <Card.Body>
                <Button 
                    variant="primary" 
                    href={sourceUrl} 
                    target="_blank">More Details
                </Button>
            </Card.Body>
        </Card>
    )
}

function CardRow({elements}) {
    console.log(elements)
    let cards = elements.map((recipe, ii) => {
        return(<RecipeCard id={recipe.id}
            title={recipe.title}
            dishTypes={recipe.dishTypes}
            cuisines={recipe.cuisines}
            imageUrl={recipe.image}
            diets={recipe.diets}
            sourceUrl={recipe.sourceUrl}
            usedCount={recipe.usedIngredientCount}
            missingCount={recipe.missedIngredientCount}
            key={ii} />);
    })
    return (<CardGroup>{cards}</CardGroup>);
}

class DisplayRecipes extends Component {


    constructor(props) {
        super(props);

        const formattedRecipes = this.recipeGrouping(this.props.recipes);

        this.state = {
            recipes: formattedRecipes // this.props.recipes
        }
    }


    recipeGrouping(results) {
        let groups = []; // What we will return, holds the groups of 3

        while(results.length !== 0) {
            groups.push(results.splice(0, 3));
        }
        return groups;
    }

    componentDidUpdate(prevProps) {
        if (this.props.recipes !== prevProps.recipes ){//&& this.props.recipes != undefined) {
            //console.log(`now: ${this.props.recipes}, past: ${prevProps.recipes}`)
            // Divide recipes into array of groups of 3, and give back to this.state
            const formattedRecipes = this.recipeGrouping(this.props.recipes);
            this.setState({recipes: formattedRecipes});

        }
    }
    render() {
        //console.log(this.state.recipes)

        let cards = ""; 
        if (this.state.recipes.length !== 0) {
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