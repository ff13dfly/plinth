import { Row, Col, Button } from 'react-bootstrap';
import { useEffect} from 'react';
import STORAGE from '../lib/storage.js';

function Remove(props) {

  const list=STORAGE.getQueue("favs");

  const self={
    remove:(name)=>{
      console.log(name);
      const nlist=[];
      for(let i=0;i<list.length;i++) if(list[i]!==name) nlist.push(list[i]);
      STORAGE.setKey("favs",nlist);

      if(props.stage) props.stage.force();
    },
  }

  useEffect(() => {
    //setInfo('Done');
  }, []);

  return (
    <Row>
      <Col lg={12} className="pt-2">
        <Button size="lg" variant="primary" onClick={()=>{
          self.remove(props.name);
        }}>Remove</Button>
      </Col>
    </Row>
  );
}
export default Remove;