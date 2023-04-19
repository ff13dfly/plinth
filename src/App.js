
import { useState,useEffect} from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/api';
import { anchorJS } from "./lib/anchor";
import { easyRun } from "./lib/easy";

import { Container } from 'react-bootstrap';
import Header from './structure/header';
import Stage from './structure/stage';
import Page from './structure/page';
import Footer from './structure/footer';
import Dialog from './structure/dialog';

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
    console.log('Load cApp here');
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
      const linker_full_caller="anchor://full_caller/?hello=world&me=fuu";
      
      easyRun(linker_full_caller,API,(result)=>{
          console.log(`-----------------result-----------------`);
          console.log(JSON.stringify(result));
      });
    });
  }, []);

  return (
    <Container>
      <Header interaction={interaction}/>
      {page}
      <Stage />
      <Footer interaction={interaction} />
      <Dialog />
    </Container>
  );
}

export default App;
