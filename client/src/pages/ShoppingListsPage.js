import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import SideBar from '../components/new-sidebar-component';
import ListDisplay from '../components/display-lists-component';

import 'react-web-tabs/dist/react-web-tabs.css';
import "../css/ui.css";


import axios from 'axios';

class ShoppingListsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: []
        }
    }

    apiCall = () => {
        console.log("Updating Lists")
        axios
        .get('api/lists/lists', {
            params: {user_id: localStorage.getItem('user_id')},
            headers: {"authorization" : "bearer " + localStorage.getItem("token")}
          })
          .then(res => {
            console.log(res.data);
            this.setState({
                lists: res.data.lists
            });
      
          })
          .catch(err => {
            console.log(err);
          });
    }

    render() {
        return(
            <Container fluid name="root-container">
                <Row name="root-row" className="page">
                    <SideBar/>
                    <Col name="page-col" className="mt-3">
                        <ListDisplay lists={this.state.lists} apiCall={this.apiCall} />
                    </Col>
                </Row>
            </Container>
            );
    }
};

export default withRouter(ShoppingListsPage);