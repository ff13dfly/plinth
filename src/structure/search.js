import { Row, Col,Form } from 'react-bootstrap';
import { useEffect,useState} from 'react';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/api';
import { anchorJS } from "../lib/anchor.js";
import { easyRun } from "../lib/easy";
import { Config } from "../config/default";

import Overview from '../component/overview.js';
import Detail from '../component/detail.js';
import Raw from '../component/raw.js';

let wsAPI=null;

function Search(props) {

  let [name,setName]=useState("");
  let [info,setInfo]=useState("");

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

      const API={
        "common":{
            "latest":anchorJS.latest,
            "target":anchorJS.target,
            "history":anchorJS.history,
            "owner":anchorJS.owner,
            "subcribe":anchorJS.subcribe,
            "block":anchorJS.block,
        },
      };
      self.prepare(Config.node,()=>{
        const linker=`anchor://${cname}/`;
        
        easyRun(linker,API,(result)=>{
            console.log(result);
            stage.clear();
            if(result.location && result.location[1]===0){
              stage.set(<Overview name={cname}/>);
              stage.render();
              return false;
            }

            const anchor=result.data[`${result.location[0]}_${result.location[1]}`];
            stage.set(<Overview name={cname}/>);
            stage.set(<Detail anchor={anchor}/>);
            stage.set(<Raw anchor={anchor}/>);
            stage.render();
        });
      });
      
    },
    prepare:(node,ck)=>{
      if(wsAPI!==null) return ck && ck();
      setInfo(`Linking to ${node}`);
      try {
          //console.log({node});
          const provider = new WsProvider(node);
          ApiPromise.create({ provider: provider }).then((api) => {
              
              wsAPI=api;
              if(!anchorJS.set(api)){
                setInfo(`Failed to link Anchor Network`);
              }
              anchorJS.setKeyring(Keyring);
              setInfo(`Linked successful!`);
              return ck && ck();
          });
      } catch (error) {
          return ck && ck(error);
      }
    },
  };

  useEffect(() => {
    self.prepare(Config.node,(res)=>{
      if(wsAPI!==null){
        anchorJS.block((block,hash)=>{
          setInfo(`Last Finalized ${block}`);
        },true);
      }
    });
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
      <Col md={4} lg={4} xl={4} xxl={4}  className="pt-3 text-end">{info}</Col>
    </Row>
  );
}
export default Search;