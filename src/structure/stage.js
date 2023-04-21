import { Container, Row, Col } from 'react-bootstrap';
import { useEffect,useState} from 'react';

function Stage(props) {

  let [dancer,setDancer]=useState('');

  useEffect(() => {
    setDancer('Stage is here to show');
  }, []);
  return (
    <Container className='vh-100' >
      <Row>
        <Col lg={3} xs={4} className="pt-2 d-block d-md-none d-lg-none d-xl-none d-xxl-none">left opts</Col>
        <Col lg={6} xs={4} className="pt-2 d-block d-md-none d-lg-none d-xl-none d-xxl-none">title</Col>
        <Col lg={3} xs={4} className="pt-2 d-block d-md-none d-lg-none d-xl-none d-xxl-none" >right opts</Col>
        <Col lg={12} xs={12} className="pt-2">{dancer}</Col>
      </Row>
    </Container>
  );
}
export default Stage;