import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import AddItemPopup from './AddItemPopup';
import axios from 'axios'; 

const items = [{"number":"1", "name":"Carrots", "price":"5.99", "exp_date":"10/23/2019", "status":"Good"},
{"number":"2", "name":"Olives", "price":"7.99", "exp_date":"12/17/2019", "status":"Good"},
{"number":"3", "name":"Salmon", "price":"9.99", "exp_date":"12/07/2019", "status":"Expired"},
{"number":"4", "name":"Eggs", "price":"3.50", "exp_date":"10/05/2019", "status":"Good"},
{"number":"5", "name":"Milk", "price":"3.75", "exp_date":"12/05/2019", "status":"Close"} ]
/*const items = [["1", "Carrots", "5.99", "10/23/2019", "Good"],
            ["2", "Olives", "7.99", "12/17/2019", "Good"],
            ["3", "Salmon", "9.99", "12/07/2019", "Expired"],
            ["4", "Eggs", "3.50", "10/05/2019", "Good"],
            ["5", "Milk", "3.75", "12/05/2019", "Close"]]; */

function Record({number, name, price, exp_date, status}) {
    /* Set color of expiration date color before returning */
    let cn = "";
    if(status == 'Good') { cn = "badge badge-success w-75"; }
    else if(status == 'Close') { cn = "badge badge-warning w-75"; }
    else if(status == 'Expired') { cn = "badge badge-danger w-75"; }
    return(
        <tr>
            <th>{number}</th>
            <td>{name}</td>
            <td>${price}</td>
            <td>{exp_date}</td>
            <td><span className={cn}>{status}</span></td>
        </tr>
    );
}
class TableDark extends Component {
    constructor(props){
        super(props);
        this.state = {
            ingredients: [],
            show: false,
            setShow: false,
            name: "",
            amount: "",
            units: "kg",
            timeToUpdate: false
        }
    }

    componentDidMount() {

        axios.get('api/items/items', {
            params: {user_id: localStorage.getItem('user_id')}
        })
        .then(res => {
            console.log(res)
            //this.setState({ingredients: })
        })
        .catch(err => {
            console.log(err)
        })
        //this.setState({ ingredients: })
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state)
    }

    onSubmit = e => {
        e.preventDefault();

        /*const newItem = {
            name: this.state.name,
            amount: this.state.amount,
            units: this.state.units
        }; */
        const newItem = {
            number: "X",
            name: this.state.name,
            price: "4.99",
            exp_date: "04/16/2020",
            status: "Good" 
        }
        items.push(newItem)

        this.setState ({
            name: ""
        });
        this.handleShow();
    }

    // Call DB API to get new list of user's ingredients
    updateList = () => {
        


        this.setState ({
            timeToUpdate: false
        })
    }

    onType = e => {
        // For auto completion
    }

    handleShow = () => {
        this.setState({  
            showPopup: !this.state.showPopup,
            show: !this.state.show
       });  
    };
/*
    record(id, name, quantity, units, exp_date) {
        // Set color of expiration date color before returning 

        return(
            <tr>
                <th>{id}</th>
                <td>{name}</td>
                <td>{quantity} {units}</td>
                <td color={expr_color}>{exp_date}</td>
            </tr>
        );
    }
*/
/*
    record(num, name, price, exp_date, status) {
        // Set color of expiration date color before returning 
        let cn = "";
        if(status == 'Good') { cn = "badge badge-success w-75"; }
        else if(status == 'Close') { cn = "badge badge-warning w-75"; }
        else if(status == 'Expired') { cn = "badge badge-danger w-75"; }
        return(
            <tr>
                <th>{num}</th>
                <td>{name}</td>
                <td>${price}</td>
                <td>{exp_date}</td>
                <td><span className={cn}>{status}</span></td>
            </tr>
        );
    } */

    render() {
        let it = undefined;
        if (items != null) {
            it = items.map((record, ii) => {
                console.log(record);
                return(<Record number={record.number}
                                name={record.name}
                                price={record.price}
                                exp_date={record.exp_date}
                                status={record.status}
                                key={ii}/>);
            })
        } else it = "No items recorded yet."
        return (
            <div>
                 <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                     <div className="col-12 mb-4">
                         <h3 className="text-white text-center mb-3">Current Inventory</h3>
                     </div>
 
                     <form id="Ingredients">     {/* <------  This id is very VERY IMPORTANT!!!!!! */}
                         
                         <table className="table table-dark table-hover table-center text-center">
                             <thead>
 
                                 <tr className="text-muted">
                                     <th>#</th> {/* 03/06/20: Unsure if this is necessary to display. */ }
                                     <th>Ingredients</th> 
                                     <th>Price</th> {/* 03/06/20: Very unsure if this should even be here rn. */}
                                     <th>Date</th> {/* 03/06/20: The expiration date */}
                                     <th>Status</th> {/** 03/06/20: Could be co-opted into the text color of the date. */}
                                 </tr>
 
                             </thead>
                             
                             <tbody>
                                {it}
                            
                             </tbody>
                         </table>
 
                     </form>
                     <button variant="primary" className="mx-auto" onClick={this.handleShow}>Add Item</button>

                    <Modal show={this.state.show} onHide={this.handleShow}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add an Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <form className="add-item-form" onSubmit="this.handleFormSubmit">
                            { /* Item Name, Amount, Units, Expiration Date, Type  */}
                                <div className="form-group">
                                    <input type="text" 
                                    id="name"
                                    className="form-control rounded-pill form-control-lg" 
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    placeholder="Item Name"/>
                                </div>

                                {/* Amount */}

                                {/* Units */}
                                <select value={this.state.units}>
                                    <option value="kg">Kilograms(kg)</option>
                                    <option value="lb">Pounds(lb)</option>
                                    <option value="oz">Ounces(oz)</option>
                                    <option value="g">Gram(g)</option>
                                    <option value="qt">Quart(qt)</option>
                                    <option value="gal">Gallon(GAL)</option>
                                    <option value="l">Liter(L)</option>
                                    <option value="fl-oz">Fluid Ounce(FL OZ)</option>
                                </select>

                                {/* Types */}
                                {/*this.createCheckboxes()*/}





                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button variant="secondary" onClick={this.handleShow}>
                                Close
                            </button>
                            <button variant="primary" onClick={ (e) => this.onSubmit(e) }>
                                Finish
                            </button>
                        </Modal.Footer>
                    </Modal>
                 </div>

            </div>
       );
    }
}

export default TableDark; 