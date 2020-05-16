import React, { Component } from 'react';
//import { render } from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Row, Col, Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';

import '../css/ListDisplay.css';

function ItemRow({name, amount, units}) {
  return(
    <tr>
      <td>{name}</td>
      <td>{amount}</td>
      <td>{units}</td>
    </tr>
  )
}


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

 


function ListPanel({items, name, dateStarted, pos, listId, deleteCallback}) {
  console.log(listId)
  const tId = pos;
  let rows = undefined;
  if(items.length != 0) {
    rows = items.map((item, ii) => {
      return(<ItemRow name={item.name}
              amount={item.amount}
              units={item.units}
              key={ii} />)
    })
  } else rows = (<tr><td>Add an item to get started!</td></tr>);

  return(
    <TabPanel tabId={tId.toString()}>
      <ListControlPanel listId={listId} name={name} dateStarted={dateStarted} deleteCallback={deleteCallback}/>
      <Table striped bordered>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </TabPanel>
  )
}

class ListDisplay extends Component {
  constructor(props) {
      super(props);
      this.state = {
          lists: [],
          
      }
  }

  getUserLists() {
    axios.get('api/lists/lists', {
      params: {user_id: localStorage.getItem('user_id')},
      headers: {"authorization" : "bearer " + localStorage.getItem("token")}
    })
    .then(res => {
      console.log(res.data);
      this.setState({lists: res.data.lists});

    })
    .catch(err => {
      console.log(err);
    });

  }

  componentDidMount() {
    this.getUserLists();
  }

  onCreateClick = e => {
    const newList = {
      name:"Text",
      user_id: localStorage.getItem('user_id')
    };
    axios.post('api/lists/list', newList)
    .then(res => {
      console.log(res);
      this.getUserLists();
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {

    let tabs = undefined;
    let tabPanels = undefined;
    if (this.state.lists.length != 0) {
      tabs = this.state.lists.map((list, ii) => {
        return(<Tab tabFor={ii.toString()} key={ii}> {ii} </Tab>);
      });
      tabPanels = this.state.lists.map((list, ii) => {
        return(<ListPanel items={list.items}
                name={list.name}
                dateStarted={list.date_started}
                pos={ii}
                listId={list._id}
                deleteCallback={this.getUserLists}
                key={ii}/>);
      });
    } else tabPanels = <TabPanel tabId={"empty"}>Start a Shopping List!</TabPanel>
    
    return (
      <Tabs defaultTab="0" vertical>
        <TabList>
          <Tab tabFor="add-list" onClick={this.onCreateClick}> + </Tab>
          {tabs}
        </TabList>
        {tabPanels}
      </Tabs>
    );
  }
}

//render(<MyVerticalTabs/>, document.getElementById('app'));

export default ListDisplay; 