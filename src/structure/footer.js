import { Row, Col } from 'react-bootstrap';
import { useEffect,useState} from 'react';


function Footer(props) {

  let [info,setInfo]=useState('');

  useEffect(() => {
    setInfo('Done');
  }, []);

  return (
    <Row>
      <Col lg={3} xs={3} className="pt-2" >{info}</Col>
      <Col lg={9} xs={9} className="pt-2 text-end" >
        Publish management here
      </Col>
    </Row>
  );
}
export default Footer;