
import { Container,Row,Col } from 'react-bootstrap';
import { useState,useEffect } from 'react';
//import axios from 'axios';

import Header from './structure/header';
import Stage from './structure/stage';
import Dock from './structure/dock';
import Page from './structure/page';
import Footer from './structure/footer';
import Dialog from './structure/dialog';
import Search from './structure/search';

import { Config } from './config/default.js';

//import { easyRun } from "./lib/easy";
import STORAGE from './lib/storage';

const anchorJS = window.AnchorJS;   
const dot=window.Polkadot;
const easy=window.Easy;
const ApiPromise=dot.ApiPromise;
const WsProvider=dot.WsProvider;
const Keyring=dot.Keyring;
const easyRun=easy.easyRun;

//https://react-bootstrap.github.io/components/badge/

//add global vars
//https://create-react-app.dev/docs/adding-custom-environment-variables/

let  key_dock=0;
let  key_search=0;
let  key_dancer=0;

function App() {
  //init actions.
  STORAGE.setMap(Config.map);
  let [info,setInfo]=useState("");

  //Common APIs
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
        ApiPromise.create({ provider: provider,noInitWarn: true }).then((pokAPI) => {
            
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
  let [dancer,setDancer]=useState(<Stage content={stageList} key={key_dancer}/>);
  const stage={
    set:(view,fresh,clear)=>{
      if(clear) stageList=[];
      if(Array.isArray(view)){
        for(let i=0;i<view.length;i++)stageList.push(view[i]);
      }else{
        stageList.push(view);
      }
      if(fresh) stage.render();
    },
    render:()=>{
      setDancer(<Stage content={stageList} key={key_dancer}/>);
    },
    clear:()=>{
      setStageList([]);
    },

    //FIXME get APIs here is not proper, but better that global `window.$API`
    getAPIs:()=>{   
      return API;
    },
    force:(skip)=>{
      //console.log(`Force fresh`);
      //console.log(`Dock:${key_dock},Search:${key_search},Dancer:${key_dancer}.`)
      if(!skip || !skip.dock)key_dock++;
      if(!skip || !skip.search)key_search++;
      if(!skip || !skip.dancer)key_dancer++;
      stage.render();
    },
  }

  //page actions
  let [viewer,setViewer]=useState('');
  const page={
    show:(target)=>{
      console.log(target);
      setViewer((<Page router={target} show={true} close={dialog.closePage}/>));
    },
    close:()=>{

    },
  };

  //Dialog actions
  let [showDialog,setshowDialog]=useState(false);
  let [title,setTitle]=useState('');
  let [content,setContent]=useState('');
  let [callback,setCallback]=useState('');
  const dialog={
    show:()=>{
      setshowDialog(true);
    },
    hide:()=>{
      setTitle('');
      setContent('');
      setCallback('');
      setshowDialog(false);
    },
    set:(ctx,title,fun)=>{
      if(ctx !==undefined) setContent(ctx);
      if(title !==undefined) setTitle(title);
      if(fun!==undefined) setCallback(fun);
    },
  };

  const self={
    getCurrentServer:()=>{
      const cur=STORAGE.getKey(Config.map.current);
      return cur===null?Config.node:cur;
    },
  }

  useEffect(() => {
    const cur_node=self.getCurrentServer();
    prepare(cur_node,(res)=>{
      if(API.polkadot!==null){
        anchorJS.subcribe((list,block)=>{
          setInfo(`Lastest Finalized : ${block.toLocaleString()}`);
        },true);
      }
    });
  }, []);

  return (
    <Container>
      <Header page={page}/>
      {viewer}
      <Container id={Config.ID.stage} fluid>
        <Row>
          <Col md={12} lg={12} xl={12} xxl={12} className="pt-2" ></Col>
          <Col md={10} lg={10} xl={10} xxl={10} className="pt-2" >
            <Row className='vh-75'>
              <Col xs={4} md={3} lg={2} xl={2} xxl={2}  className="pt-2">
                <img src="logo.png" alt="Plinth logo" className='img-fluid' />
                <small className='text-secondary'>Your Web3.0</small>
              </Col>
              <Col xs={8} md={5} lg={6} xl={6} xxl={6}  className="pt-2">
                <Search stage={stage} dialog={dialog} key={key_search}/>
              </Col>
              <Col md={4} lg={4} xl={4} xxl={4}  className="pt-3 text-end">
              {info}
              </Col>
            </Row>
            {dancer}
          </Col>
          <Col md={2} lg={2} xl={2} xxl={2} className="pt-2 d-none d-md-block d-lg-block d-xl-block  d-xl-block" >
            <Dock stage={stage} dialog={dialog} key={key_dock} />
          </Col>
        </Row>
      </Container>
      <Footer page={page} />
      <Dialog show={showDialog} funs={dialog} title={title} content={content} callback={callback}/>
    </Container>
  );
}

export default App;