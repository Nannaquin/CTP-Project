import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import "./autosuggest.css";

// Exterior list of items may not be necessary.
//let items = [];
   
  

  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );
  
  class AutosuggestComponent extends Component {
    constructor(props) {
      super(props);
  
      // Autosuggest is a controlled component.
      // This means that you need to provide an input value
      // and an onChange handler that updates this value (see below).
      // Suggestions also need to be provided to the Autosuggest,
      // and they are initially empty because the Autosuggest is closed.
      this.state = {
        value: '',
        suggestions: [],
        placeholder_text: this.props.placeholderText,
      };
    }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
    getSuggestionValue = suggestion => {
        console.log(suggestion)
        this.props.onChosenCallback(suggestion)
        return suggestion.name;
    };
  
    onChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        });
      };

      // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    
    return inputLength < 3 ? [] : this.props.apiCall(value, (items) => {
        this.setState({suggestions: items});
    });
  };
  
    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: this.getSuggestions(value)
      });
    };
  
    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };
  
    render() {
      let { value, suggestions } = this.state;

      suggestions = !suggestions ? [] : suggestions;
      // Autosuggest will pass through all these props to the input.
      const inputProps = {
        placeholder: this.state.placeholder_text,
        value,
        onChange: this.onChange
      };
  
      // Finally, render it!
      return (
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
        />
      );
    }
  };

  export default AutosuggestComponent;