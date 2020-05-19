import React, {Component} from 'react';
import {Container, Row, Col, ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

import HandleSignOutModal from '../components/modal-component';
import "../css/sidebar.css";

class SideBar extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        return(
        <Container>
            <Row className="border border-primary"> {/* Logo */}
                <Link to="/" id="logo">Perfect Pantry</Link>
            </Row>
            <Row>{/* Username, Logout */}
                <Col>Username</Col>
                <Col><HandleSignOutModal /></Col>
            </Row>
            <Row>
                <ListGroup>
                    <ListGroup.Item> <Link to="/shopping-lists">Shopping Lists</Link> </ListGroup.Item>
                    <ListGroup.Item> <Link to="/dashboard">Pantry</Link> </ListGroup.Item>
                    <ListGroup.Item> <Link to="/recipe-search">Search Recipes</Link> </ListGroup.Item>
                    <ListGroup.Item> <Link to="/pantry-suggest">Recipe Suggestions</Link> </ListGroup.Item>
                    <ListGroup.Item> <Link to="/help">Get Help!</Link> </ListGroup.Item>
                </ListGroup>
            </Row>
        </Container>    
            
            
    )}
}

export default SideBar;