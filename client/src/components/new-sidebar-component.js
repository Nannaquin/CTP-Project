import React, {Component} from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

import HandleSignOutModal from '../components/modal-component';
import "../css/sidebar.css";
import Logo from '../images/logo.png';

class SideBar extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return(
            <Col name="sidebar-col"  className="bg-dark sidebar-col" xs={3}>
                <Container>
                    <Row> {/* Logo */}
                        <Link to="/" id="logo-link">
                            <img id="logo-img" 
                                src={Logo} 
                                alt="Perfect Pantry Logo" />
                        </Link>
                    </Row>  
                    <Row>{/* Username, Logout */}
                        <Col>Username</Col>
                        <Col><HandleSignOutModal /></Col>
                    </Row>
                    <Row>
                        <Table striped bordered className="table-dark">
                            <tbody>
                                <tr><td> <Link to="/shopping-lists">Shopping Lists</Link> </td></tr>
                                <tr><td> <Link to="/dashboard">Pantry</Link> </td></tr>
                                <tr><td> <Link to="/recipe-search">Search Recipes</Link> </td></tr>
                                <tr><td> <Link to="/pantry-suggest">Recipe Suggestions</Link> </td></tr>
                                <tr><td> <Link to="/help">Get Help!</Link> </td></tr>
                            </tbody>
                        </Table>

                    </Row>
                </Container>    
            </Col>
            
            
    )}
}

export default SideBar;