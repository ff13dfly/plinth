//import { Row, Col } from 'react-bootstrap';
import { useState,useEffect} from 'react';

function CApp(props) {
  let [info,setInfo]=useState(props.loading?props.loading:"Loading...");

  const easy=props.easy;

  //params to cApp
  const cfg={
    container:props.id,
    from:null,
    params:{},
  };

  const APIs={

  }
  
  //console.log(props.id);

  useEffect(() => {
    console.log(easy);
    try {
      const cApp = new Function("API", "config", "errs", easy.code);
      if (cApp){
        //console.log(cApp);
        setInfo("");
        cApp(APIs,cfg, []);
      }
    } catch (error) {
      setInfo(JSON.stringify(error));
    }
  }, []);

  return (
    <div>
      <style>{easy.libs && easy.libs.css?easy.libs.css:''}</style>
      <script>{easy.libs && easy.libs.js?easy.libs.js:''}</script>
      <div id={props.id}>
        {info}
      </div>
    </div>
  );
}
export default CApp;