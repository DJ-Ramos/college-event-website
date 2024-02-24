import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import knightroImg from "../assets/knightro-searching.jpg";

const NotFound = () => {
  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row>
        <Col className="d-flex align-items-center justify-content-center">
          <div className="col-lg-8 col-md-8 col-sm-10">
            <h1 className="text-warning display-3">Page Not Found</h1>
            <p className="lead">
              Don't give in to despair. Your quest continues here...
            </p>
            <p>
              Try double-checking the spelling of the address you requested, or
              go to the Login Page using the button below:
            </p>
              <Link to="/login">
                <button type="button" className="btn btn-warning">Login Page</button>
              </Link>
          </div>
        </Col>
        <Col>
          <img src={knightroImg} alt="knightro searching" />
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
