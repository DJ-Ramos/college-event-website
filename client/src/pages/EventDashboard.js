import { useNavigate, useParams } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { logout } from "../utils/logoutUtil";
import RSOEvent from "../components/RSOEvent";

const EventDashboard = () => {
  const { rso_id } = useParams();
  const navigate = useNavigate();
  console.log(rso_id);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="py-3 text-white">
        <Container>
          <Navbar.Brand>
            <h1 className="display-5">Events Dashboard</h1>
          </Navbar.Brand>
          <Nav className="justify-content-end">
            {<RSOEvent rso_id={rso_id} />}
            <Nav.Link href="#" onClick={handleLogout}>
              <p className="h5">Logout</p>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="d-flex">
        {/* <DisplayRSO university_id={id} /> */}
      </Container>
    </>
  );
};

export default EventDashboard;
