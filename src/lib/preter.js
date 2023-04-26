import Overview from '../component/overview.js';
import Detail from '../component/detail.js';
import Raw from '../component/raw.js';
import History from '../component/history.js';
import Error from '../component/error.js';
import Remove from '../component/remove.js';

const params={
  unique:undefined,    //key from up to force update 
  remove:false,     //wether show remove function
};

const Preter={
  auto:(name,APIs,stage,cfg,ck)=>{
    const list=[];
    const anchorJS=APIs.anchorJS;

    anchorJS.search(name,(anchor)=>{
      const ukey=!cfg.unique?0:cfg.unique;
      if(anchor===false){
        list.push(<Error data={`No such anchor "${name}"`}  key={ukey}/>);
        if(cfg.remove) list.push(<Remove name={name} stage={stage} key={ukey}/>);
        return ck && ck(list);
      }

      list.push(<Overview name={name} stage={stage} key={ukey}/>);
      list.push(<Detail anchor={anchor} key={ukey}/>);
      list.push(<Raw anchor={anchor} key={ukey}/>);
      list.push(<History anchor={anchor} key={ukey}/>);
      return ck && ck(list);
    });
  },

  group:(APIs)=>{

  },
};

export default Preter.auto;