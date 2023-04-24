
import { Container,Row,Col } from 'react-bootstrap';
import { useState,useEffect } from 'react';

import Header from './structure/header';
import Stage from './structure/stage';
import Dock from './structure/dock';
import Page from './structure/page';
import Footer from './structure/footer';
import Dialog from './structure/dialog';
import Search from './structure/search';

import { Config } from './config/default.js';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/api';
import { anchorJS } from "./lib/anchor.js";
import { easyRun } from "./lib/easy";

function App() {
  //Common APIs
  let [info,setInfo]=useState("");
  
  let API={
    anchorJS: anchorJS,
    polkadot: null,
    easyProtocol:{
      run:easyRun,
    },
  };
  
  const prepare=(node,ck)=>{
    if(API.polkadot!==null) return ck && ck();
    setInfo(`Linking to ${node}`);
    try {
        //console.log({node});
        const provider = new WsProvider(node);
        ApiPromise.create({ provider: provider }).then((pokAPI) => {
            
            API.polkadot=pokAPI;
            if(!anchorJS.set(pokAPI)){
              setInfo(`Failed to link Anchor Network`);
            }
            anchorJS.setKeyring(Keyring);
            setInfo(`Linked successful!`);
            return ck && ck();
        });
    } catch (error) {
        return ck && ck(error);
    }
  };

  //Stage actions
  let [stageList,setStageList]=useState([]);
  let [dancer,setDancer]=useState(<Stage content={stageList}/>);
  const stage={
    set:(view)=>{
      stageList.push(view);
    },
    render:()=>{
      setDancer(<Stage content={stageList}/>);
    },
    clear:()=>{
      setStageList([]);
    },
    //FIXME get APIs here is not proper, but better that global `window.$API`
    getAPIs:()=>{   
      return API;
    },
  }

  //page actions
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

  //Dialog actions
  let [showDialog,setshowDialog]=useState(false);
  let [title,setTitle]=useState('');
  let [content,setContent]=useState('');
  const dialog={
    show:()=>{
      setshowDialog(true);
    },
    hide:()=>{
      setshowDialog(false);
    },
    set:(ctx,title)=>{
      if(ctx !==undefined) setContent(ctx);
      if(title !==undefined) setTitle(title);
    },
  };
  useEffect(() => {
    prepare(Config.node,(res)=>{
      console.log('here');
      if(API.polkadot!==null){
        anchorJS.block((block,hash)=>{
          setInfo(`Last Finalized ${block}`);
        },true);
      }
    });
  }, []);

  return (
    <Container>
      <Header interaction={interaction}/>
      {page}
      <Container id={Config.ID.stage} fluid>
        <Row>
          <Col md={12} lg={12} xl={12} xxl={12} className="pt-2" ></Col>
          <Col md={10} lg={10} xl={10} xxl={10} className="pt-2" >
            <Search stage={stage} info={info}/>
            {dancer}
          </Col>
          <Col md={2} lg={2} xl={2} xxl={2} className="pt-2 d-none d-md-block d-lg-block d-xl-block  d-xl-block" >
            <Dock stage={stage} dialog={dialog} />
          </Col>
        </Row>
      </Container>
      <Footer interaction={interaction} />
      <Dialog show={showDialog} funs={dialog} title={title} content={content}/>
    </Container>
  );
}

export default App;
