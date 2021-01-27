import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import apiFacade from "../api/apiFacade";

function AddClassModal({ selectedCourse }) {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const init = {
    semester: 0,
    numberOfStudents: 0,
    courseName: selectedCourse.courseName,
  };
  const [classEntity, setClassEntity] = useState(init);

  const addClassEntity = (evt) => {
    evt.preventDefault();
    apiFacade.addClassEntity(classEntity);
    handleClose();
  };
  const onChange = (evt) => {
    setClassEntity({
      ...classEntity,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <>
      <div>
        <Button variant="primary" onClick={handleShow}>
          Add
        </Button>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{classEntity.courseName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onChange={onChange}>
              <p>Add a new class for {classEntity.courseName}</p>
              <br />
              <input className="mb-2" placeholder="Semester" id="semester" />
              <br />
              <input
                className="mb-2"
                placeholder="Number of Students"
                id="numberOfStudents"
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addClassEntity}>
            Add semester to Course
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddClassModal;
