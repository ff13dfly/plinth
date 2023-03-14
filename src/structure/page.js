import { Row, Col } from 'react-bootstrap';
import { useEffect,useState} from 'react';

function Page(props) {

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
export default Page;