import { Container, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import { Config } from '../config/default.js';

import Setting from '../page/setting';
import Publish from '../page/publish';
import Account from '../page/account';
import Server from '../page/server';

import Error from '../component/error.js';
import Preter from '../lib/preter.js';
import STORAGE from '../lib/storage.js';

function Dock(props) {

  let [name, setName] = useState("");
  let [list, setList] = useState([]);
  const stage = props.stage;
  const dialog = props.dialog;
  const pages = {
    setting: {
      title: "Setting",
      content: <Setting />,
    },
    publish: {
      title: "Publish Management",
      content: <Publish />,
    },
    account: {
      title: "Account Management",
      content: <Account />,
    },
    server: {
      title: "Server Management",
      content: <Server />,
    },
  };
  //console.log(`Force id:${ukey}`);

  const self = {
    onChange: (ev) => {
      setName(ev.target.value);
    },
    onKeydown: (ev) => {
      if (ev.key === 'Enter') {
        self.load(name);
      }
    },
    load: (name) => {
      const APIs = stage.getAPIs();

      stage.set([<Error data={`Loading`} key={props.fresh}/>],true,true);

      const interaction={
        stage:stage,
        dialog:dialog,
      }
      setTimeout(()=>{
        Preter(name, APIs, interaction, {unique:props.fresh,remove:true}, (list) => {
          stage.set(list,true,true);
        });
      },500);
    },

    showDialog: (router) => {
      if (!pages[router]) return false;
      const tpl = pages[router];
      dialog.set(tpl.content, tpl.title);
      dialog.show();
    },
  };

  useEffect(() => {
    //console.log(props);
    const favs_list = STORAGE.getQueue("favs");
    setList(favs_list);
  }, []);

  return (
    <Container id={Config.ID.dock} className='vh-100 position-relative' >
      <Row className='vh-75'>
        <Col md={7} lg={7} xl={7} xxl={7} className="pt-2">
          Panel
        </Col>
        <Col md={5} lg={5} xl={5} xxl={5} className="pt-2 text-end">
          <Button size="sm" variant="light" onClick={() => { }} >Hide</Button>
        </Col>
        {list.map((item, index) => (
          <Col md={12} lg={12} xl={12} xxl={12} key={index} className="pt-2 d-grid gap-2">
            <Button size="sm" variant="info" onClick={() => {
              self.load(item)
            }} >{item}</Button>
          </Col>
        ))}
      </Row>
      <div className="position-absolute bottom-0 start-0 pb-4 vh-25 w-100 d-grid gap-2">
        <Row className="pb-4">
          <Col md={12} lg={12} xl={12} xxl={12} className="pt-2 d-grid gap-2">
            <Button size="sm" variant="light" onClick={() => {
              self.showDialog("account");
            }} >Account</Button>
          </Col>
          
          <Col md={12} lg={12} xl={12} xxl={12} className="pt-2 d-grid gap-2">
            <Button size="sm" variant="light" onClick={() => {
              self.showDialog("publish");
            }} >Publish</Button>
          </Col>
          <Col md={12} lg={12} xl={12} xxl={12} className="pt-2 d-grid gap-2">
            <Button size="sm" variant="light" onClick={() => {
              self.showDialog("server");
            }} >Server</Button>
          </Col>
          <Col md={12} lg={12} xl={12} xxl={12} className="pt-2 d-grid gap-2">
            <Button size="sm" variant="light" onClick={() => {
              self.showDialog("setting");
            }} >Setting</Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
export default Dock;