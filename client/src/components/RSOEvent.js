import { useState } from "react";
import { CreateRSOEventAPI } from "../api_handler/RSO";
import { Button, Modal, Nav, Form } from "react-bootstrap";
import EventComments from "../components/EventsComments.js"; // Import EventComments component

const RSOEvent = (rso_id) => {
  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState({
    event_name: "",
    event_desc: "",
    event_location: "",
    event_date: "",
  });
  const [eventId, setEventId] = useState(null); // State to store the event ID

  useEffect(() => {
    // Fetch event details from the server when the component mounts
    fetchEventDetailsFromServer();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const fetchEventDetailsFromServer = async () => {
    try {
      // Fetch event details from the server
      const eventData = await fetchEventDetails(university_id, rso_id);
      // Extract event ID from the fetched data
      const eventIdFromServer = eventData.id;
      // Set the event ID state
      setEventId(eventIdFromServer);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    formValues.rso_id = rso_id;
    console.log(formValues);
    const data = await CreateRSOEventAPI(formValues);

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
        <p className="h5">Create RSO Event</p>
      </Nav.Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create an RSO Event</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {/* Form inputs for event details */}
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
        {/* Conditional rendering for EventComments */}
        {eventId !== null ? (
          <EventComments eventId={eventId} />
        ) : (
          <p>Loading event details...</p>
        )}
      </Modal>
    </>
  );
};

export default RSOEvent;