import { Row, Col } from 'react-bootstrap';

function Category(props){
  const type=props.type;
  const call=props.call;

  return (
    <Row>
      <Col lg={12} className="pt-4" >Anchor Category</Col>
      <Col lg={12} className="pt-2" >Type: {type}</Col>
      <Col lg={12} className="pt-2" >Call: {call}</Col>
      <Col lg={12} className="pt-2" ></Col>
    </Row>
  );
}
export default Category;