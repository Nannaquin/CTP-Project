import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import AddItemPopup from './AddItemPopup';


class TableDark extends Component {
    constructor(props){
        super(props);
        this.state = {
            ingredients: [],
            show: false,
            setShow: false,
            name: "",
            amount: "",
            units: "kg"
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state)
    }

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            name: this.state.name,
            amount: this.state.amount,
            units: this.state.units
        };
    }

    handleShow = () => {
        this.setState({  
            showPopup: !this.state.showPopup,
            show: !this.state.show
       });  
    };

    render() {
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
                                 
                                 <tr>
                                     <th>1</th>
                                     <td>Carrots</td>
                                     <td>$5.99</td>
                                     <td>10/23/2019</td>
                                     <td><span className="badge badge-success w-75">Good</span></td>
                                 </tr>
                                 
                                 <tr>
                                     <th>2</th>
                                     <td>Olives</td>
                                     <td>$7.99</td>
                                     <td>12/17/2019</td>
                                     <td><span className="badge badge-success w-75">Good</span></td>
                                 </tr>
 
                                 <tr>
                                     <th>3</th>
                                     <td>Salmon</td>
                                     <td>$9.99</td>
                                     <td>12/07/2019</td>
                                     <td><span className="badge badge-danger w-75">Expired</span></td>
                                 </tr>
 
                                 <tr>
                                     <th>4</th>
                                     <td>Eggs</td>
                                     <td>$3.50</td>
                                     <td>10/05/2019</td>
                                     <td><span className="badge badge-success w-75">Good</span></td>
                                 </tr>
 
                                 <tr>
                                     <th>5</th>
                                     <td>Milk</td>
                                     <td>$3.75</td>
                                     <td>12/05/2019</td>
                                     <td><span className="badge badge-warning w-75">close</span></td>
                                 </tr>
 
                                 <tr>
                                     <th>6</th>
                                     <td>Mozarella Cheese</td>
                                     <td>$14.99</td>
                                     <td>11/05/2019</td>
                                     <td><span className="badge badge-warning w-75">close</span></td>
                                 </tr>
 
                                 <tr>
                                     <th>7</th>
                                     <td>Olive Oil</td>
                                     <td>$35</td>
                                     <td>12/05/2019</td>
                                     <td><span className="badge badge-success w-75">Good</span></td>
                                 </tr>
 
                                 <tr>
                                     <th>8</th>
                                     <td>Cereal</td>
                                     <td>$12</td>
                                     <td>12/09/2019</td>
                                     <td><span className="badge badge-success w-75">Good</span></td>
                                 </tr>
 
                             </tbody>
                         </table>
 
                     </form>
                     <button variant="primary" onClick={this.handleShow}>Add Item</button>

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
                            <button variant="primary" onClick={this.handleShow}>
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