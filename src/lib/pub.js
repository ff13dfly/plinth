import { Config } from '../config/default.js';
import STORAGE from './storage.js';

const PUB = {
    getCurrentServer: () => {
        const cur = STORAGE.getKey('current');
        return cur === null ? Config.node : cur;
    },
    getServerFav: () => {
        const svc = PUB.getCurrentServer();
        const favs = `${Config.prefix.fav}${svc}`;
        //console.log(STORAGE.getMap(svc));
        if (STORAGE.getMap(svc) === null) {
            const obj = {}
            obj[svc] = favs;
            STORAGE.setMap(obj);
        }
        return STORAGE.getQueue(svc);
    },
    setServerFav: (name) => {
        const svc = PUB.getCurrentServer();
        const list = PUB.getServerFav();
        if(list.length>=15) return {error:"Max of favs."};
        const nlist = [name];
        for (let i = 0; i < list.length; i++) if (list[i] !== name) nlist.push(list[i]);
        STORAGE.setKey(svc, nlist);
        return true;
    },
    removeServerFav: (name) => {
        const svc = PUB.getCurrentServer();
        const list = PUB.getServerFav();
        const nlist = [];
        for (let i = 0; i < list.length; i++) if (list[i] !== name) nlist.push(list[i]);
        STORAGE.setKey(svc, nlist);
    },

    checkEncryFile: (fa,ck) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const sign = JSON.parse(e.target.result);
                if (!sign.address || !sign.encoded) return ck && ck({error:'Error encry JSON file'}) ;
                if (sign.address.length !== 48) return ck && ck({error:'Error SS58 address'});
                if (sign.encoded.length !== 268) return ck && ck({error:'Error encoded verification'});
                return ck && ck(sign);
            } catch (error) {
               return ck && ck({error:'Not encry JSON file'});
            }
        }
        reader.readAsText(fa);
    },
    decodeEncryFile:(fa,pass,ck)=>{
        const anchorJS = window.AnchorJS;
        anchorJS.load(fa,pass,(pair)=>{
            return ck && ck(pair);
        });
    },
    getPublish: () => {
        return STORAGE.getQueue("publish");
    },
    setPublish:(name)=>{
        const list=STORAGE.getQueue("publish");
        const nlist=[name];
        for (let i = 0; i < list.length; i++){
            if(list[i]!==name) nlist.push(list[i]);
        }
        STORAGE.setKey("publish", nlist);
        return true;
    },
    removePublish:(index)=>{
        const list=STORAGE.getQueue("publish");
        const nlist=[];
        for (let i = 0; i < list.length; i++){
            if(i!==index) nlist.push(list[i]);
        }
        STORAGE.setKey("publish", nlist);
        return true;
    },
    checkAnchor:(name,ck)=>{
        const anchorJS = window.AnchorJS;
        anchorJS.search(name,(res)=>{
            if(res===false) return ck && ck();
            console.log(res);
        });
    },

    getAccounts: () => {
        return STORAGE.getQueue("accounts");
    },
    setAccount:(fa)=>{
        const list=STORAGE.getQueue("accounts");
        const nlist=[fa];
        for (let i = 0; i < list.length; i++){
            if(list[i].address!==fa.address) nlist.push(list[i]);
        }
        STORAGE.setKey("accounts", nlist);
        return true;
    },
    removeAccount:(index)=>{
        const list=STORAGE.getQueue("accounts");
        const nlist=[];
        for (let i = 0; i < list.length; i++){
            if(i!==index) nlist.push(list[i]);
        }
        STORAGE.setKey("accounts", nlist);
        return true;
    },
    inArray: (key, arr) => {
        for (let i = 0; i < arr.length; i++) if (arr[i] === key) return true;
        return false;
    },
}
export default PUB;