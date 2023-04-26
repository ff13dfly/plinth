import { Row, Col, Button } from 'react-bootstrap';
//import { useReducer} from 'react';
import STORAGE from '../lib/storage.js';

function Overview(props) {

  const anchor=props.anchor;

  const list=STORAGE.getQueue("favs");

  const self={
    add:(name)=>{
      
      if(self.inArray(name,list)){
        const nlist=[name];
        for(let i=0;i<list.length;i++) if(list[i]!==name) nlist.push(list[i]);
        STORAGE.setKey("favs",nlist);
      }else{
        STORAGE.footQueue("favs",name);
      }
      if(props.stage) props.stage.force();
    },
    remove:(name)=>{
      const nlist=[];
      for(let i=0;i<list.length;i++) if(list[i]!==name) nlist.push(list[i]);
      STORAGE.setKey("favs",nlist);

      if(props.stage) props.stage.force();
    },

    inArray:(key,arr)=>{
      for(let i=0;i<arr.length;i++) if(arr[i]===key) return true;
      return false;
    },
  };

  return (
    <Row>
      <Col lg={8} className="pt-2" >{anchor.name}</Col>
      <Col lg={2} className="pt-2 text-end">
        <Button size="lg" variant="primary" onClick={()=>{
          self.add(anchor.name);
        }} hidden={self.inArray(anchor.name,list)}>Fav</Button>
        <Button size="lg" variant="primary" onClick={()=>{
          self.remove(anchor.name);
        }} hidden={!self.inArray(anchor.name,list)}>Unfav</Button>
      </Col>
      <Col lg={2} className="pt-2 text-end">
        <Button 
          size="lg" 
          variant="primary" 
          onClick={()=>{}} 
          disabled={
            (anchor.protocol && anchor.protocol.type==="app") || (anchor.protocol && anchor.protocol.call)?false:true}
        >Run</Button>
      </Col>
    </Row>
  );
}
export default Overview;