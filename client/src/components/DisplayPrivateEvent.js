import { useEffect, useState } from "react";
import { GetPrivateEventAPI } from "../api_handler/Private";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const DisplayPrivateEvent = (id) => {
  const [privateEventData, setPrivateEventData] = useState([]);

  useEffect(() => {
    const getPrivateEventList = async () => {
      const privateEventList = await GetPrivateEventAPI(id.university_id);
      try {
        setPrivateEventData(privateEventList);
      } catch (err) {
        console.error(err);
      }
    };
    getPrivateEventList();
  }, []);

  const dateToString = (date) => {
    const dateString = new Date(date);
    return `${dateString.toDateString()} ${dateString.toLocaleTimeString()}` ;
  };

  return (
    <Row className="py-5 g-4 justify-content-center">
      <Col lg="8">
        <h2 className="mb-3">Private Events</h2>
        {privateEventData.map((privateEvent) => (
          <div className="mb-4 border border-dark" key={privateEvent.event_id} id={privateEvent.event_id}>
            <h3 className="h5 mb-2">
              <Link
                to={`/dashboard/`}
              >
                {privateEvent.name}
              </Link>
            </h3>
            <span>{dateToString(privateEvent.date)}</span>
            <div>{privateEvent.location}</div>
            <p>{privateEvent.description}</p>
          </div>
        ))}
      </Col>
    </Row>
  );
};

export default DisplayPrivateEvent;
