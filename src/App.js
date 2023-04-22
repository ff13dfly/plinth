
import { useState,useEffect} from 'react';

import { Container,Row,Col } from 'react-bootstrap';
import Header from './structure/header';
import Stage from './structure/stage';
import Dock from './structure/dock';
import Page from './structure/page';
import Footer from './structure/footer';
import Dialog from './structure/dialog';
import Search from './structure/search';
import { Config } from './config/default.js';

// const tpl={
//   account:"account",
//   server:"server",
//   publish:"publish",
//   setting:"setting",
// };

function App() {

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
  }


  useEffect(() => {
  }, []);

  return (
    <Container>
      <Header interaction={interaction}/>
      {page}
      <Container id={Config.ID.stage} fluid>
        <Row>
          <Col md={10} lg={10} xl={10} xxl={10} className="pt-2" >
            <Search stage={stage}/>
            {dancer}
          </Col>
          <Col md={2} lg={2} xl={2} xxl={2} className="pt-2 d-none d-md-block d-lg-block d-xl-block  d-xl-block" >
            <Dock dialog={dialog} stage={stage}/>
          </Col>
        </Row>
      </Container>
      <Footer interaction={interaction} />
      <Dialog show={showDialog} funs={dialog} title={title} content={content}/>
    </Container>
  );
}

export default App;
