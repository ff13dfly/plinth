import { Row, Col, Button,Badge } from 'react-bootstrap';
import { useEffect} from 'react';

import Version from './version.js';

function History(props) {
  //let [info,setInfo]=useState('');
  const anchor=props.anchor;
  const dialog=props.dialog;

  const self={
    getHistory:(name)=>{
      props.history(name,(his)=>{
        console.log(his);
        //console.log(dialog);
        dialog.set((<Version  list={his} />), "");
        dialog.show();
      });
     
    },
  }

  useEffect(() => {
    //setInfo('Done');
  }, []);

  return (
    <Row>
      <Col lg={8} className="pt-2" >
        <Badge bg="info">{anchor.name}</Badge>{' '}
        <Badge bg="info" className="mr-1">{anchor.protocol.type}</Badge>{' '}
        <Badge bg="info" className="mr-1">owner:{anchor.owner}</Badge>{' '}
      </Col>
      <Col lg={4} className="pt-2 text-end" >
        <Button size="md" variant="light" onClick={()=>{
          self.getHistory(anchor.name);
        }} >History</Button>
      </Col>
    </Row>
  );
}
export default History;