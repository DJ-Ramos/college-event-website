import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUniversityAPI } from "../api_handler/University";
import { Row, Col, Button, Card } from "react-bootstrap";
import setCookie from "../hooks/setCookie";

const DisplayUniversity = () => {
  const navigate = useNavigate();
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

  const handleClick = (domain, id) => {
    setCookie("uni_domain", domain);
    navigate(`/dashboard/university/${id}`, { replace: true });
  };

  return (
    <Row className="py-5 g-4">
      {universityData.map((university) => (
        <Col key={university.university_id} id={university.university_id}>
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
              <Button
                onClick={() => handleClick(
                  university.domain,
                  university.university_id
                )}
                variant="dark"
              >
                View
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DisplayUniversity;
