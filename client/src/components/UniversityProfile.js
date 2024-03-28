import { useState } from "react";
import { Button, Modal, Nav, Form } from "react-bootstrap";

const UniversityProfile = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setFormValues({
      uni_name: "",
      uni_location: "",
      uni_desc: "",
      uni_num: "",
    });
  };
  const handleShow = () => setShow(true);

  const [formValues, setFormValues] = useState({
    uni_name: "",
    uni_location: "",
    uni_desc: "",
    uni_num: "",
  });
f
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);

    //RegisterAPI(formValues);

    setFormValues({
      uni_name: "",
      uni_location: "",
      uni_desc: "",
      uni_num: "",
    });

    handleClose();
  };

  const handleChange = (event) => {
    event.preventDefault();
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Nav.Link onClick={handleShow}>
        <p className="h5">Add University</p>
      </Nav.Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a University Profile</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formUniName">
              <Form.Floating>
                <Form.Control
                  name="uni_name"
                  value={formValues.uni_name}
                  type="text"
                  placeholder="University Name"
                  onChange={handleChange}
                  required
                />
                <Form.Label>University Name</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUniLocation">
              <Form.Floating>
                <Form.Control
                  name="uni_location"
                  value={formValues.uni_location}
                  type="text"
                  placeholder="University Address"
                  onChange={handleChange}
                  required
                />
                <Form.Label>University Address</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUniDesc">
              <Form.Floating>
                <Form.Control
                  name="uni_desc"
                  value={formValues.uni_desc}
                  type="text"
                  placeholder="University Description"
                  onChange={handleChange}
                  required
                />
                <Form.Label>University Description</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUniNum">
              <Form.Floating>
                <Form.Control
                  name="uni_num"
                  value={formValues.uni_num}
                  type="text"
                  inputMode="numeric"
                  pattern="[1-9]*"
                  title="Please enter a postive integer."
                  placeholder="University Student Count"
                  onChange={handleChange}
                  required
                />
                <Form.Label>University Student Count</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group className="mb-3 text-center" controlId="formUniBanner">
              <Form.Label>University Banner (286 X 180)</Form.Label>
              <Form.Control
                name="university_banner"
                type="file"
                accept="image/*"
                required
              />
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

export default UniversityProfile;
