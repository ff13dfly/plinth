import { Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';

function Category(props){

  return (
    <Row>
      <Col lg={12} className="pt-4" >Anchor Category</Col>
      <Col lg={12} className="pt-2" ></Col>
      <Col lg={12} className="pt-2" ></Col>
      <Col lg={12} className="pt-2" ></Col>
    </Row>
  );
}
export default Category;