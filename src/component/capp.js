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

  const loadCSS=(code) => {
		var head = document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		var cmap = document.createTextNode(code);
		style.appendChild(cmap);
		head.appendChild(style);
		return true;
	};
  
  //console.log(props.id);
  //FIXME, lib of JS need to `eval`

  useEffect(() => {
    //console.log(easy);
    if(easy.libs && easy.libs.js){

      var frame = document.getElementById('react_frame');
      var iwind = frame.contentWindow;         
      //console.log(iwind);
      //iwind.appendChild();
      //iwind.eval("console.log('hello')");
      //frame.contentWindow.eval(easy.libs.js);

      var ele=document.createElement("div");
      ele.id = "root";
      iwind.document.body.appendChild(ele);
      iwind.eval(easy.libs.js);

      var head = iwind.document.getElementsByTagName('head')[0];
		  var style = iwind.document.createElement('style');
		  var cmap = iwind.document.createTextNode(easy.libs.css);
		  style.appendChild(cmap);
		  head.appendChild(style);


      // var ifrDoc = ifr.contentWindow || ifr.contentDocument;
      // if (ifrDoc.document) ifrDoc = ifrDoc.document;

      // var elem = ifrDoc.createElement("div");
      //     elem.innerHTML = "Demo Box";
      //     elem.style.width = "50px";
      //     elem.style.height = "50px";
      //     elem.style.position = "absolute";
      //     elem.style.background = "red";

      // ifrDoc.body.appendChild(elem);
      
      //eval(easy.libs.js);
      //loadCSS(easy.libs.css);
    }

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

  const map='#test_css{color:#FF0000}';

  return (
    <div>
      <style>{easy.libs && easy.libs.css?easy.libs.css:''}
        {map}
      </style>
      <div id="root"></div>
      <iframe src="" id="react_frame"></iframe>
      <div id="test_css">Hello world</div>
      <script>{easy.libs && easy.libs.js?easy.libs.js:''}</script>
      <div id={props.id}>{info}</div>
    </div>
  );
}
export default CApp;