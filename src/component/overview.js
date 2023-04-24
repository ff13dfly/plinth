import { Row, Col, Button } from 'react-bootstrap';
import { useEffect} from 'react';

function Overview(props) {
  const self={
    add:(name)=>{
      console.log(name);
    },
    remove:(name)=>{

    },
  };
  // useEffect(() => {

  // }, []);

  return (
    <Row>
      <Col lg={8} className="pt-2" >{props.name}</Col>
      <Col lg={2} className="pt-2 text-end">
        <Button size="lg" variant="primary" onClick={()=>{
          self.add(props.name);
        }} >Fav</Button>
      </Col>
      <Col lg={2} className="pt-2 text-end">
        <Button size="lg" variant="primary" onClick={()=>{}} >Run</Button>
      </Col>
    </Row>
  );
}
export default Overview;