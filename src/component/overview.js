import { Row, Col, Button } from 'react-bootstrap';
import { useEffect,useState} from 'react';

function Overview(props) {
  //let [info,setInfo]=useState('');

  useEffect(() => {
    //setInfo('Done');
  }, []);

  return (
    <Row>
      <Col lg={8} className="pt-2" >{props.name}</Col>
      <Col lg={2} className="pt-2 text-end">
        <Button size="lg" variant="primary" onClick={()=>{}} >Fav</Button>
      </Col>
      <Col lg={2} className="pt-2 text-end">
        <Button size="lg" variant="primary" onClick={()=>{}} >Run</Button>
      </Col>
    </Row>
  );
}
export default Overview;