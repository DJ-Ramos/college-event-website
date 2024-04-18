import { useEffect, useState } from "react";
import { GetPublicEventAPI } from "../api_handler/Public";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const DisplayPublicEvent = (id) => {
  const [publicEventData, setPublicEventData] = useState([]);

  useEffect(() => {
    const getPublicEventList = async () => {
      const publicEventList = await GetPublicEventAPI(id.university_id);
      try {
        setPublicEventData(publicEventList);
      } catch (err) {
        console.error(err);
      }
    };
    getPublicEventList();
  }, []);

  const dateToString = (date) => {
    const dateString = new Date(date);
    return `${dateString.toDateString()} ${dateString.toLocaleTimeString()}` ;
  };

  return (
    <Row className="py-5 g-4 justify-content-center">
      <Col lg="8">
        <h2 className="mb-3">Public Events</h2>
        {publicEventData.map((publicEvent) => (
          <div className="mb-4 border border-dark" key={publicEvent.event_id} id={publicEvent.event_id}>
            <h3 className="h5 mb-2">
              <Link
                to={`/dashboard/`}
              >
                {publicEvent.name}
              </Link>
            </h3>
            <span>{dateToString(publicEvent.date)}</span>
            <div>{publicEvent.location}</div>
            <p>{publicEvent.description}</p>
          </div>
        ))}
      </Col>
    </Row>
  );
};

export default DisplayPublicEvent;
