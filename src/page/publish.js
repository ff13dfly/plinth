import { Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import PUB from '../lib/pub';

import Update from '../component/update';
import Mine from '../component/mine';
import Footprint from '../component/footprint';

function Publish(props) {

  let [info, setInfo] = useState('');
  let [list, setList] = useState([]);
  let [index, setIndex] = useState(0);
  let [disable,setDisable] = useState(true);
  let [history,setHistory]=useState('');
  let [target,setTarget]=useState('');

  const self = {
    onSelect: (ev) => {
      const index = parseInt(ev.target.value);
      //console.log(index);
      setIndex(index);
      const pubs = PUB.getPublish();
      const anchor=pubs[index];
      self.history(anchor);
      self.owner(anchor);
      setTarget(anchor);
    },
    fresh: (index) => {
      const pubs = PUB.getPublish();
      setTarget(pubs[0]);
      setList(pubs);
      setHistory('');

      if(pubs.length!==0){
        setDisable(false);
        const anchor=pubs[0];
        self.history(anchor);
        self.owner(anchor);
      }else{
        setDisable(true);
      }
    },
    owner:(anchor)=>{
      PUB.owner(anchor,(res)=>{
        //console.log(res);
        setInfo(PUB.shortenAddress(res));
      });
    },
    history:(anchor)=>{
      PUB.history(anchor,(res)=>{
        if(res.error) return setHistory(res.error);
        setHistory(<Footprint list={res}/>)
      });
    },
    onRemove: () => {
      PUB.removePublish(index);
      self.fresh();
    },
  }

  useEffect(() => {
    self.fresh();
  }, []);

  return (
    <Row>
      <Col lg={4} xs={4} className="pt-2">
        <Form.Select onChange={(ev) => { self.onSelect(ev) }}>
          {list.map((item, index) => (
            <option value={index} key={index}>{item}</option>
          ))}
        </Form.Select>
      </Col>
      <Col lg={2} xs={2} className="pt-2" >
        <Button
          size="md"
          variant="danger"
          onClick={(ev) => {
            self.onRemove(ev);
          }}
        > X </Button>
      </Col>
      <Col lg={6} xs={6} className="pt-3">{info}</Col>

      <Col lg={9} xs={9} className="pt-2">
        <Update hidden={disable} anchor={target}/>
      </Col>
      <Col lg={3} xs={3} className="pt-2">{history}</Col>
      <Col lg={12} xs={12}><hr /></Col>
      <Col lg={12} xs={12} className="pt-2" >
        <Mine fresh={self.fresh} />
      </Col>
    </Row>
  );
}
export default Publish;