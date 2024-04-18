import { useNavigate, useParams } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { logout } from "../utils/logoutUtil";
import DisplayRSOEvent from "../components/DisplayRSOEvent"
import RSOEvent from "../components/RSOEvent";
import getCookie from "../hooks/getCookie";

const EventDashboard = () => {
  const { id, rso_id } = useParams();
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
            <h1 className="display-5">RSO Events Dashboard</h1>
          </Navbar.Brand>
          <Nav className="justify-content-end">
            {<RSOEvent rso_id={rso_id} />}
            <Nav.Link href="#" onClick={handleLogout}>
              <p className="h5">Logout</p>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        { <DisplayRSOEvent university_id={id} rso_id={rso_id} />}
      </Container>
    </>
  );
};

export default EventDashboard;
