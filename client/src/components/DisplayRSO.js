import { useEffect, useState } from "react";
import { GetRSOAPI } from "../api_handler/RSO";
import { Row, Col, Button, Card } from "react-bootstrap";

const DisplayRSO = (university_id) => {
  const [RSOData, setRSOData] = useState([]);

  useEffect(() => {
    const getRSOList = async () => {
      const RSOList = await GetRSOAPI(university_id);
      try {
        setRSOData(RSOList);
      } catch (err) {
        console.error(err);
      }
    };
    getRSOList();
  }, []);

  return (
    <Row className="py-5 g-4">
      {RSOData.map((RSO) => (
        <Col key={RSO.rso_id} id={RSO.rso_id}>
          <Card style={{ width: "18rem"}}>
            <Card.Img
              className="bg-light"
              variant="top"
              src={"https://placehold.co/286x180"}
            />
            <hr className="my-0" />
            <Card.Body>
              <Card.Title>{RSO.name}</Card.Title>
              <Card.Text>{RSO.description}</Card.Text>
              <Button href={`/dashboard/university/${university_id.university_id}/rso/${RSO.rso_id}`} variant="dark">View</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DisplayRSO;
