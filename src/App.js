
import { useState,useEffect,useCallback} from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/api';

import { Container } from 'react-bootstrap';
import Header from './structure/header';
import Footer from './structure/footer';

function App() {
  return (
    <Container>
      <Header></Header>
      <div id="container"></div>
      <Footer></Footer>
    </Container>
  );
}

export default App;
