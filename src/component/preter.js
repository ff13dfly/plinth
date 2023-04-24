import { useEffect, useState } from 'react';

import Overview from '../component/overview.js';
import Detail from '../component/detail.js';
import Raw from '../component/raw.js';
import History from '../component/history.js';
import Error from '../component/error.js';

// props structure
const def = {
  name: "unique_anchor_name",
  API: {
    anchorJS: () => { },
    polkadot: () => { },
    easyProtocol: () => { },
  },
  stage: () => { },
}

function Preter(props){
  const name = props.name;
  const stage = props.stage;
  const API=props.API;
  const easyRun=API.easyProtocol.run;

  const linker = `anchor://${name}/`;
  easyRun(linker, API, (result) => {
    console.log(result);
    stage.clear();
    if (result.location && result.location[1] === 0) {
      stage.set(<Error data="No such anchor" />);
      stage.render();
      return false;
    }

    const anchor = result.data[`${result.location[0]}_${result.location[1]}`];
    stage.set(<Overview name={name} />);
    stage.set(<Detail anchor={anchor} />);
    stage.set(<Raw anchor={anchor} />);
    stage.set(<History anchor={anchor} />);
    stage.render();
  });

  return ("Loading");
}
export default Preter;