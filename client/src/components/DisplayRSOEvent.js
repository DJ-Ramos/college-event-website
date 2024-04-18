import { useEffect, useState } from "react";
import { GetRSOEventAPI } from "../api_handler/RSO";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const DisplayRSOEvent = (id) => {
  const [RSOEventData, setRSOEventData] = useState([]);

  useEffect(() => {
    const getRSOEventList = async () => {
      const RSOEventList = await GetRSOEventAPI(id.rso_id);
      try {
        setRSOEventData(RSOEventList);
      } catch (err) {
        console.error(err);
      }
    };
    getRSOEventList();
  }, []);

  const dateToString = (date) => {
    const dateString = new Date(date);
    return `${dateString.toDateString()} ${dateString.toLocaleTimeString()}`;
  };

  const mapSrc = (src) => {
    let mapLink;
    mapLink = encodeURI(
      `https://maps.google.com/maps?width=200%25&height=200&amp;hl=en&q=${src}+&t=&z=14&ie=UTF8&iwloc=B&output=embed`
    );
    return mapLink;
  };

  return (
    <Row className="py-5 g-4 justify-content-center">
      <Col lg="8">
        <h2 className="mb-3">RSO Events</h2>
        {RSOEventData.map((RSOEvent) => (
          <div
            className="mb-4 border border-dark"
            key={RSOEvent.event_id}
            id={RSOEvent.event_id}
          >
            <Row>
              <Col className="my-5">
                <h3 className="h5 mb-2">
                  <Link
                    to={`/dashboard/university/${id.university_id}/rso/${id.rso_id}/event/${RSOEvent.event_id}`}
                  >
                    {RSOEvent.name}
                  </Link>
                </h3>
                <span>{dateToString(RSOEvent.date)}</span>
                <div>{RSOEvent.location}</div>
                <p>{RSOEvent.description}</p>
              </Col>
              <Col className="my-3">
                <div style={{ width: "100%" }}>
                  <iframe
                    width="200"
                    height="200"
                    src={mapSrc(RSOEvent.location)}
                  ></iframe>
                </div>
              </Col>
            </Row>
          </div>
        ))}
      </Col>
    </Row>
  );
};

export default DisplayRSOEvent;
