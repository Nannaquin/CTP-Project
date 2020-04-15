import React, { Component , Checkbox} from 'react';

let OPTIONS = ["Dairy", "Peanut", "Pork", "Beef", "Wheat", "Soy"]


class AddItemPopup extends Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    /**  
     * Fields
     * Item Name: The plain name of the item. Rather than "Barilla (Spaghetti)", just put Spaghetti.
     * Amount: The numerical amount of the item being inserted.
     * Units: The units of measurement given for the item. Ex, 16.2 Oz. Putting in the alternate measurement is okay.
     * Expiration Date: When it expires if applicable. OR Best Buy Date.
     * Type: A checklist (check boxes) of item categories.
    */
    render() {
        return("Shut up");
    }
}

export default AddItemPopup;