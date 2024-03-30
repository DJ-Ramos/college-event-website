import { Container, Row, Col, Button, Card, Navbar, Nav } from "react-bootstrap";
import UniversityProfile from "../components/UniversityProfile";
import ucfBanner from "../assets/ucf_banner.png";

const Dashboard = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="py-3 text-white">
        <Container>
          <Navbar.Brand><h1 className="display-4">Dashboard</h1></Navbar.Brand>
          <Nav className="justify-content-end">
            <UniversityProfile/>
            <Nav.Link href="#pricing"><p className="h5">Logout</p></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="d-flex align-items-center justify-content-center">
        <Container>
          <Row className="mt-5">
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img className="bg-light" variant="top" src={ucfBanner} />
                <hr className="my-0" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="dark">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>  
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Dashboard;
