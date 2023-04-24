import { Row, Col, Button } from 'react-bootstrap';
import { useReducer} from 'react';
import STORAGE from '../lib/storage.js';

function Overview(props) {

  const [ _ , forceUpdate] = useReducer(x => x + 1, 0);

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
      setTimeout(forceUpdate,50);
    },
    remove:(name)=>{
      const nlist=[];
      for(let i=0;i<list.length;i++) if(list[i]!==name) nlist.push(list[i]);
      STORAGE.setKey("favs",nlist);

      if(props.stage) props.stage.force();
      setTimeout(forceUpdate,50);
    },

    inArray:(key,arr)=>{
      for(let i=0;i<arr.length;i++) if(arr[i]===key) return true;
      return false;
    },
  };

  return (
    <Row>
      <Col lg={8} className="pt-2" >{props.name}</Col>
      <Col lg={2} className="pt-2 text-end">
        <Button size="lg" variant="primary" onClick={()=>{
          self.add(props.name);
        }} hidden={self.inArray(props.name,list)}>Fav</Button>
        <Button size="lg" variant="primary" onClick={()=>{
          self.remove(props.name);
        }} hidden={!self.inArray(props.name,list)}>Unfav</Button>
      </Col>
      <Col lg={2} className="pt-2 text-end">
        <Button size="lg" variant="primary" onClick={()=>{}} >Run</Button>
      </Col>
    </Row>
  );
}
export default Overview;