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
        stage.set(list);
        stage.render();
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