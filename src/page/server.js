import { Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect,useState} from 'react';

import STORAGE from '../lib/storage.js';
import { Config } from '../config/default.js';

function Server(props) {

  let [info,setInfo]=useState('');
  let [nnode,setNnode]=useState('');

  const self={
    onChange:(ev)=>{
      setInfo("");
      setNnode(ev.target.value);
    },
    onAdd:()=>{
      if(!self.nodeValid(nnode)){
        return setInfo("Invalid Anchor node.");
      }
      const list=STORAGE.getQueue(Config.map.nodes);
      console.log(list);
    },
    nodeValid:(str)=>{
      if(str.substr(0,5)==="ws://") return true;
      if(str.substr(0,6)==="wss://") return true;
      return false;
    },
    getCurrentServer:()=>{
      const cur=STORAGE.getKey(Config.map.current);
      return cur===null?Config.node:cur;
    },
  }

  useEffect(() => {
    const cur=self.getCurrentServer();
    console.log(cur);
    //console.log(STORAGE);
  }, []);

  return (
    <Row>
      <Col lg={10} xs={10} className="pt-2" >
        <Form.Control 
          size="sm" 
          type="text" 
          placeholder="Anchor node URL..." 
          onChange={(ev) => { self.onChange(ev) }}
        />
      </Col>
      <Col lg={2} xs={2} className="pt-2 text-end" >
        <Button 
          size="sm" 
          variant="primary" 
          onClick={()=>{
            self.onAdd()
          }}
        >Add</Button>
      </Col>
      <Col lg={12} xs={12} className="pt-2" >{info}</Col>
      <Col lg={12} xs={12} className="pt-2" ><hr /></Col>
    </Row>
  );
}
export default Server;