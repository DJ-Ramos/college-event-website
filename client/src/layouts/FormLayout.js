import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const FormLayout = ({ children }) => {
  return (
    <div style={{ backgroundImage: "url(/illustration.jpg)" }}>
      <Container className="vh-100 d-flex align-items-center justify-content-center">
        <Card className="col-12 col-md-8 col-lg-6 col-xl-5">{children}</Card>
      </Container>
    </div>
  );
};

export default FormLayout;
