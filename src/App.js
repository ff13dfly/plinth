
import { useState,useEffect} from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/api';

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
