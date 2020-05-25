import React, {Component} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import {Row, Col, Container} from 'react-bootstrap';
import axios from 'axios';

import SideBar from '../components/new-sidebar-component';
import DisplayRecipes from '../components/display-recipes-component';
import Loading from '../components/Loading';

import "../css/ui.css";


// The recipe search page for the new API
class RecipeSuggestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        }
    };

    componentDidMount() {
       /* const values = this.apiCall();
        if(values instanceof Promise) console.log("conditional works")

        this.setState({
            recipes: values
        });  */
        
        const query = {
            user_id: localStorage.getItem('user_id')
            //value: this.state.value,
            /*diet: this.state.diet,
            cuisine: this.state.cuisine,
            excludeIngredients: this.state.excludeIngredients,
            intolerances: this.state.intolerances,
            number: this.state.number,
            type: this.state.type */
        }

        axios
        .get("api/food/pantrySuggest", {
            params: query
        })
        .then(res => {
            console.log(res.data.results)
            this.setState({
                recipes: res.data.results   
            });
            //this.forceUpdate()
        })
        .catch(err => {
            console.log(err)
            console.log("Call Error");
            this.setState({
                recipes: []
            })
        });     


    }

    componentDidUpdate(prevState) {
        console.log("cDU")
    }

    render() {
  
        let displayElement = undefined;
        if (this.state.recipes.length === 0) displayElement =(<div><Loading /></div>);
        else displayElement = ( <DisplayRecipes recipes={this.state.recipes}  />);
        

        return(
            <Container fluid name="root-container">
                <Row name="root-row" className="page">
                    <SideBar/>
                    <Col name="page-col" className="mt-3">
                        <Container fluid name="page-content">
                            <Row>
                                <Col>Presenting, New Meals!</Col>
                            </Row>
                            <Row>  
                                <form className="search-item-form row align-items-center" 
                                    onSubmit={this.onSubmit}>
                                </form>
                            </Row>
                            <Row>
                                {displayElement}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        
            );
    };
    
}

export default withRouter(RecipeSuggestPage);