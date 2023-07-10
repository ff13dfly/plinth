import { Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PUB from '../lib/pub';

function Mine(props) {
  let [info, setInfo] = useState('');
  let [anchor,setAnchor]=useState('');

  const self={
    onChange:(ev)=>{
      setAnchor(ev.target.value);
    },
    onSelect: (ev) => {

    },
    onClick:(ev)=>{
      console.log(anchor);
      if(!anchor){
        return setInfo("No anchor to add");
      }

      PUB.setPublish(anchor);
      setInfo("Anchor added successful.");
      props.fresh();
    },
  }

  useEffect(() => {

  }, []);

  return (
    <Row>
      <Col lg={4} xs={4}>
        <Form.Control
          size="md"
          type="text"
          placeholder="Anchor to manager..."
          onChange={(ev) => {
            self.onChange(ev)
          }}
        />
      </Col>
      {/* <Col lg={4} xs={4}>
        <Form.Select onChange={(ev) => { self.onSelect(ev) }}>
          <option value="1">App</option>
          <option value="2">Lib</option>
          <option value="2">Data</option>
        </Form.Select>
      </Col> */}
      <Col lg={2} xs={2} className=''>
        <Button
          size="md"
          variant="primary"
          onClick={(ev) => {
            self.onClick(ev);
          }}
        >Add</Button>
      </Col>
      <Col lg={6} xs={6} className='pt-2'>{info}</Col>
    </Row>
  );
}
export default Mine;