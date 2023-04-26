import { Row, Col } from 'react-bootstrap';
import { useEffect} from 'react';

function Info(props) {
  const info=props.data;
  return (
    {info}
  );
}
export default Info;