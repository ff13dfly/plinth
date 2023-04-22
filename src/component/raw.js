import { Row, Col, Form } from 'react-bootstrap';
import { useEffect,useState} from 'react';

function Raw(props) {
  //let [info,setInfo]=useState('');

  useEffect(() => {
    //setInfo('Done');
  }, []);

  return (
    <Row>
      <Col className="pt-2" >
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Anchor Raw Data</Form.Label>
          <Form.Control as="textarea" rows={6} value={props.anchor.raw} disabled />
        </Form.Group>
      </Col>
      <Col className="pt-2" >
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Anchor Protocol</Form.Label>
          <Form.Control as="textarea" rows={6} value={JSON.stringify(props.anchor.protocol)} disabled />
        </Form.Group>
      </Col>
    </Row>
  );
}
export default Raw;