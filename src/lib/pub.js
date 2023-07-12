import { Config } from '../config/default.js';
import STORAGE from './storage.js';

const anchorJS = window.AnchorJS;
const PUB = {
    getCurrentServer: () => {
        const cur = STORAGE.getKey('current');
        return cur === null ? Config.node : cur;
    },
    getServerFav: () => {
        const svc = PUB.getCurrentServer();
        const favs = `${Config.prefix.fav}${svc}`;
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
        if (list.length >= 15) return { error: "Max of favs." };
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

    checkEncryFile: (fa, ck) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const sign = JSON.parse(e.target.result);
                if (!sign.address || !sign.encoded) return ck && ck({ error: 'Error encry JSON file' });
                if (sign.address.length !== 48) return ck && ck({ error: 'Error SS58 address' });
                if (sign.encoded.length !== 268) return ck && ck({ error: 'Error encoded verification' });
                return ck && ck(sign);
            } catch (error) {
                return ck && ck({ error: 'Not encry JSON file' });
            }
        }
        reader.readAsText(fa);
    },
    decodeEncryFile: (fa, pass, ck) => {
        anchorJS.load(fa, pass, (pair) => {
            return ck && ck(pair);
        });
    },
    getPublish: () => {
        return STORAGE.getQueue("publish");
    },
    setPublish: (name) => {
        const list = STORAGE.getQueue("publish");
        const nlist = [name];
        for (let i = 0; i < list.length; i++) {
            if (list[i] !== name) nlist.push(list[i]);
        }
        STORAGE.setKey("publish", nlist);
        return true;
    },
    removePublish: (index) => {
        const list = STORAGE.getQueue("publish");
        const nlist = [];
        for (let i = 0; i < list.length; i++) {
            if (i !== index) nlist.push(list[i]);
        }
        STORAGE.setKey("publish", nlist);
        return true;
    },
    checkAnchor: (name, ck) => {
        anchorJS.search(name, (res) => {
            if (res === false) return ck && ck();
            console.log(res);
        });
    },

    getAccounts: () => {
        return STORAGE.getQueue("accounts");
    },
    setAccount: (fa) => {
        const list = STORAGE.getQueue("accounts");
        const nlist = [fa];
        for (let i = 0; i < list.length; i++) {
            if (list[i].address !== fa.address) nlist.push(list[i]);
        }
        STORAGE.setKey("accounts", nlist);
        return true;
    },
    removeAccount: (index) => {
        const list = STORAGE.getQueue("accounts");
        const nlist = [];
        for (let i = 0; i < list.length; i++) {
            if (i !== index) nlist.push(list[i]);
        }
        STORAGE.setKey("accounts", nlist);
        return true;
    },
    writeToChian: (anchor, protocol, raw, pair, ck) => {
        if(!anchorJS.ready()) return setTimeout(() => {
            return PUB.writeToChian(pair, anchor, raw, JSON.stringify(protocol), ck);
        }, 200);
        anchorJS.write(pair, anchor, raw, JSON.stringify(protocol), ck);
    },
    balance: (address, ck) => {
        if(!anchorJS.ready()) return setTimeout(() => {
            return PUB.balance(address,ck);
        }, 200);
        return anchorJS.balance(address, ck);
    },
    owner: (address, ck) => {
        if(!anchorJS.ready()) return setTimeout(() => {
            return PUB.owner(address, ck);
        }, 200);
        return anchorJS.owner(address, ck);
    },
    history:(anchor,ck)=>{
        if(!anchorJS.ready()) return setTimeout(() => {
            return PUB.history(anchor,ck);
        }, 200);
        return anchorJS.history(anchor,(res)=>{
            if(res===false) return ck && ck({error:`No such Anchor "${anchor}"`});
            return ck && ck(res);
        });
    },
    inArray: (key, arr) => {
        for (let i = 0; i < arr.length; i++) if (arr[i] === key) return true;
        return false;
    },
    shortenAddress: (address, n) => {
        if (n === undefined) n = 10;
        return address.substr(0, n) + '...' + address.substr(address.length - n, n);
    },
}
export default PUB;