
import { useState,useEffect,useCallback} from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/api';

import { Container } from 'react-bootstrap';
import Header from './structure/header';
import Stage from './structure/stage';
import Footer from './structure/footer';

function App() {
  return (
    <Container>
      <Header />
      <Stage />
      <Footer />
    </Container>
  );
}

export default App;
