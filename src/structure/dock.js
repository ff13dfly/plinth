import { Container,Row, Col } from 'react-bootstrap';
import { useEffect,useState} from 'react';
import { Config } from '../config/default.js';

function Dock(props) {

  //let [info,setInfo]=useState('');

  useEffect(() => {
    //setInfo('Stage');
  }, []);

  return (
    <Row>
      <Col lg={12} xs={12} className="pt-2">Dock Panel</Col>
    </Row>
  );
}
export default Dock;