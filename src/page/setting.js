import { Row, Col, Button, ButtonGroup,Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';


function Setting(props) {

  let [info, setInfo] = useState('');

  useEffect(() => {
    setInfo('Done');
  }, []);

  return (
    <Row>
      <Col lg={12} xs={12} className="pt-4" >{info}</Col>
      <Col md={6} lg={6} xl={6} xxl={6} className="pt-2" >
        Enable Auto Run
      </Col>
      <Col md={4} lg={3} xl={3} xxl={3} className="pt-2 text-end" >
        {/* <ButtonGroup aria-label="Auto Run">
          <Button variant="secondary">True</Button>
          <Button variant="secondary">False</Button>
        </ButtonGroup> */}
        <Form>
          <Form.Check 
            type="switch"
            size="lg"
            id="custom-switch"
          />
        </Form>
      </Col>
      <Col lg={12} xs={12} className="pt-4" >more...</Col>
      <Col lg={12} xs={12} className="pt-4" >more...</Col>
    </Row>
  );
}
export default Setting;