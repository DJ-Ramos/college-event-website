import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import logo from "../assets/logo.png";

const Register = (props) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleRegister = (event) => {
    event.preventDefault();
    console.log(formValues);
    setFormValues({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    });
  };

  const handleChange = (event) => {
    event.preventDefault();
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Card className="col-12 col-md-8 col-lg-6 col-xl-5">
        <Card.Body className="p-5 text-center">
          <Form onSubmit={handleRegister}>
            <img src={logo} alt="UCF logo" />
            <h3 className="text-center my-5">Register for an account</h3>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Floating>
                <Form.Control
                  value={formValues.firstName}
                  name="firstName"
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
                  value={formValues.lastName}
                  name="lastName"
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
          <a
            href="javascript:void(0);"
            onClick={() => props.onFormSwitch("login")}
          >
            Sign in
          </a>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Register;
