import { Row, Col,Form } from 'react-bootstrap';
import { useEffect,useState} from 'react';


import Overview from '../component/overview.js';
import Detail from '../component/detail.js';

import { anchorJS } from "../lib/anchor.js";

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
      
      anchorJS.search(name,(anchor)=>{
        stage.clear();
        stage.set(<Overview name={name}/>);
        stage.set(<Detail anchor={anchor}/>);
        stage.render();
      });
      
    },
  };

  useEffect(() => {
    //setInfo('Stage');
  }, []);

  return (
    <Row className='vh-75'>
      <Col md={9} lg={9} xl={9} xxl={9}  className="pt-2">
        <Form.Control size="sm" type="text" placeholder="Anchor name..." 
            onChange={(ev) => { self.onChange(ev) }} 
            onKeyDown={(ev)=>{self.onKeydown(ev)}} />
      </Col>
      <Col md={3} lg={3} xl={3} xxl={3}  className="pt-2"></Col>
    </Row>
  );
}
export default Search;