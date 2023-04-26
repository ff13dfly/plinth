import { Form } from 'react-bootstrap';
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
        //previous=name;
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
      Preter(cname,APIs,stage,{unique:props.fresh},(list)=>{
        //stage.clear();
        stage.set(list,true,true);
        //stage.render();
      });
    },
  };

  useEffect(() => {

  }, []);

  return (
    <Form.Control 
      size="sm" 
      type="text" 
      placeholder="Anchor name..." 
      onChange={(ev) => { self.onChange(ev) }} 
      onKeyDown={(ev)=>{self.onKeydown(ev)}}
      //value={!previous?"":previous}
    />
  );
}
export default Search;