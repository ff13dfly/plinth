import { Row, Col } from 'react-bootstrap';
import { useEffect,useState} from 'react';


function Setting(props) {

  let [info,setInfo]=useState('');

  useEffect(() => {
    setInfo('Done');
  }, []);

  return (
    <Row>
      <Col lg={12} xs={12} className="pt-4" >{info}</Col>
      <Col lg={12} xs={12} className="pt-4" >more...</Col>
      <Col lg={12} xs={12} className="pt-4" >more...</Col>
      <Col lg={12} xs={12} className="pt-4" >more...</Col>
    </Row>
  );
}
export default Setting;