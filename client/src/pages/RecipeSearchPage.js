import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Row, Col, Container, Button} from 'react-bootstrap';
import axios from 'axios';

import SideBar from '../components/new-sidebar-component';
import DisplayRecipes from '../components/display-recipes-component';

import '../css/search-page.css';

// The recipe search page for the new API
class RecipeSearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            value: "", // Main Search Term (String)
            diet: "", // Drop Down Single Option (10) (Including None)
            cuisine: "", // Multiple Options (26) (Including Empty)
            excludeIngredients: "", // Multiple Options (fully user spec'd)
            intolerances: "", // Multiple Options (12)
            number: 3, // Drop Down Single Options(3, 6, 9, 12)
            type: "", // Drop Down Single Option (Including None)
            recipes: []
        };
    };

    onSubmit = e => {
        e.preventDefault();
        this.apiCall();
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    apiCall() {
        const query = {
            value: this.state.value,
            /*diet: this.state.diet,
            cuisine: this.state.cuisine,
            excludeIngredients: this.state.excludeIngredients,
            intolerances: this.state.intolerances,
            number: this.state.number,
            type: this.state.type */
        }

        axios
        .get("api/food/recipeSearch", {
            params: query
        })
        .then(res => {
            console.log(res.data);
            this.setState({
                recipes: res.data.recipes
            });
        })
        .catch(err => {
            console.log("Call Error");
            this.setState({
                recipes: []
            });
        });     


    }

    render() {
        console.log(this.state.value);
        return(
            <Container name="root-container" className="mt-3">
            <Row name="root-row">
                <Col name="sidebar-col" xs={2}><SideBar/></Col>
                <Col name="page-col">
                <Container fluid>
                    <Row>
                        <Col>Find Your Next Meal!</Col>
                    </Row>
                    <Row>  
                        <form className="search-item-form row align-items-center" onSubmit={this.onSubmit}>

                            {/* Search Term */}
                            <Col>
                                <input type="text" 
                                    id="value" 
                                    name="value" 
                                    onChange={this.onChange}
                                    className="form-control search-input text-dark"/>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={this.onSubmit}>Search</Button>
                            </Col>
                        </form>
                    </Row>
                    <Row>
                        <DisplayRecipes recipes={this.state.recipes}  />
                    </Row>
                </Container>
                </Col>
            </Row>
            </Container>
        
            );
    };
    
}

export default withRouter(RecipeSearchPage);