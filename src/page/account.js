import { Row, Col,Form,Button } from 'react-bootstrap';
import { useEffect,useState} from 'react';


function Account(props) {

  //let [info,setInfo]=useState('');

  const self={

  }

  useEffect(() => {
    //setInfo('Done');
  }, []);

  return (
    <Row>
      <Col lg={12} xs={12} >Storage your account encry file on localstorage. When try to use the accounts, need your password.</Col>
      <Col lg={5} xs={5} className="pt-2" >
        <Form.Control
              size="md"
              type="file"
              placeholder="Polkadot encry json file..."
              onChange={(ev) => {  }}
            />
      </Col>
      <Col lg={5} xs={5} className="pt-2" >
          <Form.Control
              size="md"
              type="text"
              placeholder="Password to confirm..."
              onChange={(ev) => {  }}
            />
      </Col>
      <Col lg={2} xs={2} className="pt-2 text-end" >
        <Button
              size="md"
              variant="primary"
              onClick={() => {
                
              }}
            >Storage</Button>
      </Col>
      <Col lg={12} xs={12} className="pt-4" >Account List</Col>
    </Row>
  );
}
export default Account;