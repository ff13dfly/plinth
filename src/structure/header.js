import { Container,Row, Col,Button } from 'react-bootstrap';
import { useEffect,useState} from 'react';
import { Config } from '../config/default.js';

function Header(props) {
  const interaction=props.interaction;

  let [info,setInfo]=useState('');

  useEffect(() => {
    setInfo('Info here');
  }, []);

  return (
    <Container id={Config.ID.header}>
      <Row>
        <Col lg={3} xs={3} className="pt-2" >
          <Button size="sm" variant="primary" onClick={()=>{interaction.closePage("account")}} >x</Button>
        </Col>
        <Col lg={9} xs={9} className="pt-2 text-end" >
          <Button size="sm" variant="primary" onClick={()=>{interaction.showPage("account")}} >A</Button>
          <Button size="sm" variant="primary" onClick={()=>{interaction.showPage("server")}} >N</Button>
        </Col>
      </Row>
    </Container>
  );
}
export default Header;