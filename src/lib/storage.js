// const keys = {
//     jsonFile: 'js_file_name',
//     anchorList: 'anchor_list',
//     startNode: 'start_node',
//     historyNode: 'history_node',
// };

const map={};
const persist={};		//通过支付串化，进行数据保存

//FIXME, storage is not safe for iframe
const STORAGE={
	dump:()=>{
		return {
			storage:map,
			persist:persist,
		};
	},
	setMap:(obj) => {
		//console.log(obj);
		for(var k in obj){
			map[k]=obj[k];
		}
		return true;
	},
	getMap:(str)=>{
		if(!map[str]) return null;
		return true;
	},

	removeKey:(name) => {
		if(!map[name]) return false;
		const key=map[name];
		localStorage.removeItem(key);
		return true;
	},


	setPersist:(name,obj) => {
		persist[name]=JSON.stringify(obj);
	},
	getPersist:(name) => {
		if(!persist[name]) return null;
		return JSON.parse(persist[name]);
	},
	removePersist:(name) =>{
		delete persist[name];
		return true;
	},

	//key-value
	getKey:(name) => {
		if(!map[name]) return null;
		const key = map[name];
		const str = localStorage.getItem(key);
		if(str === null) return null;
		return JSON.parse(str);
	},
	setKey:(name,obj) => {
		//console.log(name);
		//console.log(JSON.stringify(map));
		if(!map[name]) return false;
		const key=map[name];
		localStorage.setItem(key,JSON.stringify(obj));
	},
	//key-hash
	getNode:(name,node)=>{
		const data=STORAGE.getKey(name);
		if(data===null) return false;
		if(!data[node]) return null;
		return data[node];
	},
	setNode:(name,node,val)=>{
		const data=STORAGE.getKey(name);
		if(data===null) return false;
		data[node]=val;
		STORAGE.setKey(name,data);
	},

	//key-queue
	getQueue:(name)=>{
		//console.log(map);
		//console.log(name);
		if(!map[name]) return [];
		const key=map[name];
		//console.log(key);
		const str=localStorage.getItem(key);
		//console.log(str);
		if(str===null) return [];
		return JSON.parse(str);
	},
	footQueue:(name,atom)=>{
		if(!map[name]) return [];
		const key=map[name];
		const qu=STORAGE.getQueue(name);
		qu.push(atom);
		localStorage.setItem(key,JSON.stringify(qu));
		return true;
	},
	headQueue:(name,atom)=>{
		if(!map[name]) return [];
		const key=map[name];
		const qu=STORAGE.getQueue(name);
		qu.unshift(atom);
		localStorage.setItem(key,JSON.stringify(qu));
		return true;
	},
};

export default STORAGE;