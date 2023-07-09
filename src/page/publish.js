import { Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import Update from '../component/update';

function Publish(props) {

  let [info, setInfo] = useState('');

  const self = {
    onSelect: (ev) => {

    },
  }

  useEffect(() => {
    //setInfo('Done');
  }, []);

  return (
    <Row>
      <Col lg={6} xs={6} className="pt-2" >
        <Form.Control
          size="md"
          type="text"
          placeholder="Anchor to manager..."
          onChange={(ev) => { }}
        />
      </Col>
      <Col lg={4} xs={4} className="pt-2" >
        <Form.Select onChange={(ev) => { self.onSelect(ev) }}>
          <option value="1">App</option>
          <option value="2">Lib</option>
          <option value="2">Data</option>
        </Form.Select>
      </Col>
      <Col lg={2} xs={2} className="pt-2 text-end" >
        <Button
          size="md"
          variant="primary"
          onClick={() => {

          }}
        >Add</Button>
      </Col>
      <Col lg={12} xs={12} className="pt-2 text-end" >{info}</Col>
      <Col lg={12} xs={12}><hr /></Col>
      <Col lg={6} xs={6} className="pt-2">
        <Form.Select onChange={(ev) => { self.onSelect(ev) }}>
          <option value="1">hello</option>
          <option value="2">jquery</option>
        </Form.Select>
      </Col>
      <Col lg={2} xs={2} className="pt-2" >
        <Button
          size="md"
          variant="danger"
          onClick={() => {

          }}
        > X </Button>
      </Col>
      <Col lg={4} xs={4} className="pt-2">
      </Col>
      
      <Col lg={9} xs={9} className="pt-2">
        <Update />
      </Col>
      <Col lg={3} xs={3} className="pt-2">
        History
      </Col>
    </Row>
  );
}
export default Publish;