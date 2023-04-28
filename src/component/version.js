import { Row, Col} from 'react-bootstrap';
import { useEffect} from 'react';

function Version(props) {
  //let [info,setInfo]=useState('');
  const list=props.list;
  useEffect(() => {
    //setInfo('Done');
  }, []);

  return (
    <Row>
      {list.map((anchor, index) => (
        <Col md={12} lg={12} xl={12} xxl={12} key={index} className="text-center">
          {anchor.block} : { JSON.stringify(anchor.protocol)}
        </Col>
      ))}
    </Row>
  );
}
export default Version;