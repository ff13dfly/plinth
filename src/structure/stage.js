import { Container,Row, Col } from 'react-bootstrap';
import { useEffect,useState} from 'react';
import { Config } from '../config/default.js';

function Stage(props) {

  let [info,setInfo]=useState('');

  useEffect(() => {
    setInfo('Stage');
  }, []);

  return (
    <Container id={Config.ID.stage}>
      <Row>
        <Col lg={3} xs={4} className="pt-2"></Col>
        <Col lg={6} xs={4} className="pt-2"></Col>
        <Col lg={3} xs={4} className="pt-2" ></Col>
        <Col lg={12} xs={12} className="pt-2"  >{info}</Col>
      </Row>
    </Container>
  );
}
export default Stage;