import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import axios from 'axios';

import AddListItemPopup from './AddListItemPopup';
import '../css/ListDisplay.css';


class ListControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listId: this.props.listId,
      name: this.props.name,
      dateStarted: this.props.dateStarted,
      items: [], // for items
      show: false // for add item
    }
  };



  updateCallback = () => {
      this.props.refreshCallback();
  }
  
  handleShow = () => {
    console.log("HANDLE SHOW")
      this.setState({
          show: !this.state.show
      })
  }

  deleteList() {
    console.log("Delete List Call")
    axios.delete('api/lists/list', {
        params: {user_id: localStorage.getItem('user_id'),
                list_id: this.props.listId},
        headers: {"authorization" : "bearer " + localStorage.getItem("token")}
      })
      .then(res => {
        console.log("Post List Delete");
        this.props.refreshCallback();
      })
      .catch(err => {
        console.log(err);
      })
  };

  onDeleteClick = e => {
      this.deleteList();
  }

  onCloseOutClick = e => {
    // just sending the ids
    const ids = {
      list_id: this.state.list_id,
      user_id: localStorage.getItem('user_id')
    }
    axios.post('api/items/from-list', ids)
    .then(res => {
      this.refreshCallback();
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    //console.log(this.state)
    const displayDate = new Date(this.state.dateStarted).toDateString().slice(4)
    return(
      <Container>
        <Row>
          <Col>Name: {this.state.name}</Col>
          <Col>Date Started: {displayDate}</Col>
        </Row>
        <Row>
          <Col><Button variant="primary" onClick={this.handleShow}>Add Item</Button></Col>
          <Col><Button variant="secondary">Send</Button></Col>
          <Col><Button variant="secondary" onClick={this.onCloseOutClick}>Close Out</Button></Col>
          <Col><Button variant="secondary" onClick={this.onDeleteClick}>Delete</Button></Col>
          <AddListItemPopup updateCallback={this.updateCallback} 
                        show={this.state.show} 
                        onHide={this.handleShow}
                        listId={this.state.listId}/>
        </Row>
      </Container>
    )
  };
}

export default ListControlPanel; 