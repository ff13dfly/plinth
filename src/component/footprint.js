import { Row, Col,Badge} from 'react-bootstrap';

function Footprint(props) {
  
  return (
    <Row>
      <Col lg={12} className="pt-2" >History</Col>
      {props.list.map((item, index) => (
        <Col lg={12} className="pt-2" key={index}>
          <Badge bg="info">{item.block}</Badge> Version : {item.protocol.ver}
        </Col>
      ))}
    </Row>
  );
}
export default Footprint;