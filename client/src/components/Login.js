import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import logo from "../assets/logo.png";

const Login = (props) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(formValues);
    setFormValues({
      email: "",
      password: "",
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
          <Form>
            <img src={logo} alt="UCF logo" />
            <h3 className="text-center my-5">Sign in to your account</h3>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Floating>
                <Form.Control
                  value={formValues.email}
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
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
                />
                <Form.Label>Password</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Button onClick={handleLogin} variant="primary" className="mt-1">
              Sign In
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          <span>New User? </span>
          <a
            href="javascript:void(0);"
            onClick={() => props.onFormSwitch("register")}
          >
            Register
          </a>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Login;
