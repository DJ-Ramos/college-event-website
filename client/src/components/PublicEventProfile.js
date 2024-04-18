import { useState } from "react";
import { CreatePublicEventAPI } from "../api_handler/Public";
import { Button, Modal, Nav, Form } from "react-bootstrap";

const PublicEventProfile = (university_id) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setFormValues({
        event_name: "",
        event_desc: "",
        event_location: "",
        event_date: "",
    });
  };
  const handleShow = () => setShow(true);

  const [formValues, setFormValues] = useState({
    event_name: "",
    event_desc: "",
    event_location: "",
    event_date: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    formValues.university_id = university_id;
    console.log(formValues);
    const data = await CreatePublicEventAPI(formValues);

    setFormValues({
      event_name: "",
      event_desc: "",
      event_location: "",
      event_date: "",
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
        <p className="h5">Create Public Event</p>
      </Nav.Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create an Public Event</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formEventName">
              <Form.Floating>
                <Form.Control
                  name="event_name"
                  value={formValues.event_name}
                  type="text"
                  placeholder="Event Name"
                  onChange={handleChange}
                  required
                />
                <Form.Label>Event Name</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEventDesc">
              <Form.Floating>
                <Form.Control
                  name="event_desc"
                  value={formValues.event_desc}
                  type="text"
                  placeholder="RSO Description"
                  onChange={handleChange}
                  required
                />
                <Form.Label>Event Description</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEventLocation">
              <Form.Floating>
                <Form.Control
                  name="event_location"
                  value={formValues.event_location}
                  type="text"
                  placeholder="Location"
                  onChange={handleChange}
                  required
                />
                <Form.Label>Event Location</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEventDate">
              <Form.Floating>
                <Form.Control
                  name="event_date"
                  value={formValues.event_date}
                  type="datetime-local"
                  placeholder="Event Date"
                  onChange={handleChange}
                  required
                />
                <Form.Label>Event Date</Form.Label>
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

export default PublicEventProfile;
