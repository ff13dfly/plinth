import { Row, Col, Badge } from 'react-bootstrap';
import { useEffect, useState } from 'react';


function Trust(props) {
  //console.log(props);
  let [list, setList] = useState([]);

  useEffect(() => {
    const ts = []
    for (var k in props.list) {
      ts.push([k, props.list[k]]);
    }
    //console.log();
    setList(ts);
  }, []);

  return (
    <Row>
      {list.map((item, index) => (
        <Col md={6} lg={6} xl={4} xxl={4} key={index}>
          <h3>
          <Badge bg="info">{item[0]} to {item[1]}</Badge>
          </h3>
        </Col>
      ))}
    </Row>
  );
}
export default Trust;