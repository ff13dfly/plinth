import Overview from '../component/overview.js';
import Detail from '../component/detail.js';
import Raw from '../component/raw.js';
import History from '../component/history.js';
import Error from '../component/error.js';
import Remove from '../component/remove.js';

const params={
  unique:undefined,     //key from up to force update 
  remove:false,         //wether show remove function
};

const Preter={
  auto:(name,APIs,interaction,cfg,ck)=>{
    const list=[];
    const anchorJS=APIs.anchorJS;
    const easyProtocol=APIs.easyProtocol;

    const stage=interaction.stage;
    const dialog=interaction.dialog;

    //console.log(anchorJS);
    anchorJS.search(name,(anchor)=>{
      //console.log(anchor);
      const ukey=!cfg.unique?0:cfg.unique;
      if(anchor===false){
        list.push(<Error data={`No such anchor "${name}"`}  key={ukey}/>);
        if(cfg.remove) list.push(<Remove name={name} stage={stage} key={ukey}/>);
        return ck && ck(list);
      }

      //console.log(APIs);
      const linker=`anchor://${name}`;
      const eAPI={
        common:{
          "latest":anchorJS.latest,
          "target":anchorJS.target,
          "history":anchorJS.history,
          "owner":anchorJS.owner,
          "subcribe":anchorJS.subcribe,
          //"block":anchorJS.block,
        },
      }

      easyProtocol.run(linker,eAPI,(easy)=>{
        list.push(<Overview anchor={anchor} easy={easy} stage={stage} key={ukey}/>);
        list.push(<Detail anchor={anchor} easy={easy} key={ukey}/>);
        list.push(<History anchor={anchor} easy={easy} key={ukey} dialog={dialog} history={anchorJS.history}/>);
        list.push(<Raw anchor={anchor} easy={easy} key={ukey}/>);
        return ck && ck(list);
      });

    });
  },

  group:(APIs)=>{

  },
};

export default Preter.auto;