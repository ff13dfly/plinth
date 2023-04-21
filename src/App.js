
import { useState,useEffect} from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/api';
import { anchorJS } from "./lib/anchor";
//import * as easyRun from "./lib/easy";

import { Container,Row,Col } from 'react-bootstrap';
import Header from './structure/header';
import Stage from './structure/stage';
import Dock from './structure/dock';
import Page from './structure/page';
import Footer from './structure/footer';
import Dialog from './structure/dialog';
import { Config } from './config/default.js';

import {easyRun} from "./lib/easy";

const tpl={
  account:"account",
  server:"server",
  publish:"publish",
  setting:"setting",
};

const self={
  prepare:(node,ck)=>{
    try {
        //console.log({node});
        const provider = new WsProvider(node);
        ApiPromise.create({ provider: provider }).then((api) => {
            if(!anchorJS.set(api)){
                console.log('Error anchor node.');
            }
            anchorJS.setKeyring(Keyring);
            return ck && ck();
        });
    } catch (error) {
        return ck && ck(error);
    }
  },
};

function App() {
  //let [router,setRouter]=useState('');
  //let [show,setShow]=useState(false);
  let [page,setPage]=useState('');
  
  const interaction={
    showPage:(target)=>{
      console.log(target);
      setPage((<Page router={target} show={true} close={interaction.closePage}/>));
    },
    closePage:()=>{

    },
    showDialog:(title,ctx)=>{

    },
    hideDailog:()=>{

    },
  };

  useEffect(() => {
    //console.log('Load cApp here');

    const server="ws://127.0.0.1:9944";
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
    self.prepare(server,()=>{
      // const linker_full_caller="anchor://full_caller/?hello=world&me=fuu";
      
      // easyRun(linker_full_caller,API,(result)=>{
      //     console.log(result);
      // });
    });
  }, []);

  return (
    <Container>
      <Header interaction={interaction}/>
      {page}
      <Container id={Config.ID.stage} fluid>
        <Row>
          <Col md={10} lg={10} xl={10} xxl={10} className="pt-2" >
            <Stage />
          </Col>
          <Col md={2} lg={2} xl={2} xxl={2} className="pt-2 d-none d-md-block d-lg-block d-xl-block  d-xl-block" >
            <Dock />
          </Col>
          
        </Row>
      </Container>
      <Footer interaction={interaction} />
      <Dialog />
    </Container>
  );
}

export default App;
