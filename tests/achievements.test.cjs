const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const api=fs.existsSync(require('node:path').join(__dirname,'../achievements.js'))?require('../achievements.js'):{};
const catalog={prefectures:[{id:'13',name:'東京都',group:'關東'},{id:'12',name:'千葉縣',group:'關東'}],castles:[{id:'54',name:'大阪城',group:'大阪府'}],hotels:[{id:'omo7osaka',name:'OMO7 大阪',group:'OMO'}]};
const trip=(id,status='旅遊回憶',dateEnd='2025-01-01')=>({id,country:'日本',title:id,status,dateEnd,spots:[{name:'東京迪士尼樂園'}],stay:[{name:'OMO7 大阪'}],days:[{items:[{text:'大阪城'}]}]});
const record=id=>({tripId:id,prefectures:[{id:'12',kind:'spot',text:'東京迪士尼樂園'}],castles:[{id:'54',kind:'day',text:'大阪城'}],hotels:[{id:'omo7osaka',kind:'stay',text:'OMO7 大阪'}]});
test('achievement module is available',()=>assert.equal(typeof api.summarize,'function'));
test('repeat visits count once and preserve links to both source trips',()=>{
 const r=api.summarize([trip('a'),trip('b')],catalog,[record('a'),record('b')],'2026-10-19');
 assert.equal(r.prefectures.completed,1);assert.equal(r.prefectures.percent,50);
 assert.equal(r.prefectures.items[0].state,'unvisited');assert.equal(r.prefectures.items[1].visits.length,2);
 assert.equal(r.castles.completed,1);assert.equal(r.hotels.completed,1);
});
test('future, stale planned, missing dates, and non-Japan never become completed',()=>{
 for(const [t,state] of [[trip('a','旅遊回憶','2027-01-01'),'planned'],[trip('a','即將出發'),'pending'],[trip('a','旅遊回憶',null),'pending']]){
  const r=api.summarize([t],catalog,[record('a')],'2026-10-19');
  assert.equal(r.prefectures.completed,0);assert.equal(r.prefectures.items[1].state,state);
 }
 assert.equal(api.summarize([{...trip('a'),country:'韓國'}],catalog,[record('a')],'2026-10-19').hotels.completed,0);
});
test('meals and sightseeing do not qualify as a hotel stay; changed evidence requires review',()=>{
 const t=trip('a');t.stay=[];t.days[0].items.push({text:'OMO7 大阪'});
 const r=api.summarize([t],catalog,[record('a')],'2026-10-19');
 assert.equal(r.hotels.completed,0);assert.equal(r.hotels.items[0].state,'pending');
 assert.ok(r.issues.some(x=>x.reason.includes('資料已變更')));
});
test('completed visit takes precedence over later planned or uncertain visit',()=>{
 const r=api.summarize([trip('a'),trip('b','即將出發','2027-01-01')],catalog,[record('a'),record('b')],'2026-10-19');
 assert.equal(r.hotels.completed,1);assert.equal(r.hotels.planned,0);
 assert.equal(r.hotels.items[0].visits.length,2);
});
test('unknown records and ambiguous accommodation never inflate totals',()=>{
 const rec=record('a');rec.hotels=[{id:'unknown',kind:'stay',text:'OMO7 大阪'}];rec.uncertain=['TOMAMU：住宿館別未記錄'];
 const r=api.summarize([trip('a')],catalog,[rec],'2026-10-19');
 assert.equal(r.hotels.completed,0);assert.equal(r.hotels.total,1);assert.ok(r.issues.length>=1);
});
test('unmapped Japanese trips are visible for maintenance, not silently assumed visited',()=>{
 const r=api.summarize([trip('new')],catalog,[],'2026-10-19');
 assert.equal(r.prefectures.completed,0);assert.ok(r.issues.some(x=>x.tripId==='new'));
});
test('render escapes itinerary text and exposes progress and trip links',()=>{
 const t={...trip('a'),title:'<img src=x onerror=alert(1)>'};
 const html=api.render([t],catalog,[record('a')],'2026-10-19');
 assert.ok(!html.includes('<img'));assert.ok(html.includes('&lt;img'));
 assert.ok(html.includes('#/trip/a'));assert.ok(html.includes('<progress'));assert.ok(html.includes('<details'));
});

test('published dataset has complete unique catalogs and valid itinerary evidence',()=>{
 const vm=require('node:vm'),path=require('node:path'),ctx={window:{}};
 for(const f of ['data/trips.js','data/achievement-catalog.js','data/achievement-visits.js'])vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..',f),'utf8'),ctx);
 const {TRIPS:trips,ACHIEVEMENT_CATALOG:c,ACHIEVEMENT_VISITS:records}=ctx.window;
 assert.equal(c.prefectures.length,47);assert.equal(c.castles.length,100);
 for(const type of ['prefectures','castles','hotels'])assert.equal(new Set(c[type].map(x=>x.id)).size,c[type].length);
 assert.equal(new Set(records.map(r=>r.tripId)).size,records.length);
 for(const r of records)for(const type of ['prefectures','castles','hotels'])for(const e of r[type])assert.ok(c[type].some(x=>x.id===e.id),r.tripId+' '+e.id);
 const result=api.summarize(trips,c,records,'2026-10-19');
 assert.ok(result.issues.every(x=>!x.reason.includes('資料已變更')&&!x.reason.includes('尚未建立')));
 assert.equal(result.prefectures.completed,20);assert.equal(result.castles.completed,7);assert.equal(result.hotels.completed,6);
 assert.equal(result.castles.items.find(x=>x.id==='53').state,'completed','二條城 from daily itinerary');
 assert.equal(result.prefectures.items.find(x=>x.id==='12').state,'completed','Disneyland is in Chiba');
 assert.equal(result.prefectures.items.find(x=>x.id==='41').state,'unvisited','passing through Saga is not a visit');
 assert.equal(result.hotels.items.find(x=>x.id==='tomamu-tower').state,'unvisited','ambiguous TOMAMU must not select Tower');
 assert.equal(result.hotels.items.find(x=>x.id==='risonaretomamu').state,'unvisited');
 assert.equal(result.hotels.items.find(x=>x.id==='omo7kochi').state,'pending');
 assert.ok(!c.hotels.some(x=>/guam|guguan|bali|asuka/.test(x.id)),'overseas/unopened excluded');
});
