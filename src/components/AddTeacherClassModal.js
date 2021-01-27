import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import apiFacade from "../api/apiFacade";

export default function AddTeacherClassModal({
  teacherName,
  teacherEmail,
  classEntity,
  teacherId,
}) {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const init = {
    id: teacherId,
    classEntity: classEntity,
  };
  const [teacherWithClass, setTeacherWithClass] = useState(init);

  const updateTeacher = (evt) => {
    evt.preventDefault();
    apiFacade.updateTeacher(teacherWithClass);
    handleClose();
  };
  const onChange = (evt) => {
    setTeacherWithClass({
      ...teacherWithClass,
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
          <Modal.Title>{teacherWithClass.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onChange={onChange}>
              <p>Add a new class for {teacherWithClass.name}</p>
              <br />
              <input className="mb-2" placeholder="Semester" id="classEntity" />
              <br />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateTeacher}>
            Add Teacher to Class
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
