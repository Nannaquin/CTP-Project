import React, { 
    Component, 
} from 'react';

import {Container, Row, Col} from 'react-bootstrap';

import SideBar from "../components/new-sidebar-component";

class UITest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "top"
        }
    }

    render() {
        return(
                <Container name="root-container">
                    <Row name="root-row">
                        <Col name="sidebar-col" xs={3}><SideBar/></Col>
                        <Col name="page-col">Text</Col>
                    </Row>
                </Container>
        )
    }
}


export default UITest;

