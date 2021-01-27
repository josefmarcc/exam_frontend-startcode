import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import apiFacade from "../api/apiFacade";

function EditCourseModal({ selectedCourse }) {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const init = {
    courseName: selectedCourse.courseName,
    description: selectedCourse.description,
  };
  const [courseToEdit, setCourseToEdit] = useState(init);

  const updateCourse = (evt) => {
    evt.preventDefault();
    apiFacade.updateCourse(courseToEdit);
    handleClose();
  };
  const onChange = (evt) => {
    setCourseToEdit({
      ...courseToEdit,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <>
      <div>
        <Button variant="primary" onClick={handleShow}>
          Edit
        </Button>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{courseToEdit.courseName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onChange={onChange}>
              <h4>Update {courseToEdit.courseName} Description below</h4>
              <br />
              <input
                className="mb-2"
                placeholder={courseToEdit.description}
                id="description"
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateCourse}>
            Update Course
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditCourseModal;
