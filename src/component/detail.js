import { Row, Col, Badge, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import Category from './category.js';
import Trust from './trust.js';

function Detail(props) {
  let [list, setList] = useState([]);
  const anchor = props.anchor;
  const easy = props.easy;


  //let [info,setInfo]=useState('');

  useEffect(() => {
    const auths = []
    for (var k in easy.auth) {
      auths.push([k, easy.auth[k]]);
    }
    setList(auths);
  }, []);

  return (
    <Row>
      <Col lg={4} xl={4} xxl={3} className="pt-2" >
        <Category type={easy.type} call={easy.call} />
      </Col>
      <Col lg={8} xl={8} xxl={9} className="pt-2" >
        <Row>
          <Col lg={12} className="pt-2" ><h4>Authority</h4></Col>
          {list.map((item, index) => (
            <Col md={3} lg={3} xl={2} xxl={2} key={index} className="text-center">
              <Image
                src={`https://robohash.org/${item[0]}.png`}
                alt={item[0]}
                rounded
                width="100%"
              />
              <Badge bg="info">{item[1]===0?'~':item[1]}</Badge>
            </Col>
          ))}
          <Col lg={12} className="pt-2" ><h4>Trust</h4></Col>
          
            <Col md={12} lg={12} xl={12} xxl={12}>
            <Trust list={easy.trust}/>
            </Col>
          
        </Row>
        <Row>
          <Col lg={12} className="pt-4" ><h4>Basic</h4></Col>
          <Col lg={12} className="pt-2" >Owner: {anchor.owner}</Col>
          <Col lg={12} className="pt-2" >Signer: {anchor.signer}</Col>
          <Col lg={12} className="pt-2" >Stamp: {anchor.stamp}</Col>
        </Row>
      </Col>

    </Row>
  );
}
export default Detail;