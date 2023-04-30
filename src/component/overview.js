import { Row, Col, Badge, Button } from 'react-bootstrap';
import { useReducer} from 'react';
import STORAGE from '../lib/storage.js';

import CApp from './capp.js';
import Debug from './debug.js';

function Overview(props) {

  const [ _ , forceUpdate] = useReducer(x => x + 1, 0);

  const stage=props.stage;
  const anchor=props.anchor;
  const easy=props.easy;

  const list=STORAGE.getQueue("favs");

  //console.log(anchor);
  console.log(easy);

  const self={
    add:(name)=>{
      
      if(self.inArray(name,list)){
        const nlist=[name];
        for(let i=0;i<list.length;i++) if(list[i]!==name) nlist.push(list[i]);
        STORAGE.setKey("favs",nlist);
      }else{
        STORAGE.footQueue("favs",name);
      }
      stage.force({dancer:true});
      setTimeout(forceUpdate,50);
    },
    remove:(name)=>{
      const nlist=[];
      for(let i=0;i<list.length;i++) if(list[i]!==name) nlist.push(list[i]);
      STORAGE.setKey("favs",nlist);
      stage.force({dancer:true});
      setTimeout(forceUpdate,50);
    },

    inArray:(key,arr)=>{
      for(let i=0;i<arr.length;i++) if(arr[i]===key) return true;
      return false;
    },
    run:()=>{
      console.log(easy);

      //FIXME need to create a sandbox for cApp. Using `new Function with`.

      stage.set(<CApp 
        loading="Running..." 
        id="cApp_container" 
        app={easy.code}
        libs={easy.libs}
      />,true,true);
    },
  };

  return (
    <Row>
      <Col lg={8} className="pt-2" ><h2><Badge bg="warning">{easy.location[1]}</Badge>{'   '+anchor.name}</h2></Col>
      <Col lg={2} className="pt-2 text-end">
        <Button size="md" variant="primary" onClick={()=>{
          self.add(anchor.name);
        }} hidden={self.inArray(anchor.name,list)}>Fav</Button>
        <Button size="md" variant="primary" onClick={()=>{
          self.remove(anchor.name);
        }} hidden={!self.inArray(anchor.name,list)}>Unfav</Button>
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