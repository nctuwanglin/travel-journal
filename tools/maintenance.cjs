#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const M=require('../trip-maintenance.js');
const root=path.resolve(__dirname,'..');
function read(root){const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'data/trips.js'),'utf8'),ctx);const file=path.join(root,'data/maintenance.js');const meta=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8').replace(/^window\.TRIP_MAINTENANCE\s*=\s*/,'').replace(/;\s*$/,'')):{schemaVersion:1,maps:{},checks:{}};return{trips:ctx.window.TRIPS,meta,file};}
function today(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei'}).format(new Date());}
function date(s){if(!/^\d{4}-\d{2}-\d{2}$/.test(s||'')||!Number.isFinite(Date.parse(s))||new Date(s).toISOString().slice(0,10)!==s||s>today())throw Error('日期必須是真實且不晚於今天的 YYYY-MM-DD');return s;}
function hash(root,t){const file=path.resolve(root,t.mapArt||'');if(!file.startsWith(root+path.sep))throw Error('圖片必須位於專案內');return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');}
function run(command,args={},base=root){const {trips,meta,file}=read(base);const trip=trips.find(t=>t.id===args.trip);
 if(command==='status'){return trips.map(t=>({id:t.id,map:t.mapArt?(meta.maps[t.id]&&meta.maps[t.id].imageSha256!==hash(base,t)?'image-changed':M.mapState(t,meta).status):'none',checks:M.summary(t,meta)}));}
 if(command==='init'){for(const t of trips)if(t.mapArt&&!meta.maps[t.id])meta.maps[t.id]={version:null,updatedAt:null,prompt:null,baselineRecordedAt:today(),baselineSnapshot:M.mapSnapshot(t),imagePath:t.mapArt,imageSha256:hash(base,t),aligned:false};}
 else if(command==='record-map'){if(!trip||!trip.mapArt)throw Error('找不到有行程圖的旅程');if(!args['confirm-aligned']||!args.version)throw Error('需提供 --version 並在人工確認圖片一致後使用 --confirm-aligned');meta.maps[trip.id]={version:args.version,updatedAt:date(args.date),prompt:args['prompt-file']?fs.readFileSync(args['prompt-file'],'utf8'):null,baselineRecordedAt:today(),baselineSnapshot:M.mapSnapshot(trip),imagePath:trip.mapArt,imageSha256:hash(base,trip),aligned:true};}
 else if(command==='record-check'){if(!trip)throw Error('找不到旅程');const target=M.targets(trip).find(t=>t.key===args.target);if(!target)throw Error('找不到查核目標，請使用 targets --trip ID');const url=new URL(args['source-url']);if(!['http:','https:'].includes(url.protocol)||!args['source-title'])throw Error('需提供 HTTP(S) 來源網址與標題');meta.checks[trip.id]??={};meta.checks[trip.id][target.key]={checkedAt:date(args.date),sources:[{title:args['source-title'],url:url.href}],snapshot:target.value};}
 else if(command==='targets'){if(!trip)throw Error('找不到旅程');return M.targets(trip).map(({key,label})=>({key,label}));}
 else throw Error('用法：maintenance.cjs init | status | targets --trip ID | record-map | record-check（參見維護指南）');
 fs.writeFileSync(file+'.tmp','window.TRIP_MAINTENANCE = '+JSON.stringify(meta,null,2)+';\n');fs.renameSync(file+'.tmp',file);return{saved:file};
}
if(require.main===module){try{const [command,...argv]=process.argv.slice(2),args={};for(let i=0;i<argv.length;i++){if(!argv[i].startsWith('--'))throw Error('參數格式錯誤');const k=argv[i].slice(2);args[k]=k==='confirm-aligned'?true:argv[++i];}console.log(JSON.stringify(run(command,args),null,2));}catch(e){console.error(e.message);process.exitCode=1;}}
module.exports={run,read};
