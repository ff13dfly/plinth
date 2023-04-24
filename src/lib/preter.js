import Overview from '../component/overview.js';
import Detail from '../component/detail.js';
import Raw from '../component/raw.js';
import History from '../component/history.js';
import Error from '../component/error.js';

const Preter={
  auto:(name,APIs,ck)=>{
    const list=[];
    const anchorJS=APIs.anchorJS;

    anchorJS.search(name,(anchor)=>{
      if(anchor===false){
        list.push(<Error data="No such anchor"/>);
        return ck && ck(list);
      } 
      list.push(<Overview name={name}/>);
      list.push(<Detail anchor={anchor}/>);
      list.push(<Raw anchor={anchor}/>);
      list.push(<History anchor={anchor}/>);
      return ck && ck(list);
    });
  },

  group:(APIs)=>{

  },

};

export default Preter.auto;