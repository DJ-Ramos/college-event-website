import { useState } from "react";
import { LoginAPI } from "../api_handler/Users";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import setCookie from "../hooks/setCookie"
import FormLayout from "../layouts/FormLayout";
import logo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formValues);

    const data = await LoginAPI(formValues);

    setFormValues({
      email: "",
      password: "",
    });

    if (data.status == 200) {
      setCookie('user_id', data.users_id)
      setCookie('first_name', data.first_name)
      setCookie('last_name', data.last_name)
      setCookie('user_type', data.user_type)
      navigate("/dashboard", { replace: true });
    }
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
          <h3 className="text-center my-5">Sign in to your account</h3>
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
            Sign In
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer className="text-muted">
        <span>New User? </span>
        <Link to="/register">Register</Link>
      </Card.Footer>
    </FormLayout>
  );
};

export default Login;
