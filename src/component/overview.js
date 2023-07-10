import { Row, Col, Badge, Button } from 'react-bootstrap';
import { useReducer} from 'react';
import STORAGE from '../lib/storage.js';
import PUB from '../lib/pub.js';

import CApp from './capp.js';
import Debug from './debug.js';

function Overview(props) {

  const [ _ , forceUpdate] = useReducer(x => x + 1, 0);

  const stage=props.stage;
  const anchor=props.anchor;
  const easy=props.easy;

  //const list=STORAGE.getQueue("favs");
  const list=PUB.getServerFav();

  //console.log(easy);

  const self={
    add:(name)=>{
      //TODO,check the limitation of max favs
      
      PUB.setServerFav(name);
      stage.force({dancer:true});
      setTimeout(forceUpdate,50);
    },
    remove:(name)=>{
      PUB.removeServerFav(name);
      stage.force({dancer:true});
      setTimeout(forceUpdate,50);
    },
    run:()=>{
      stage.set(<CApp 
        loading="Running..." 
        id="cApp_container"
        easy={easy}
      />,true,true);
    },
  };

  return (
    <Row>
      <Col lg={8} className="pt-2" ><h2><Badge bg="warning">{easy.location[1]}</Badge>{'   '+anchor.name}</h2></Col>
      <Col lg={2} className="pt-2 text-end">
        <Button size="md" variant="primary" onClick={()=>{
          self.add(anchor.name);
        }} hidden={PUB.inArray(anchor.name,list)}>Fav</Button>
        <Button size="md" variant="primary" onClick={()=>{
          self.remove(anchor.name);
        }} hidden={!PUB.inArray(anchor.name,list)}>Unfav</Button>
      </Col>
      <Col lg={2} className="pt-2 text-end">
        <Button 
          size="md" 
          variant="primary" 
          onClick={()=>{
            self.run();
          }} 
          disabled={
            (anchor.protocol && anchor.protocol.type==="app") || (anchor.protocol && anchor.protocol.call)?false:true}
        >Run</Button>
      </Col>
      <Col lg={12} className="pt-2">
        { (easy.debug && !easy.debug.disabled) ? (<Debug data={easy.debug}/>): ""}
      </Col>
    </Row>
  );
}
export default Overview;