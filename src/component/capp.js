//import { Row, Col } from 'react-bootstrap';
import { useEffect} from 'react';

function CApp(props) {
  //let [info,setInfo]=useState('');

  useEffect(() => {
    //setInfo('Done');
  }, []);

  return (
    <div id={props.id}>{props.loading}</div>
  );
}
export default CApp;