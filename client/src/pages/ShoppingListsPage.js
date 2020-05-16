import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import SideBar from '../components/sidebar-component';
import TopBar from '../components/topbar-component';
import ListDisplay from '../components/display-lists-component';

import 'react-web-tabs/dist/react-web-tabs.css';

import axios from 'axios';

class ShoppingListsPage extends Component {
    constructor(props) {
        super(props);
        console.log("Yeet");
    }

    render() {
        return(
            <div>
                <SideBar/>              {/* This is the side bar navbar component */}   
                <TopBar/>               {/* This is the top bar navbar component it also contains the modal-component*/}    
                <div className="mt-5">  
                    <ListDisplay />
                </div>
            </div>
            );
    }
};

export default withRouter(ShoppingListsPage);