import { Container,Row, Col,Button} from 'react-bootstrap';
import { useEffect,useState} from 'react';
import { Config } from '../config/default.js';

function Footer(props) {

  let [info,setInfo]=useState('');

  useEffect(() => {
    setInfo('Done');
  }, []);

  return (
    <Container id={Config.ID.footer}>
      <Row>
        <Col lg={3} xs={3} className="pt-2" >{info}</Col>
        <Col lg={9} xs={9} className="pt-2 text-end" >
          <Button size="sm" variant="primary" onClick={()=>{}} >M</Button>
        </Col>
      </Row>
    </Container>
  );
}
export default Footer;