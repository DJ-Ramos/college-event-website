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

    const res = await LoginAPI(formValues);

    if (res.status == 200) {
      setCookie('user_id', res.users_id)
      setCookie('first_name', res.first_name)
      setCookie('last_name', res.last_name)
      setCookie('user_type', res.user_type)
      setCookie('domain', formValues.email.split('@').pop())
      navigate("/dashboard", { replace: true });
    } else {
      alert(res.error);
    }

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
