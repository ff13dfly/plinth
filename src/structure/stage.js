import { Row, Col } from 'react-bootstrap';
import { useEffect,useState} from 'react';
import { Config } from '../config/default.js';

function Stage(props) {

  let [info,setInfo]=useState('');

  useEffect(() => {
    setInfo('Stage');
  }, []);

  return (
    <Row>
      <Col lg={12} xs={12} className="pt-2" id={Config.ID.stage} >{info}</Col>
    </Row>
  );
}
export default Stage;