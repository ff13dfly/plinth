import { Row, Col,Badge } from 'react-bootstrap';

function Debug(props) {
  const debug=props.data;
  return (
    <Row>
      <Col lg={12} className="pt-2">
        Processsing from {debug.start} to {debug.end}, cost <Badge bg="secondary">{(debug.end-debug.start).toLocaleString()}</Badge> ms. 
      </Col>
      <Col lg={12}>
        Anchor query[{debug.search.length}] : {JSON.stringify(debug.search)}
      </Col>
    </Row>
  );
}
export default Debug;