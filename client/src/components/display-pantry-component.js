import React, {Component} from 'react';
import {Button, Container, Row, Col, Table, Dropdown} from "react-bootstrap";
import AddItemPopup from './AddItemPopup';
import axios from 'axios'; 

/*
deleteItem = (item_id) => {
    axios.delete('api/items/items', {
        params: {
            user_id: localStorage.getItem('user_id'),
            item_id: item_id
        },
        headers: {"authorization" : "bearer " + localStorage.getItem("token")}
    })
    .then(res => {

    })
    .catch(err => {

    });
} */

function Record({number, name, amount, units, expr_date, deleteItem, item_id}) {
    // Set color of expiration date color before returning 

    const e_date = new Date(expr_date)
    const displayDate = e_date.toDateString().slice(4)
    const rightNow = new Date();

    let cn = "";
    if(e_date > rightNow) {
        cn = "text-white bg-success";
    }
    //else if(some concept for being close to expiration) color is something else; Yellow?
    else if(e_date <= rightNow) {
        cn = "text-white bg-danger";
    } 

    
    return(
        <tr>
            <td>{number}</td>
            <td>{name}</td>
            <td>{amount}</td>
            <td>{units}</td>
            <td className={cn}>{displayDate}</td>
            <td> 
                <Dropdown> 
                <Dropdown.Toggle variant="secondary"></Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={ e => deleteItem(item_id)}>Delete</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    );
}

class PantryTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            ingredients: [],
            show: false
        }
    }

    getUserIngredients() {
        axios.get('api/items/items', {
            params: {user_id: localStorage.getItem('user_id')},
            headers: {"authorization" : "bearer " + localStorage.getItem("token")}
        })
        .then(res => {
            console.log(res.data)
            this.setState({ingredients: res.data.items});
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getUserIngredients();
    }

    // Call DB API to get new list of user's ingredients
    updateList = () => {
        this.getUserIngredients();
    }

    updateCallback = () => {
        this.getUserIngredients();
        
    }

    onSubmit = e => {
        e.preventDefault();
        this.handleShow();
    }


    handleShow = () => {
        this.setState({  
            show: !this.state.show
       });  
    };

    deleteItem = (item_id) => {
        console.log(item_id)
        axios.delete('api/items/item', {
            params: {
                user_id: localStorage.getItem('user_id'),
                item_id: item_id
            },
            headers: {"authorization" : "bearer " + localStorage.getItem("token")}
        })
        .then(res => { this.getUserIngredients(); })
        .catch(err => { console.log(err); });
    }
    /*
    Record({number, name, amount, units, expr_date, item_id}) {
        // Set color of expiration date color before returning 
    
        const e_date = new Date(expr_date)
        const displayDate = e_date.toDateString().slice(4)
        const rightNow = new Date();
    
        let cn = "";
        if(e_date > rightNow) {
            cn = "text-white bg-succ    ess";
        }
        //else if(some concept for being close to expiration) color is something else; Yellow?
        else if(e_date <= rightNow) {
            cn = "text-white bg-danger";
        } 
    
        
        return(
            <tr>
                <td>{number}</td>
                <td>{name}</td>
                <td>{amount}</td>
                <td>{units}</td>
                <td className={cn}>{displayDate}</td>
                <td> 
                    <Dropdown> 
                    <Dropdown.Toggle variant="secondary"></Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={this.deleteItem(item_id)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        );
    } */

    render() {

        let it = undefined;
        if (this.state.ingredients.length != 0) {
            it = this.state.ingredients.map((record, ii) => {
                return(<Record number={record.number}
                                name={record.name}
                                amount={record.amount}
                                units={record.units}
                                expr_date={record.expr_date}
                                deleteItem={this.deleteItem}
                                item_id={record._id}
                                key={ii}/>);
            })
        } else it = (<tr><td>No items recorded yet.</td></tr>)
        
        return (
            <div>
                <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                    <div className="col-12 mb-4">
                        <h3 className="text-center mb-3">Current Inventory</h3>
                    </div>
 
                    <form id="Ingredients">     {/* <------  This id is very VERY IMPORTANT!!!!!! */}
                         
                        <Table striped bordered className="table table-dark table-hover table-center text-center">
                            <thead>
 
                                <tr className="text-muted">
                                    <th>#</th>{/* 03/06/20: Unsure if this is necessary to display. */ }
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Units</th>
                                    <th>Expiration Date</th>
                                    <th>Options</th>
                                </tr>
 
                            </thead>         
                            <tbody>
                                {it}
                            </tbody>
                        </Table>
 
                    </form>
                    <Button variant="primary" className="mx-auto" onClick={this.handleShow}>Add Item</Button>
                    <AddItemPopup updateCallback={this.updateCallback} 
                        show={this.state.show} 
                        onHide={this.handleShow}/>
                </div>
            </div>
       );
    }
}

export default PantryTable; 