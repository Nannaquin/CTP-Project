import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

import HandleSignOutModal from '../components/modal-component';

class SideBar extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        return(
        <Container>
            <Row> {/* Logo */}
                <Link to="\dashboard">Perfect Pantry</Link>
            </Row>
            <Row>{/* Username, Logout */}
                <Col>Username</Col>
                <Col><HandleSignOutModal /></Col>
            </Row>
            <Row>{/* Shopping Lists */}
                <Link to="\shopping-lists">Shopping Lists</Link>
            </Row>
            <Row>{/* Pantry */}
                <Link to="\dashboard">Pantry</Link>
            </Row>
            <Row>{/* Search Recipes*/}
                <Link to="\recipe-search">Search Recipes</Link>
            </Row>
            <Row>{/* Get Suggestions */}
                <Link to="\pantry-suggest">Recipe Suggestions</Link>
            </Row>
            <Row>{/* Help */}
                <Link to="\help">Get Help!</Link>
            </Row>
        </Container>    
            
            
    )}
}

export default SideBar;