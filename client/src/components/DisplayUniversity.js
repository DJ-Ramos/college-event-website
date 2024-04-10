import { useEffect, useState } from "react";
import { GetUniversityAPI } from "../api_handler/University";
import { Row, Col, Button, Card } from "react-bootstrap";

const DisplayUniversity = () => {
  const [universityData, setUniversityData] = useState([]);

  useEffect(() => {
    const getUniversityList = async () => {
      const universityList = await GetUniversityAPI();
      try {
        setUniversityData(universityList);
      } catch (err) {
        console.error(err);
      }
    };
    getUniversityList();
  }, []);

  return (
    <Row className="mt-5 g-4">
      {universityData.map((university) => (
        <Col key={university.university_id}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              className="bg-light"
              variant="top"
              src={"https://placehold.co/286x180"}
            />
            <hr className="my-0" />
            <Card.Body>
              <Card.Title>{university.name}</Card.Title>
              <Card.Text>{university.description}</Card.Text>
              <Button variant="dark">View University</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DisplayUniversity;
