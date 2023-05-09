//import { Row, Col } from 'react-bootstrap';
import { useState,useEffect} from 'react';
//import { anchorJS } from "../lib/anchor";
//import { easyRun } from "../lib/easy";

function CApp(props) {
  let [info,setInfo]=useState(props.loading?props.loading:"Loading...");

  const easy=props.easy;

  //params to cApp
  const input={
    container:props.id,
    from:null,
    params:{},
  };

  const easyProtocol=window.easy;
  const APIs={
    anchorJS:window.anchorJS,
    easy:easyProtocol.easyRun,
  }

  // const loadCSS=(code) => {
	// 	var head = document.getElementsByTagName('head')[0];
	// 	var style = document.createElement('style');
	// 	var cmap = document.createTextNode(code);
	// 	style.appendChild(cmap);
	// 	head.appendChild(style);
	// 	return true;
	// };

  const self={
    loadReact:(js,css,code)=>{
      console.log(code)
      const frame = document.getElementById('react_frame');
      const iwind = frame.contentWindow;

      const ele=document.createElement("div");
      ele.id = "root";
      iwind.document.body.appendChild(ele);
      iwind.eval(js+code);

      const head = iwind.document.getElementsByTagName('head')[0];
		  const style = iwind.document.createElement('style');
		  const cmap = iwind.document.createTextNode(css);
		  style.appendChild(cmap);
		  head.appendChild(style);
    },
    loadcApp:(code,js,css)=>{
      
    },
  }

  useEffect(() => {
    const tg=easy.location;
    const anchor=easy.data[`${tg[0]}_${tg[1]}`]
    if(anchor && anchor.protocol && anchor.protocol.tpl==="react"){
      
      self.loadReact(easy.libs.js,easy.libs.css,easy.code);
    }else{
      try {
        //!important, closure function to isolate the namespace.
        const pa='API',pb='input',pc='errs';
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
    }
  }, []);

  //const map='#test_css{color:#FF0000}';
  const h=840;
  const cmap={
    "height":h+"px",
  }
  return (
    
    <div>
      <style>{easy.libs && easy.libs.css?easy.libs.css:''}</style>
      <iframe id="react_frame" className="w-100" style={cmap}></iframe>
    </div>
  );
}
export default CApp;