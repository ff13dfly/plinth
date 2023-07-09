import { Row, Col, Form } from 'react-bootstrap';
import { useEffect } from 'react';

function Update(props) {
  //let [info,setInfo]=useState('');
  //const list=props.list;
  useEffect(() => {
    //setInfo('Done');
  }, []);

  return (
    <Row>
      <Col md={12} lg={12} xl={12} xxl={12}>
        <Form.Control as="textarea"
          rows={3}
          placeholder="Raw data..."
          onChange={(ev) => { }} />
      </Col>
    </Row>
  );
}
export default Update;