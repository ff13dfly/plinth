import { Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import STORAGE from '../lib/storage.js';
import { Config } from '../config/default.js';

function Server(props) {

  let [info, setInfo] = useState('');
  let [more, setMore] = useState('');
  let [nnode, setNnode] = useState('');
  let [list, setList] = useState([]);
  let [index,setIndex] = useState(0);

  const self = {
    onChange: (ev) => {
      setInfo("");
      setNnode(ev.target.value);
    },
    onAdd: () => {
      if (!self.nodeValid(nnode)) {
        return setInfo("Invalid Anchor node.");
      }

      const nlist = [nnode];
      for (let i = 0; i < list.length; i++) {
        if (list[i] !== nnode) nlist.push(list[i]);
      }

      STORAGE.setKey("nodes", nlist);
      setList(nlist);
    },
    onSelect:(ev)=>{
      const index=parseInt(ev.target.value);
      setIndex(index);
    },
    onRemove: () => {
      if(index+2>list.length) return setMore(`Invalide index : ${index}`);
      const nlist=[];
      for (let i = 0; i < list.length; i++) {
        if(i!==index) nlist.push(list[i]);
      }
      STORAGE.setKey("nodes", nlist);
      setList(nlist);
    },
    onLink: () => {
      if(!list[index]) return setMore(`Invalide index : ${index}`);
      STORAGE.setKey("current", list[index]);

      const nlist=[list[index]];
      for (let i = 0; i < list.length; i++) {
        if(i!==index) nlist.push(list[i]);
      }
      STORAGE.setKey("nodes", nlist);
      if(!props.fresh) return setMore(`Set successful, please fresh the page.`);
      props.dialog.hide();
      props.fresh();
    },
    nodeValid: (str) => {
      if (str.substr(0, 5) === "ws://") return true;
      if (str.substr(0, 6) === "wss://") return true;
      return false;
    },
    getCurrentServer: () => {
      const cur = STORAGE.getKey('current');
      return cur === null ? Config.node : cur;
    },
  }

  useEffect(() => {
    const cur = self.getCurrentServer();
    console.log(cur);

    const svcs = STORAGE.getQueue("nodes");
    if (svcs.length === 0) svcs.push("ws://127.0.0.1:9944");
    setList(svcs);
  }, []);

  return (
    <Row>
      <Col lg={5} xs={5} className="pt-2" >
        <Row>
          <Col lg={12} xs={12} className="pt-2" >
            <Form.Control
              size="sm"
              type="text"
              placeholder="Anchor node URL..."
              onChange={(ev) => { self.onChange(ev) }}
            />
          </Col>
          <Col lg={8} xs={8} className="pt-2" >{info}</Col>
          <Col lg={4} xs={4} className="pt-2 text-end" >
            <Button
              size="sm"
              variant="primary"
              className='pt-2'
              onClick={() => {
                self.onAdd()
              }}
            >Add</Button>
          </Col>
        </Row>
      </Col>
      <Col lg={7} xs={7} className="pt-2" >
        <Row>
          
          <Col lg={10} xs={10} className="pt-2" >
            <Form.Select onChange={(ev) => { self.onSelect(ev) }}>
              {list.map((item, index) => (
                <option value={index} key={index}>{item}</option>
              ))}
            </Form.Select>
          </Col>
          <Col lg={2} xs={2} className="pt-2 text-end" >
            <Button
              size="md"
              variant="danger"
              onClick={() => {
                self.onRemove()
              }}
            >X</Button>
          </Col>
          <Col lg={8} xs={8} className="pt-2" >{more}</Col>
          <Col lg={4} xs={4} className="pt-2 text-end" >
            <Button
              size="md"
              variant="primary"
              onClick={() => {
                self.onLink()
              }}
            >Link</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
export default Server;