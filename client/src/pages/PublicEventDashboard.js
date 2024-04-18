import { useNavigate, useParams } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { logout } from "../utils/logoutUtil";
import PublicEventProfile from "../components/PublicEventProfile";
import DisplayPublicEvent from "../components/DisplayPublicEvent";
import getCookie from "../hooks/getCookie";

const PublicEventDashboard = () => {
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
            <h1 className="display-5">Public Events Dashboard</h1>
          </Navbar.Brand>
          <Nav className="justify-content-end">
            {getCookie("user_type") === "super_admin" && <PublicEventProfile university_id={id} />}
            <Nav.Link href="#" onClick={handleLogout}>
              <p className="h5">Logout</p>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        {<DisplayPublicEvent university_id={id}/>}
      </Container>
    </>
  );
};

export default PublicEventDashboard;
