import React, {Component} from 'react';
import {Modal, Container, Row, Col} from "react-bootstrap";
import AutosuggestComponent from './autosuggest-component';
import axios from 'axios';

function Unit({name}) {
    return(
        <option value={name}>{name}</option>
    )
        
}

class AddItemPopup extends Component {

    constructor(props){
        super(props);

        const today = new Date();
        this.state = {
            user_id: "",
            api_id: "",
            name: "",
            possible_units: [],
            amount: "",
            chosen_units: "",
            //expr_date: ""
           /* month: today.getMonth() + 1,
            day: today.getDate(),
            year: today.getFullYear() */
            expr_date: today.toISOString().substring(0, 10)
        };
    }


    componentWillUnmount() {
        this.setState({
            api_id: "",
            name: "",
            possible_units: [],
            amount: "",
            chosen_units: "",
            month: "",
            day: "",
            year: ""
        });
    }
    
    onChosenCallback = value => {
        // Gut the result, we only need
        console.log(value)
        this.setState({
            api_id: value.id,
            name: value.name,
            possible_units: value.possibleUnits,
            chosen_units: value.possibleUnits[0]
        })
    };

    apiCallback(value, cb) {
            console.log("Api CB is execute")
            axios
                .get("api/food/ingredientAuto", {
                    params: {value: value}
                })
                .then(res => {
                    cb(res.data.suggestions);
                })
                .catch(err => {
                    console.log(err);
                    cb([]);
                });       
    }

    onSubmit = e => {
        e.preventDefault();
        /*
        const finalDate = new Date(
            this.state.year,
            this.state.month - 1,
            this.state.day); */
        const finalDate = new Date(
            this.state.expr_date
        )

        console.log(`${finalDate} is a ${typeof(finalDate)}`)

        const newItem = {
            user_id: localStorage.getItem('user_id'),
            api_id: this.state.api_id,
            name: this.state.name,
            amount: this.state.amount,
            units: this.state.chosen_units,
            expr_date: finalDate
        }
        // send item to db
        axios.post('api/items/items', newItem)
        .then(res =>{ 
            this.props.updateCallback();
            this.onHide()
        })
        .catch(err => {
            console.log(err)
            // Make some visible declaration that something went wrong
        })
        this.setState({
            api_id: "",
            name: "",
            possible_units: [],
            amount: "",
            chosen_units: "",
            month: "",
            day: "",
            year: ""
        });

    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onHide = e => {
        this.props.onHide()
    };


    render() {
        let units = undefined;
        if (this.state.possible_units.length != 0) {
            units = this.state.possible_units.map((value, ii) => {
                return(<Unit name={value} key={ii}/>);
            })
        }

        return(
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add an Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form className="add-item-form" onSubmit={this.onSubmit}>
                        <Container>
                            <Row>
                                <AutosuggestComponent 
                                className="form-control rounded-pill form-control-lg" 
                                placeholderText={"Start typing your item..."}
                                apiCall={this.apiCallback}
                                onChosenCallback={this.onChosenCallback}
                                />
                            </Row>
                            <Row>
                                <input type="text" 
                                    id="amount"
                                    name="amount"
                                    placeholder="Amount"
                                    onChange={this.onChange}
                                    pattern="[0-9]*"
                                    required>
                                </input>
                                <select value={this.state.chosen_units} 
                                    placeholder="Units"
                                    id="chosen_units"
                                    name="units"
                                    onChange={this.onChange}>
                                    {units}
                                </select>   
                            </Row>
                            <Row>
                                <input type="date"
                                    id="expr_date"
                                    name="expr_date"
                                    value={this.state.expr_date}
                                    onChange={this.onChange}>
                                </input>
                            </Row>
                        </Container>                      
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" onClick={this.onHide}>
                        Close
                    </button>
                    <button variant="primary" onClick={ (e) => this.onSubmit(e) }>
                        Finish
                    </button>
                </Modal.Footer>
        </Modal>
        );
    }
}

export default AddItemPopup;