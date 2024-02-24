import { useState } from "react";
import { RegisterAPI } from "../api_handler/Users";
import { Link } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import FormLayout from "../layouts/FormLayout";
import logo from "../assets/logo.png";

const Register = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);

    RegisterAPI(formValues);

    setFormValues({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    });
  };

  const handleChange = (event) => {
    event.preventDefault();
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  return (
    <FormLayout>
      <Card.Body className="p-5 text-center">
        <Form onSubmit={handleSubmit}>
          <img src={logo} alt="UCF logo" />
          <h3 className="text-center my-5">Register for an account</h3>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Floating>
              <Form.Control
                value={formValues.first_name}
                name="first_name"
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                required
              />
              <Form.Label>First Name</Form.Label>
            </Form.Floating>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Floating>
              <Form.Control
                value={formValues.last_name}
                name="last_name"
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                required
              />
              <Form.Label>Last Name</Form.Label>
            </Form.Floating>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Floating>
              <Form.Control
                value={formValues.email}
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
              <Form.Label>Email</Form.Label>
            </Form.Floating>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Floating>
              <Form.Control
                value={formValues.password}
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <Form.Label>Password</Form.Label>
            </Form.Floating>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-1">
            Register
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer className="text-muted">
        <span>Already Registered? </span>
        <Link to="/login">Sign in</Link>
      </Card.Footer>
    </FormLayout>
  );
};

export default Register;
