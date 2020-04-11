import React from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function LogOutModal(props) {
    return (
        <div>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="text-dark">
                    Do You Want to Sign Out
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="text-dark">Are you sure? </h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-success" onClick={props.onHide}>Stay Here</Button>
                    <Button className="btn-danger" onClick={logout}>Confirm Sign Out</Button>
                </Modal.Footer>
            </Modal>
        </div>
      
    );
  }


  function logout() {
    localStorage.clear();               // Clear the Authentication Token and Cookies
    window.location.href = '/login';
}

  function HandleSignOutModal() {
        const [modalshow, setModalShow] = React.useState(false);

        return (
            <div>
                <ButtonToolbar>
                    <Button className="btn-danger" variant="primary" onClick={() => setModalShow(true)}>
                    Sign Out
                    </Button>
            
                    <LogOutModal
                    show={modalshow}
                    onHide={() => setModalShow(false)}
                    />
                </ButtonToolbar>
            </div>
        );  
  }


  export default HandleSignOutModal;