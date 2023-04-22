import { Row, Col, Button } from 'react-bootstrap';
import { useEffect,useState} from 'react';

function Overview(props) {
  //let [info,setInfo]=useState('');

  useEffect(() => {
    //setInfo('Done');
  }, []);

  return (
    <Row>
      <Col lg={9} className="pt-2" >{props.name}</Col>
      <Col lg={3} className="pt-2" >
        <Button size="lg" variant="primary" onClick={()=>{}} >Run</Button>
      </Col>
    </Row>
  );
}
export default Overview;