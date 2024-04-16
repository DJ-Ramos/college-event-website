import { useState } from "react";
import { CreateRSOAPI } from "../api_handler/RSO";
import { Button, Modal, Nav, Form } from "react-bootstrap";
import getCookie from "../hooks/getCookie";

const RSOProfile = (university_id) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setFormValues({
      rso_name: "",
      rso_desc: "",
      rso_student1: "",
      rso_student2: "",
      rso_student3: "",
      rso_student4: "",
    });
  };
  const handleShow = () => setShow(true);

  const [formValues, setFormValues] = useState({
    rso_name: "",
    rso_desc: "",
    rso_student1: "",
    rso_student2: "",
    rso_student3: "",
    rso_student4: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    formValues.university_id = university_id;
    formValues.admin_id = getCookie("user_id");
    console.log(formValues);
    const data = await CreateRSOAPI(formValues);

    setFormValues({
      rso_name: "",
      rso_desc: "",
      rso_student1: "",
      rso_student2: "",
      rso_student3: "",
      rso_student4: "",
    });

    handleClose();
    window.location.reload();
  };

  const handleChange = (event) => {
    event.preventDefault();
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Nav.Link onClick={handleShow}>
        <p className="h5">Add RSO</p>
      </Nav.Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create an RSO Profile</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formRSOName">
              <Form.Floating>
                <Form.Control
                  name="rso_name"
                  value={formValues.rso_name}
                  type="text"
                  placeholder="RSO Name"
                  onChange={handleChange}
                  required
                />
                <Form.Label>RSO Name</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRSODesc">
              <Form.Floating>
                <Form.Control
                  name="rso_desc"
                  value={formValues.rso_desc}
                  type="text"
                  placeholder="RSO Description"
                  onChange={handleChange}
                  required
                />
                <Form.Label>RSO Description</Form.Label>
              </Form.Floating>
            </Form.Group>
            <span className="text-center">
              <h5>Student Emails</h5>
            </span>
            <Form.Group className="mb-3" controlId="formStudent1">
              <Form.Floating>
                <Form.Control
                  name="rso_student1"
                  value={formValues.rso_student1}
                  type="email"
                  placeholder="Student #1"
                  onChange={handleChange}
                  required
                />
                <Form.Label>Student #1</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStudent2">
              <Form.Floating>
                <Form.Control
                  name="rso_student2"
                  value={formValues.rso_student2}
                  type="email"
                  placeholder="Student #2"
                  onChange={handleChange}
                  required
                />
                <Form.Label>Student #2</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStudent3">
              <Form.Floating>
                <Form.Control
                  name="rso_student3"
                  value={formValues.rso_student3}
                  type="email"
                  placeholder="Student #3"
                  onChange={handleChange}
                  required
                />
                <Form.Label>Student #3</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStudent4">
              <Form.Floating>
                <Form.Control
                  name="rso_student4"
                  value={formValues.rso_student4}
                  type="email"
                  placeholder="Student #4"
                  onChange={handleChange}
                  required
                />
                <Form.Label>Student #4</Form.Label>
              </Form.Floating>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default RSOProfile;
