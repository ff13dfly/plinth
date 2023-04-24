import { Row, Col,Form } from 'react-bootstrap';
import { useEffect,useState} from 'react';

import Preter from '../lib/preter.js';


function Search(props) {

  let [name,setName]=useState("");
  const stage=props.stage;

  const self={
    onChange:(ev)=>{
      setName(ev.target.value);
    },
    onKeydown:(ev)=>{
      if(ev.key==='Enter'){
        self.load(name);
      }
    },
    load:(name)=>{
      const cname=name.trim();
      if(!name || !cname){
        stage.clear();
        stage.render();
        return false;
      }
      const APIs=stage.getAPIs();
      Preter(cname,APIs,(list)=>{
        stage.clear();
        for(let i=0;i<list.length;i++) stage.set(list[i]);
        stage.render();
      });
    },
  };

  useEffect(() => {

  }, []);

  return (
    <Row className='vh-75'>
      <Col md={2} lg={2} xl={2} xxl={2}  className="pt-2">
        <img src="logo.png" alt="logo" className='img-fluid' />
      </Col>
      <Col md={6} lg={6} xl={6} xxl={6}  className="pt-2">
        <Form.Control size="sm" type="text" placeholder="Anchor name..." 
            onChange={(ev) => { self.onChange(ev) }} 
            onKeyDown={(ev)=>{self.onKeydown(ev)}} />
      </Col>
      <Col md={4} lg={4} xl={4} xxl={4}  className="pt-3 text-end">{props.info}</Col>
    </Row>
  );
}
export default Search;