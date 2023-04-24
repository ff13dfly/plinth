import { Container, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import { Config } from '../config/default.js';

import Setting from '../page/setting';
import Publish from '../page/publish';
import Account from '../page/publish';

import Preter from '../lib/preter.js';
import STORAGE from '../lib/storage.js';

function Dock(props) {

  let [name, setName] = useState("");
  let [list, setList] = useState([]);

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
  };

  const stage = props.stage;

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
      Preter(name, APIs, stage, props.key, (list) => {
        stage.clear();
        stage.set(list);
        stage.render();
      });
    },

    showDialog: (router) => {
      if (!pages[router]) return false;
      const tpl = pages[router];
      dialog.set(tpl.content, tpl.title);
      dialog.show();
    },
  };

  //const list=STORAGE.getQueue(Config.map.favs);
  //console.log(list);

  useEffect(() => {
    const list = STORAGE.getQueue("favs");
    setList(list);
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
        <Row>
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
              self.showDialog("setting");
            }} >Setting</Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
export default Dock;