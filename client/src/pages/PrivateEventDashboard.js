import { useNavigate, useParams } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { logout } from "../utils/logoutUtil";
import PrivateEventProfile from "../components/PrivateEventProfile";
import DisplayPrivateEvent from "../components/DisplayPrivateEvent";
import getCookie from "../hooks/getCookie";

const PrivateEventDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="py-3 text-white">
        <Container>
          <Navbar.Brand>
            <h1 className="display-5">Private Events Dashboard</h1>
          </Navbar.Brand>
          <Nav className="justify-content-end">
            {getCookie("domain") === getCookie("uni_domain") && <PrivateEventProfile university_id={id} />}
            <Nav.Link href="#" onClick={handleLogout}>
              <p className="h5">Logout</p>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        {<DisplayPrivateEvent university_id={id}/>}
      </Container>
    </>
  );
};

export default PrivateEventDashboard;
