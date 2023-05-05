import { Form } from 'react-bootstrap';
import { useEffect,useState} from 'react';

import Preter from '../lib/preter.js';

function Search(props) {

  let [name,setName]=useState("");
  const stage=props.stage;
  const dialog = props.dialog;
  
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
      const interaction={
        stage:stage,
        dialog:dialog,
      }
      Preter(cname,APIs,interaction,{unique:props.fresh},(list)=>{
        stage.set(list,true,true);
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
    />
  );
}
export default Search;