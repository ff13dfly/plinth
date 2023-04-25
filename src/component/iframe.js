import { } from 'react-bootstrap';
import { useEffect} from 'react';

function Iframe(props) {
  //let [info,setInfo]=useState('');

  useEffect(() => {
    //setInfo('Done');
  }, []);

  return (
    <iframe src={props.url} frameborder="0" className='vh-100 w-100'></iframe>
  );
}
export default Iframe;