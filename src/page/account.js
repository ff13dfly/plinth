import { Row, Col, Form, Button, Badge } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PUB from '../lib/pub';

function Account(props) {
  let [list, setList] = useState([]);
  let [info, setInfo] = useState('');
  let [decode, setDecode] = useState('');
  let [encry, setEncry] = useState('');
  let [password, setPassword] = useState('');

  const self = {
    fileChange: (ev) => {
      const fa = ev.target.files[0];
      setDecode('');
      setInfo('');
      PUB.checkEncryFile(fa, (res) => {
        if (res.error) return setInfo(res.error);
        setEncry(res);
        return setInfo('Encoded account file loaded');
      });
    },
    passChange: (ev) => {
      setPassword(ev.target.value);
    },
    onStorage: (ev) => {
      //setDecode('');
      if (!encry) setInfo("No encry file");
      if (!password) return setDecode("No password to confirm");

      setInfo('');
      setDecode('Try to decode account file.');

      setTimeout(() => {
        PUB.decodeEncryFile(encry, password, (pair) => {
          if (pair.error) return setDecode(pair.error);

          PUB.setAccount(encry);
          setDecode('Storaged successful.');
          self.fresh();
        });
      }, 200);
    },
    onRemove:(index)=>{
      PUB.removeAccount(index);
      self.fresh();
    },
    fresh: () => {
      const accs = PUB.getAccounts();
      setList(accs);
    },
  }

  useEffect(() => {
    self.fresh();
  }, []);

  return (
    <Row>
      <Col lg={12} xs={12} >Storage your account encry file on localstorage. When try to use the accounts, need your password.</Col>
      <Col lg={5} xs={5} className="pt-2" >
        <Form.Control
          size="md"
          type="file"
          placeholder="Polkadot encry json file..."
          onChange={(ev) => { self.fileChange(ev) }}
        />
      </Col>
      <Col lg={5} xs={5} className="pt-2" >
        <Form.Control
          size="md"
          type="password"
          placeholder="Password to confirm..."
          onChange={(ev) => { self.passChange(ev) }}
        />
      </Col>
      <Col lg={2} xs={2} className="pt-2 text-end" >
        <Button
          size="md"
          variant="primary"
          onClick={(ev) => {
            self.onStorage(ev);
          }}
        >Storage</Button>
      </Col>
      <Col lg={5} xs={5} className="pt-2" >{info}</Col>
      <Col lg={5} xs={5} className="pt-2" >{decode}</Col>
      <Col lg={12} xs={12}>
        {list.map((item, index) => (
          <Row key={index}>
            <Col lg={1} xs={1} className="pt-1">
              <Button
                size="sm"
                variant="danger"
                onClick={(ev) => {
                  self.onRemove(index);
                }}
              > X </Button>
            </Col>
            <Col lg={11} xs={11} className="pt-2">
              <Badge bg="info">{item.meta.name}</Badge>{item.address}
            </Col>
          </Row>
        ))}
      </Col>
    </Row>
  );
}
export default Account;