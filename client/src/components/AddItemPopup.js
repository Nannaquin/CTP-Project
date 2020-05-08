import React, {Component} from 'react';
import {Modal} from "react-bootstrap";
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
        this.state = {
            user_id: "",
            api_id: "",
            name: "",
            possible_units: [],
            amount: "",
            chosen_units: "",
            expr_date: ""
        };
    }
    componentWillMount() {
        console.log(this.state)
    }

    componentWillUnmount() {
        this.setState({
            api_id: "",
            name: "",
            possible_units: [],
            amount: "",
            chosen_units: "",
            expr_date: ""
        });
        console.log(this.state)
    }
    
    onChosenCallback = value => {
        // Gut the result, we only need
        console.log(value)
        this.setState({
            api_id: value.id,
            name: value.name,
            possible_units: value.possibleUnits
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
        const newItem = {
            user_id: localStorage.getItem('user_id'),
            api_id: this.state.api_id,
            name: this.state.name,
            amount: this.state.amount,
            units: this.state.chosen_units,
            expr_date: new Date()//this.state.expr_date
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

    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onHide = e => {
    /*    this.setState({
            api_id: "",
            name: "",
            possible_units: [],
            amount: "",
            chosen_units: "",
            expr_date: ""
        }) */
        this.props.onHide()
    };


    render() {
        console.log(this.state)
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

                        <AutosuggestComponent 
                            className="form-control rounded-pill form-control-lg" 
                            placeholderText={"Start typing your item..."}
                            apiCall={this.apiCallback}
                            onChosenCallback={this.onChosenCallback}
                            />

                        {/* Amount */}
                        <input type="text" 
                            id={"amount"} 
                            onChange={this.onChange}
                            pattern="[0-9]*"></input>

                        {/* Units */}
                        <select value={this.state.chosen_units} 
                            id={"chosen_units"} 
                            onChange={this.onChange}>
                           
                           {units}
                        </select>

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