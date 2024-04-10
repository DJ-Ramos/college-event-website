import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, Navbar, Nav } from "react-bootstrap";
import DisplayUniversity from "../components/DisplayUniversity";
import UniversityProfile from "../components/UniversityProfile";
import removeCookie from "../hooks/removeCookie"
import getCookie from "../hooks/getCookie";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeCookie('user_id')
    removeCookie('first_name')
    removeCookie('last_name')
    removeCookie('user_type')
    navigate("/login", { replace: true });
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="py-3 text-white">
        <Container>
          <Navbar.Brand><h1 className="display-4">Dashboard</h1></Navbar.Brand>
          <Nav className="justify-content-end">
            {getCookie('user_type') === 'super_admin' && <UniversityProfile />}
            <Nav.Link href="#" onClick={logout}><p className="h5">Logout</p></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="d-flex">
          <DisplayUniversity />
      </Container>
    </>
  );
};

export default Dashboard;
