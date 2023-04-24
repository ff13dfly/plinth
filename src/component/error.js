import { Row, Col } from 'react-bootstrap';
import { useEffect} from 'react';

function Error(props) {
  //let [info,setInfo]=useState('');

  useEffect(() => {
    //setInfo('Done');
  }, []);

  return (
    <Row>
      <Col className="pt-2" >{props.data}</Col>
    </Row>
  );
}
export default Error;