import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Button, Container, Col, Row} from 'react-bootstrap';
import Loading from '../components/Loading';
import '../css/saved.css';




class Landing extends Component {
      

  

  render() {
      

      return (
          <Container>
              <Row>
                  <Col className="center-align">
                    <Button variant="primary" size="lg" href="/signup">Signup</Button>
                    <Button variant="secondary" size="lg" href="/login">Login</Button>
                  </Col>
              </Row>
          </Container>
      );
  }
}


export default Landing;