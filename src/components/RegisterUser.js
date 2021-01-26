import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import facade from "../api/userFacade";

function CreateModal() {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const init = { username: "", password: "" };
  const [newCredentials, setNewCredentials] = useState(init);

  const createUser = (evt) => {
    evt.preventDefault();
    facade.addUser(newCredentials.username, newCredentials.password);
    handleClose();
  };
  const onChange = (evt) => {
    setNewCredentials({
      ...newCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <>
      <div>
        <p className="mt-2">Not a member yet? Register here:</p>
        <Button variant="primary" onClick={handleShow}>
          Register
        </Button>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register your account here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onChange={onChange}>
              <input className="mb-2" placeholder="User Name" id="username" />
              <br />
              <input className="mb-2" placeholder="Password" id="password" />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createUser}>
            Save Changes and register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;
