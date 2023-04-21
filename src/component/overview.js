import { Row, Col } from 'react-bootstrap';
import { useEffect,useState} from 'react';

function Overview(props) {

  let [info,setInfo]=useState('');

  useEffect(() => {
    setInfo('Done');
  }, []);

  return (
    <Row>
      <Col lg={12} xs={12} className="pt-2" >{info}</Col>
    </Row>
  );
}
export default Overview;