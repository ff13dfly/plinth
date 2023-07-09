import { Row, Col,Form,Button } from 'react-bootstrap';
import { useEffect,useState} from 'react';
import PUB from '../lib/pub';

function Account(props) {

  let [info,setInfo]=useState('');
  let [decode,setDecode]=useState('');
  let [encry,setEncry]=useState('');
  let [password,setPassword]=useState('');

  const self={
    fileChange: (ev) => {
      const fa = ev.target.files[0];
      setDecode('');
      setInfo('');
      PUB.checkEncryFile(fa,(res)=>{
        if(res===true){
          setEncry(fa);
          return setInfo('Encoded account file loaded');
        } 
        if(res.error) return setInfo(res.error);
        setInfo('Unexcept error');
      });
    },
    passChange:(ev)=>{
      setPassword(ev.target.value);
    },
    onStorage:(ev)=>{
      setDecode('');
      if(!encry) setInfo("No encry file");
      if(!password) return setDecode("No password to confirm");
      console.log(password);
    }
  }

  useEffect(() => {
    //setInfo('Done');
  }, []);

  return (
    <Row>
      <Col lg={12} xs={12} >Storage your account encry file on localstorage. When try to use the accounts, need your password.</Col>
      <Col lg={5} xs={5} className="pt-2" >
        <Form.Control
              size="md"
              type="file"
              placeholder="Polkadot encry json file..."
              onChange={(ev) => {self.fileChange(ev)}}
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
      <Col lg={12} xs={12} className="pt-4" >Account List</Col>
    </Row>
  );
}
export default Account;