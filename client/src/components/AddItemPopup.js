import React, { Component , Checkbox} from 'react';

let OPTIONS = ["Dairy", "Peanut", "Pork", "Beef", "Wheat", "Soy"]


class AddItemPopup extends Component {
    constructor(props) {
        super(props); 
        this.state = { 
            name: '', // Maybe validation here
            amount: '', // This can be in text, but should be validated
            units: 'kg', 
            checkboxes: OPTIONS.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
                {}
            ),
            types: '', 
            error: false,
            errmsg: ''
        };
    }

    handleCheckboxChange = changeEvent => {
        const { name } = changeEvent.target;

        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [name]: !prevState.checkboxes[name]
            }
        }))
    }
    
    createCheckbox = option => (
        <Checkbox
            label={option}
            isSelected={this.state.checkboxes[option]}
            onCheckboxChange={this.handleCheckboxChange}
            key={option}
            />
    );

    createCheckboxes = () => OPTIONS.map(this.createCheckbox);

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        
        Object.keys(this.state.checkboxes)
            .filter(checkbox => this.state.checkboxes[checkbox])
            .forEach(checkbox => {
                console.log(checkbox, "is selected.");
            });
    };
    /**  
     * Fields
     * Item Name: The plain name of the item. Rather than "Barilla (Spaghetti)", just put Spaghetti.
     * Amount: The numerical amount of the item being inserted.
     * Units: The units of measurement given for the item. Ex, 16.2 Oz. Putting in the alternate measurement is okay.
     * Expiration Date: When it expires if applicable. OR Best Buy Date.
     * Type: A checklist (check boxes) of item categories.
    */
    render() {

        return(
            <div>
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
                    {this.createCheckboxes()}





                </form>
            </div>
        );
    }
}

export default AddItemPopup;