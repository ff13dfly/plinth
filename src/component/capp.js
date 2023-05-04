//import { Row, Col } from 'react-bootstrap';
import { useState,useEffect} from 'react';
import { anchorJS } from "../lib/anchor";
import { easyRun } from "../lib/easy";

function CApp(props) {
  let [info,setInfo]=useState(props.loading?props.loading:"Loading...");

  const easy=props.easy;

  //params to cApp
  const input={
    container:props.id,
    from:null,
    params:{},
  };

  const APIs={
    anchorJS:anchorJS,
    easy:easyRun,
  }
  
  //console.log(props.id);
  //FIXME, lib of JS need to `eval`

  useEffect(() => {
    console.log(easy);
    try {
      const pa='API',pb='input',pc='errs';

      //!important, closure function to isolate the namespace.
      //!important
      const str=`;(function(${pa},${pb},${pc}){${easy.code}})(${pa},${pb},${pc})`;
      const cApp = new Function(pa, pb, pc,str);
      if (cApp){
        setInfo("");
        cApp(APIs,input, easy.error);
      }
    } catch (error) {
      console.log(error);
      setInfo(JSON.stringify({error}));
    }
  }, []);

  return (
    <div>
      <style>{easy.libs && easy.libs.css?easy.libs.css:''}</style>
      <script>{easy.libs && easy.libs.js?easy.libs.js:''}</script>
      <div id={props.id}>{info}</div>
    </div>
  );
}
export default CApp;