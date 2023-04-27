import { Container,Row, Col,Button } from 'react-bootstrap';
import { useEffect,useState} from 'react';
import { Config } from '../config/default.js';

function Header(props) {
  const dialog=props.dialog;

  let [info,setInfo]=useState('');

  useEffect(() => {
    setInfo('Info here');
  }, []);

  return (
    <Container id={Config.ID.header} fluid className="d-block d-md-none d-lg-none d-xl-none d-xxl-none">
      <Row>
        <Col lg={3} xs={3} className="pt-2" >
          <Button size="sm" variant="primary" onClick={()=>{dialog.closePage("close")}} >x</Button>
        </Col>
        <Col lg={9} xs={9} className="pt-2 text-end" >
          <Button size="sm" variant="primary" onClick={()=>{dialog.showPage("account")}}>A</Button>
          <Button size="sm" variant="primary" onClick={()=>{dialog.showPage("server")}} >N</Button>
        </Col>
      </Row>
    </Container>
  );
}
export default Header;