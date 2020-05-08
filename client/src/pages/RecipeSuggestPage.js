import React, {Component} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import SideBar from '../components/sidebar-component';
import TopBar from '../components/topbar-component';

// The recipe search page for the new API
class RecipeSuggestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: ""
        }
    };

    render() {
        return(
        <div>
            <SideBar/>
            <TopBar/>
            <div className="mt-5">  
                <p>Demo Text</p>
            </div>
        </div>
            );
    };
    
}

export default withRouter(RecipeSuggestPage);