import { Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import PUB from '../lib/pub';

function Update(props) {
  let [info, setInfo] = useState('');
  let [lock, setLock] = useState(false);
  let [show, setShow] = useState({ data: true, app: false, lib: false, other: false });

  let [cat, setCat] = useState('data');
  let [raw, setRaw] = useState('');
  let [content, setContent] = useState('');
  let [ver, setVer] = useState('1.0.0');
  let [format, setFormat] = useState('json');
  let [tpl, setTpl] = useState('');
  let [libs, setLibs] = useState([]);
  let [type, setType] = useState(false);

  let [pass, setPass] = useState('');
  let [index, setIndex] = useState(0);
  let [accounts, setAccounts] = useState([]);
  let [amount, setAmount] = useState(0);         //Account coin amount

  const target = props.anchor;

  const self = {
    onUpdate: (ev) => {
      const p = self.getProtocol();
      const ctx = !type ? raw : content;
      const acc = accounts[index];

      //console.log({ name: target, raw: ctx, protocol: p, account: acc, password: pass });
      
      PUB.decodeEncryFile(acc, pass, (pair) => {
        //console.log(pair);
        if (pair.error) {
          setLock(false);
          setInfo(pair.error);
          return false;
        }
        PUB.writeToChian(target, p, ctx, pair, (res) => {
          //console.log(res);
          if(res.step==="InBlock"){
            setLock(false);
          }
          setInfo(res.message);
        });
      });

    },
    rawChange: (ev) => {
      setRaw(ev.target.value);
    },
    versionChange: (ev) => {
      setVer(ev.target.value);
    },
    formatChange: (ev) => {
      setFormat(ev.target.value);
    },
    tplChange: (ev) => {
      setTpl(ev.target.value);
    },
    libChange: (ev) => {
      const str = ev.target.value;
      try {
        const arr = JSON.parse(str);
        //console.log(arr);
        setLibs(arr);
      } catch (error) {

      }
    },
    fileChange: (ev) => {
      const fa = ev.target.files[0];
      //console.log(fa);
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(e.target.result);
      }
      reader.readAsText(fa);
    },
    typeChange: (ev) => {
      setType(!type);
    },
    passChange: (ev) => {
      setPass(ev.target.value);
    },
    accountSelect: (ev) => {
      const index = parseInt(ev.target.value);
      setIndex(index);
      self.balance(index);
    },
    catSelect: (ev) => {
      const cat = ev.target.value;
      setCat(cat);
      self.render(cat);
      if (cat === "app" || cat === "lib") setFormat("js");
      if (cat === "data") setFormat("json");
    },
    balance: (index) => {
      const accs = PUB.getAccounts();
      PUB.balance(accs[index].address, (res) => {
        setAmount(parseInt(res.free * 0.000000000001).toLocaleString());
        //console.log(res);
      });
    },
    render: (cat) => {
      const nshow = {}
      for (var k in show) nshow[k] = false;
      if (nshow[cat] === undefined) nshow.other = true;
      nshow[cat] = true;
      //console.log(nshow);
      setShow(nshow);
    },
    getProtocol: () => {
      const p = { type: cat, fmt: format }
      switch (cat) {
        case 'data':
          break;
        case 'app':
          if (ver) p.ver = ver;
          if (tpl) p.tpl = tpl;
          if (libs.length !== 0) p.lib = libs;
          break;
        case 'lib':
          if (ver) p.ver = ver;
          if (libs.length !== 0) p.lib = libs;
          break;
        default:
          break;
      }

      return p;
    },
  }
  useEffect(() => {
    const accs = PUB.getAccounts();
    setAccounts(accs);
    self.balance(0);
  }, []);

  return (
    <Row hidden={props.hidden}>
      <Col md={10} lg={10} xl={10} xxl={10} className='pt-2'>
        <Form.Control
          size="md"
          type="file"
          disabled={!type || lock} 
          hidden={!type}
          placeholder="Select file..."
          onChange={(ev) => { self.fileChange(ev) }}
        />
      </Col>
      <Col md={2} lg={2} xl={2} xxl={2} className='pt-2'>
        <Form.Group controlId="formBasicCheckbox"
          onChange={(ev) => { self.typeChange(ev) }} >
          <Form.Check disabled={lock} type="checkbox" label="File" className='pt-2' />
        </Form.Group>
      </Col>
      <Col md={12} lg={12} xl={12} xxl={12} className='pt-1'>
        <Form.Control as="textarea"
          rows={3}
          disabled={type || lock}
          hidden={type}
          placeholder="Raw data..."
          onChange={(ev) => {
            self.rawChange(ev)
          }} />
      </Col>
      <Col md={2} lg={2} xl={2} xxl={2} className='pt-3'>Type</Col>
      <Col md={5} lg={5} xl={5} xxl={5} className='pt-2'>
        <Form.Select disabled={lock} onChange={(ev) => { self.catSelect(ev) }}>
          <option value={'data'} >data</option>
          <option value={'app'} >app</option>
          <option value={'lib'} >lib</option>
        </Form.Select>
      </Col>

      <Col md={2} lg={2} xl={2} xxl={2} className='pt-3'>Format</Col>
      <Col md={3} lg={3} xl={3} xxl={3} className='pt-2'>
        <Form.Control
          size="md"
          type="text"
          disabled={lock}
          placeholder="As js"
          value={format}
          onChange={(ev) => {
            self.formatChange(ev);
          }}
        />
      </Col>
      <Col md={2} lg={2} xl={2} xxl={2} className='pt-3' hidden={!(show.app || show.lib)}>Libs</Col>
      <Col md={5} lg={5} xl={5} xxl={5} className='pt-2' hidden={!(show.app || show.lib)}>
        <Form.Control
          size="md"
          type="text"
          disabled={lock}
          placeholder="JSON format"
          onChange={(ev) => {
            self.libChange(ev);
          }}
        />
      </Col>
      <Col md={2} lg={2} xl={2} xxl={2} className='pt-3' hidden={!(show.app)}></Col>
      <Col md={3} lg={3} xl={3} xxl={3} className='pt-2' hidden={!(show.app)}></Col>
      <Col md={2} lg={2} xl={2} xxl={2} className='pt-3' hidden={!(show.app)}>Template</Col>
      <Col md={5} lg={5} xl={5} xxl={5} className='pt-2' hidden={!(show.app)}>
        <Form.Control
          size="md"
          type="text"
          disabled={lock}
          placeholder="React, node.js ..."
          onChange={(ev) => {
            self.tplChange(ev);
          }}
        />
      </Col>

      <Col md={2} lg={2} xl={2} xxl={2} className='pt-3' hidden={!(show.app || show.lib)}>Version</Col>
      <Col md={3} lg={3} xl={3} xxl={3} className='pt-2' hidden={!(show.app || show.lib)}>
        <Form.Control
          size="md"
          type="text"
          disabled={lock}
          placeholder="As 1.0.2"
          value={ver}
          onChange={(ev) => {
            self.versionChange(ev);
          }}
        />
      </Col>

      <Col md={2} lg={2} xl={2} xxl={2} className='pt-3'>Account</Col>
      <Col md={6} lg={6} xl={6} xxl={6} className='pt-2'>
        <Form.Select disabled={lock} onChange={(ev) => { self.accountSelect(ev) }}>
          {accounts.map((item, index) => (
            <option value={index} key={index}>{item.address}</option>
          ))}
        </Form.Select>
      </Col>
      <Col md={4} lg={4} xl={4} xxl={4} className='pt-3'>{amount} unit</Col>
      <Col md={2} lg={2} xl={2} xxl={2} className='pt-3'>Password</Col>
      <Col md={6} lg={6} xl={6} xxl={6} className='pt-2'>
        <Form.Control
          size="md"
          type="password"
          disabled={lock}
          placeholder="Password to write..."
          onChange={(ev) => {
            self.passChange(ev);
          }}
        />
      </Col>
      <Col md={4} lg={4} xl={4} xxl={4} className='pt-2 text-end'>
        <Button
          size="md"
          variant="primary"
          disabled={lock}
          onClick={(ev) => {
            setLock(true);
            self.onUpdate(ev)
          }}
        > To Chian </Button>
      </Col>
      <Col md={12} lg={12} xl={12} xxl={12} className='pt-2 text-end'>{info}</Col>
    </Row>
  );
}
export default Update;