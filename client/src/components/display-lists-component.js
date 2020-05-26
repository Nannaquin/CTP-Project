import React, { Component } from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Table, Dropdown } from 'react-bootstrap';
import axios from 'axios';

import '../css/ListDisplay.css';
import ListControlPanel from './list-control-panel-component';


function ItemRow({name, amount, units}) {
  return(
    <tr>
      <td>{name}</td>
      <td>{amount}</td>
      <td>{units}</td>
      <td> 
        <Dropdown> 
          <Dropdown.Toggle variant="secondary"></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Edit</Dropdown.Item>
            <Dropdown.Item>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  )
}
 


function ListPanel({items, name, dateStarted, pos, listId, deleteCallback, refreshCallback}) {
  const tId = pos;
  let rows = undefined;
  if(items.length !== 0) {
    rows = items.map((item, ii) => {
      return(<ItemRow name={item.name}
              amount={item.amount}
              units={item.units}
              key={ii} />)
    })
  } else rows = (<tr><td>Add an item to get started!</td></tr>);

  return(
    <TabPanel tabId={tId.toString()}>
      <ListControlPanel listId={listId} 
          name={name} 
          dateStarted={dateStarted} 
          deleteCallback={deleteCallback}
          refreshCallback={refreshCallback}/>
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

  componentDidMount() {
    this.props.apiCall();
  }
  componentDidUpdate(prevProps) {
    if (this.props.lists !==  prevProps.lists) {
      this.setState({lists: this.props.lists});
    }
  }

  onCreateClick = e => {
    const newList = {
      name:"Text",
      user_id: localStorage.getItem('user_id')
    };
    axios.post('api/lists/list', newList)
    .then(res => {
      console.log("Creation Click");
      this.props.apiCall();
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {

    let tabs = undefined;
    let tabPanels = undefined;
    if (this.state.lists.length !== 0) {
      tabs = this.state.lists.map((list, ii) => {
        return(<Tab tabFor={ii.toString()} key={ii}> {ii} </Tab>);
      });
      tabPanels = this.state.lists.map((list, ii) => {
        return(<ListPanel items={list.items}
                name={list.name}
                dateStarted={list.date_started}
                pos={ii}
                listId={list._id}
                refreshCallback={this.props.apiCall}
                key={ii}/>);
      });
    } else tabPanels = <TabPanel tabId={"empty"}>Start a Shopping List!</TabPanel>
    
    return (
      <div>
        <div className="col-12 mb-4">
          <h3 className="text-center mb-3">Shopping Lists</h3>
        </div>
        <Tabs defaultTab="0" className="table-center text-center" vertical>
          <TabList>
            <Tab tabFor="add-list" onClick={this.onCreateClick}> + </Tab>
            {tabs}
          </TabList>
          {tabPanels}
        </Tabs>
      </div>
    );
  }
}

//render(<MyVerticalTabs/>, document.getElementById('app'));

export default ListDisplay; 