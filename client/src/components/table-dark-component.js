import React, {Component} from 'react';
//import {Button} from "react-bootstrap";
import AddItemPopup from './AddItemPopup';
import axios from 'axios'; 


function Record({number, name, amount, units, expr_date}) {
    // Set color of expiration date color before returning 

    const e_date = new Date(expr_date)
    const displayDate = e_date.toDateString().slice(4)
    const rightNow = new Date();

    let cn = "";
    if(e_date > rightNow) {
        cn = "text-white bg-success";
        //console.log("ITS OKAY");
    }
    //else if(some concept for being close to expiration) color is something else; Yellow?
    else if(e_date <= rightNow) {
        cn = "text-white bg-danger";
        //console.log("EXPIRED");
    } 

    
    return(
        <tr>
            <th>{number}</th>
            <td>{name}</td>
            <td>{amount}</td>
            <td>{units}</td>
            <td className={cn}>{displayDate}</td>
        </tr>
    );
}

class TableDark extends Component {
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

    render() {

        let it = undefined;
        if (this.state.ingredients.length != 0) {
            it = this.state.ingredients.map((record, ii) => {
                return(<Record number={record.number}
                                name={record.name}
                                amount={record.amount}
                                units={record.units}
                                expr_date={record.expr_date}
                                key={ii}/>);
            })
        } else it = (<tr><td>No items recorded yet.</td></tr>)
        
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
                                    <th>#</th>{/* 03/06/20: Unsure if this is necessary to display. */ }
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Units</th>
                                    <th>Expiration Date</th>{/** 03/06/20: Could be co-opted into the text color of the date. */}
                                </tr>
 
                            </thead>
                             
                            <tbody>
                                {it}
                            
                            </tbody>
                        </table>
 
                    </form>
                    <button variant="primary" className="mx-auto" onClick={this.handleShow}>Add Item</button>
                    <AddItemPopup updateCallback={this.updateCallback} 
                        show={this.state.show} 
                        onHide={this.handleShow}/>


                </div>

            </div>
       );
    }
}

export default TableDark; 