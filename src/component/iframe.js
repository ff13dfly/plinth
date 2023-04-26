import { Row,Col } from 'react-bootstrap';
import { useEffect} from 'react';

function Iframe(props) {
  //let [info,setInfo]=useState('');

  useEffect(() => {
    //setInfo('Done');
  }, []);

  return (
    <Row>
      <Col lg={12} className="pt-2" >
        {props.url}
      </Col>
      <Col lg={12} className="pt-2" >
        <iframe src={props.url} frameborder="0" className='vh-100 w-100'></iframe>
      </Col>
    </Row>
  );
}
export default Iframe;