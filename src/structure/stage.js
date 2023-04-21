import { Row, Col } from 'react-bootstrap';
import { useEffect,useState} from 'react';

function Stage(props) {

  let [info,setInfo]=useState('');

  useEffect(() => {
    setInfo('Stage is here to show');
  }, []);

  return (
    <Row>
      <Col lg={3} xs={4} className="pt-2">left opts</Col>
      <Col lg={6} xs={4} className="pt-2">title</Col>
      <Col lg={3} xs={4} className="pt-2" >right opts</Col>
      <Col lg={12} xs={12} className="pt-2">{info}</Col>
    </Row>
  );
}
export default Stage;