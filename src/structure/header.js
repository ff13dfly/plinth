import { Row, Col } from 'react-bootstrap';
import { useEffect,useState} from 'react';


function Header(props) {

  let [info,setInfo]=useState('');

  useEffect(() => {
    setInfo('Info here');
  }, []);

  return (
    <Row>
      <Col lg={3} xs={3} className="pt-2" >{info}</Col>
      <Col lg={9} xs={9} className="pt-2 text-end" >
        Buttons here
      </Col>
    </Row>
  );
}
export default Header;