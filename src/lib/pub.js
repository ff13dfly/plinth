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
        const nlist = [name];
        for (let i = 0; i < list.length; i++) if (list[i] !== name) nlist.push(list[i]);
        STORAGE.setKey(svc, nlist);
    },
    removeServerFav: (name) => {
        const svc = PUB.getCurrentServer();
        const list = PUB.getServerFav();
        const nlist = [];
        for (let i = 0; i < list.length; i++) if (list[i] !== name) nlist.push(list[i]);
        STORAGE.setKey(svc, nlist);
    },

    checkEncryFile: (fa) => {

    },
    inArray: (key, arr) => {
        for (let i = 0; i < arr.length; i++) if (arr[i] === key) return true;
        return false;
    },
}
export default PUB;