import { Row, Col } from 'react-bootstrap';
import { useEffect,useState} from 'react';

function Detail(props) {
  
  const anchor=props.anchor;

  let [info,setInfo]=useState('');

  useEffect(() => {
    setInfo('Checked');
  }, []);

  return (
    <Row>
      <Col lg={12} className="pt-2" >Signer: {anchor.signer}</Col>
      <Col lg={12} className="pt-2" >Owner: {anchor.owner}</Col>
      <Col lg={12} className="pt-2" >Stamp: {anchor.stamp}</Col>
      <Col lg={12} className="pt-2" >{info}</Col>
    </Row>
  );
}
export default Detail;