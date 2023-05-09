import { Row, Col, Form } from 'react-bootstrap';
import { useEffect} from 'react';

function Raw(props) {
  //let [info,setInfo]=useState('');

  useEffect(() => {
    //setInfo('Done');
  }, []);

  const len_raw=props.anchor.raw!==null?props.anchor.raw.length:0;

  return (
    <Row className="pb-4">
      <Col className="pt-2 mb-2">
        <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Anchor Raw Data ({len_raw.toLocaleString()})</Form.Label>
          <Form.Control as="textarea" rows={6} value={props.anchor.raw!==null?props.anchor.raw:""} disabled />
        </Form.Group>
      </Col>
      <Col className="pt-2 mb-2">
        <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Anchor Protocol ({JSON.stringify(props.anchor.protocol).length})</Form.Label>
          <Form.Control as="textarea" rows={6} value={JSON.stringify(props.anchor.protocol)} disabled />
        </Form.Group>
      </Col>
    </Row>
  );
}
export default Raw;