import { Container, Row, Col } from 'react-bootstrap';
import { useEffect} from 'react';

function Stage(props) {
  const content=props.content;

  useEffect(() => {
  }, []);

  const cmap={
    "overflowY": "scroll",
  }

  return (
    <Container className='vh-100 pt-2 pb-4' style={cmap}>
      <Row className='pb-4'>
        <Col lg={3} xs={4} className="pt-2 d-block d-md-none d-lg-none d-xl-none d-xxl-none">left opts</Col>
        <Col lg={6} xs={4} className="pt-2 d-block d-md-none d-lg-none d-xl-none d-xxl-none">title</Col>
        <Col lg={3} xs={4} className="pt-2 d-block d-md-none d-lg-none d-xl-none d-xxl-none" >right opts</Col>
        <Col lg={12} xs={12} className="pt-4 bg-light"></Col>
        {content.map((item,index) => (
          <Col lg={12} xs={12} key={index} className="pt-2 pb-2">{item}</Col>
        ))}
      </Row>
    </Container>
  );
}
export default Stage;