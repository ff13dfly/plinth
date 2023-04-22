import { Container,Row, Col, Button } from 'react-bootstrap';
import { useEffect,useState} from 'react';

import { Config } from '../config/default.js';
import { anchorJS } from "../lib/anchor.js";

import Setting from '../page/setting';
import Publish from '../page/publish';
import Account from '../page/publish';

import Overview from '../component/overview.js';
import Detail from '../component/detail.js';
import Raw from '../component/raw.js';

function Dock(props) {

  let [name,setName]=useState("");

  const dialog=props.dialog;
  const pages={
    setting:{
      title:"Setting",
      content:<Setting />,
    },
    publish:{
      title:"Publish Management",
      content:<Publish />,
    },
    account:{
      title:"Account Management",
      content:<Account />,
    },
  };

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
      stage.clear();
      anchorJS.search(name,(anchor)=>{
        //console.log(anchor);
        if(anchor===false) return stage.render();
        stage.set(<Overview name={name}/>);
        stage.set(<Detail anchor={anchor}/>);
        stage.set(<Raw anchor={anchor}/>);
        stage.render();
      });
    },

    showDialog:(router)=>{
      if(!pages[router]) return false;
      const tpl=pages[router];
      dialog.set(tpl.content,tpl.title);
      dialog.show();
    },
  };

  useEffect(() => {
    //setInfo('Stage');
  }, []);

  return (
    <Container id={Config.ID.dock} className='vh-100 position-relative' >
      <Row className='vh-75'>
        <Col md={7} lg={7} xl={7} xxl={7}  className="pt-2">
          Panel
        </Col>
        <Col md={5} lg={5} xl={5} xxl={5}  className="pt-2">
            <Button size="sm" variant="info" onClick={()=>{}} >Hide</Button>
        </Col>
        <Col md={12} lg={12} xl={12} xxl={12} className="pt-2 d-grid gap-2">
          <Button size="sm" variant="warning" onClick={()=>{
            self.load("full_caller")
          }} >full_caller</Button>
        </Col>
        
        <Col md={12} lg={12} xl={12} xxl={12} className="pt-2 d-grid gap-2">
          <Button size="sm" variant="warning" onClick={()=>{
            self.load("full_app")
          }} >full_app</Button>
        </Col>
        <Col md={12} lg={12} xl={12} xxl={12} className="pt-2 d-grid gap-2">
          <Button size="sm" variant="warning" onClick={()=>{
            self.load("uniswap")
          }} >uniswap</Button>
        </Col>
        
      </Row>
        <div className="position-absolute bottom-0 start-0 pb-4 vh-25 w-100 d-grid gap-2">
          <Row>
            <Col md={12} lg={12} xl={12} xxl={12} className="pt-2 d-grid gap-2">
              <Button size="sm" variant="info" onClick={()=>{
                self.showDialog("account");
              }} >Account</Button>
            </Col>
            <Col md={12} lg={12} xl={12} xxl={12} className="pt-2 d-grid gap-2">
              <Button size="sm" variant="info" onClick={()=>{
                self.showDialog("publish");
              }} >Publish</Button>
            </Col>
            <Col md={12} lg={12} xl={12} xxl={12} className="pt-2 d-grid gap-2">
              <Button size="sm" variant="info" onClick={()=>{
                self.showDialog("setting");
              }} >Setting</Button>
            </Col>  
          </Row>
        </div>
    </Container>
  );
}
export default Dock;