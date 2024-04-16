import { useNavigate, useParams } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { logout } from "../utils/logoutUtil";
import RSOProfile from "../components/RSOProfile";
import DisplayRSO from "../components/DisplayRSO";

const RSODashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleClick = () => {
    navigate(`/dashboard/university/${id}/public_events`, { replace: true });
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="py-3 text-white">
        <Container>
          <Navbar.Brand>
            <h1 className="display-5">RSO Dashboard</h1>
          </Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href="#" onClick={handleClick}>
              <p className="h5">Public Events</p>
            </Nav.Link>
            <RSOProfile university_id={id} />
            <Nav.Link href="#" onClick={handleLogout}>
              <p className="h5">Logout</p>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="d-flex">
        <DisplayRSO university_id={id} />
      </Container>
    </>
  );
};

export default RSODashboard;
