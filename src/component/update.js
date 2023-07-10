import { Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function Update(props) {
  let [info, setInfo] = useState('');
  let [raw, serRaw] = useState('');
  let [ver, serVer] = useState('1.0.0');
  let [format, setFormat] = useState('json');
  let [tpl, serTpl] = useState('');
  let [libs, serLibs] = useState([]);
  let [type,setType]=useState(false);

  const self = {
    onUpdate: (ev) => {
      console.log(ver);
      console.log(format);
    },
    versionChange: (ev) => {
      serVer(ev.target.value);
    },
    formatChange: (ev) => {
      setFormat(ev.target.value);
    },
    typeChange:(ev)=>{
      setType(!type);
      //console.log(ev.target.value);
    },
  }
  useEffect(() => {
    //setInfo('Done');
  }, []);

  return (
    <Row hidden={props.hidden}>
      <Col md={10} lg={10} xl={10} xxl={10} className='pt-2'>
        <Form.Control
          size="md"
          type="file"
          disabled={!type}
          hidden={!type}
          placeholder="Select file..."
          onChange={(ev) => { self.fileChange(ev) }}
        />
      </Col>
      <Col md={2} lg={2} xl={2} xxl={2} className='pt-2'>
        <Form.Group controlId="formBasicCheckbox" 
        onChange={(ev) => {self.typeChange(ev)}} >
          <Form.Check type="checkbox" label="File" className='pt-2' />
        </Form.Group>
      </Col>
      <Col md={12} lg={12} xl={12} xxl={12} className='pt-1'>
        <Form.Control as="textarea"
          rows={3}
          disabled={type}
          hidden={type}
          placeholder="Raw data..."
          onChange={(ev) => { }} />
      </Col>
      <Col md={2} lg={2} xl={2} xxl={2} className='pt-3'>Version</Col>
      <Col md={3} lg={3} xl={3} xxl={3} className='pt-2'>
        <Form.Control
          size="md"
          type="text"
          placeholder="As 1.0.2"
          value={ver}
          onChange={(ev) => {
            self.versionChange(ev);
          }}
        />
      </Col>
      <Col md={2} lg={2} xl={2} xxl={2} className='pt-3'>Libs</Col>
      <Col md={5} lg={5} xl={5} xxl={5} className='pt-2'>
        <Form.Control
          size="md"
          type="text"
          placeholder="Seprate by ,"
          onChange={(ev) => {
          }}
        />
      </Col>
      <Col md={2} lg={2} xl={2} xxl={2} className='pt-3'>Format</Col>
      <Col md={3} lg={3} xl={3} xxl={3} className='pt-2'>
        <Form.Control
          size="md"
          type="text"
          placeholder="As js"
          value={format}
          onChange={(ev) => {
            self.codeChange(ev);
          }}
        />
      </Col>
      <Col md={2} lg={2} xl={2} xxl={2} className='pt-3'>Template</Col>
      <Col md={5} lg={5} xl={5} xxl={5} className='pt-2'>

        <Form.Control
          size="md"
          type="text"
          placeholder="React, node.js ..."
          onChange={(ev) => {
          }}
        />
      </Col>
      <Col md={8} lg={8} xl={8} xxl={8}>{info}</Col>
      <Col md={4} lg={4} xl={4} xxl={4} className='pt-2 text-end'>
        <Button
          size="md"
          variant="primary"
          onClick={(ev) => {
            self.onUpdate(ev)
          }}
        > Update </Button>
      </Col>
    </Row>
  );
}
export default Update;