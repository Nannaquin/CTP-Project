import React, { Component } from 'react';
import { Row, Col, Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';

import '../css/ListDisplay.css';


class ListControlPanel extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      listId: this.props.listId,
      name: this.props.name,
      dateStarted: this.props.dateStarted
    }
  };
  
  deleteList() {
    console.log(this)
    axios.delete('api/lists/list', {
        params: {user_id: localStorage.getItem('user_id'),
                list_id: this.props.listId},
        headers: {"authorization" : "bearer " + localStorage.getItem("token")}
      })
      .then(res => {
        console.log("Post List Delete");
        this.props.deleteCallback();
      })
      .catch(err => {
        console.log(err);
      })
  };

  render() {
    console.log(this.state)
    const displayDate = new Date(this.state.dateStarted).toDateString().slice(4)
    return(
      <Container>
        <Row>
          <Col>Name: {this.state.name}</Col>
          <Col>Date Started: {displayDate}</Col>
        </Row>
        <Row>
          <Col><Button variant="primary">Add Item</Button></Col>
          <Col><Button variant="secondary">Send</Button></Col>
          <Col><Button variant="secondary">Close Out</Button></Col>
          <Col><Button variant="secondary" onClick={this.deleteList}>Delete</Button></Col>
        </Row>
      </Container>
    )
  };
}

export default ListControlPanel; 