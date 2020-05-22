import React, { 
    Component, 
    //Link,
} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import SideBar from '../components/new-sidebar-component';
import TableDark from '../components/table-dark-component';
import Loading from '../components/Loading';




export default class DashboardPage extends Component {
    constructor(props) {
        super(props);
        console.log(props)


        this.state = { 
            Loggedin: true, 
            AuthToken: "Authentication Token",
            username: "",
            id: "",
        };
    }

    // Get Token from database store it here, if the user is logged in for too long, 
    // Reset the Authentication Token on the back end 
    // If the old token doesn't match with the new one (which it shouldn't) 
    // Then redirect to sign in page

    componentDidMount() {
        /* axios.get('api/items/items', {
            "headers" : {"authorization" : "bearer " + localStorage.getItem("token")}
        })
        .then(response => {
        this.setState({ items: response.data.items })
        })
        .catch((error) => {
        console.log(error);
        }) */
    }

    onSubmit(e) {
        e.preventDefault();
    }


    render() {
        
        if(this.state.loading) return <Loading />;
        if(this.state.Loggedin === false) 
            {
                console.log("NOT LOGGED IN");
                return(<Redirect to="/login" />); // Safety Pre-Caution against hackers! ;)
            }

        return (
            <Container name="root-container" className="mt-3">
                <Row name="root-row">
                    <Col name="sidebar-col" xs={2}><SideBar/></Col>
                    <Col name="page-col"><TableDark /></Col>
                </Row>
            </Container>
        );
    }
}


