const {test}=require('node:test');const assert=require('node:assert/strict');
const M=require('../trip-maintenance.js');
const trip={id:'demo',title:'旅程',dateStart:'2026-10-01',dateEnd:'2026-10-01',days:[{day:1,date:'10/1',theme:'城市',items:[{time:'早上',text:'博物館'}]}],spots:[{name:'博物館',day:1,latlng:[25,121],hours:'09–17',desc:'門票100',ref:{title:'文章',url:'https://example.com/article'}}],mapArt:'img/demo.jpg',pass:{name:'票券',price:'100'},food:[],budget:[]};
const clone=x=>JSON.parse(JSON.stringify(x));
test('existing image with no verified record is not claimed synchronized',()=>{
 assert.equal(M.mapState(trip,{}).status,'untracked');
 const meta={maps:{demo:{baselineSnapshot:M.mapSnapshot(trip),imagePath:trip.mapArt,aligned:false}}};
 assert.equal(M.mapState(trip,meta).status,'unconfirmed');
});
test('editing daily itinerary invalidates a confirmed image even without changing a version field',()=>{
 const meta={maps:{demo:{baselineSnapshot:M.mapSnapshot(trip),imagePath:trip.mapArt,aligned:true}}};
 assert.equal(M.mapState(trip,meta).status,'aligned');
 const changed=clone(trip);changed.days[0].items[0].text='海洋館';
 assert.equal(M.mapState(changed,meta).status,'stale');
});
test('changing image path requires confirming the new image',()=>{
 const meta={maps:{demo:{baselineSnapshot:M.mapSnapshot(trip),imagePath:'img/old.jpg',aligned:true}}};
 assert.equal(M.mapState(trip,meta).status,'stale');
});
test('ticket price changes invalidate check, reordering spots does not',()=>{
 const target=M.targets(trip).find(x=>x.key==='pass');
 const record={checkedAt:'2026-09-07',sources:[{title:'官網',url:'https://example.com'}],snapshot:clone(target.value)};
 const meta={checks:{demo:{pass:record}}};
 assert.equal(M.checkState(trip,'pass',meta).status,'recorded');
 const changed=clone(trip);changed.pass.price='120';
 assert.equal(M.checkState(changed,'pass',meta).status,'changed');
 assert.equal(M.checkState(trip,'spot:博物館',meta).status,'unrecorded');
});
test('reference verification is separate from opening hours and ticket information',()=>{
 const key='spot-ref:博物館',snapshot=M.targets(trip).find(x=>x.key===key).value;
 const meta={checks:{demo:{[key]:{checkedAt:'2026-09-07',sources:[snapshot],snapshot}}}};
 assert.equal(M.checkState(trip,key,meta).status,'recorded');
 assert.equal(M.checkState(trip,'spot:博物館',meta).status,'unrecorded');
 assert.equal(M.summary(trip,meta).recorded,1);
});
test('snapshot comparison is insensitive to property insertion order',()=>{
 assert.equal(M.stableStringify({a:1,b:{d:2,c:3}}),M.stableStringify({b:{c:3,d:2},a:1}));
});
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const cli=require('../tools/maintenance.cjs');
test('CLI preserves records, captures source snapshot, rejects false dates and requires image confirmation',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'travel-records-'));
 try{
  fs.mkdirSync(path.join(root,'data'));fs.mkdirSync(path.join(root,'img'));
  fs.writeFileSync(path.join(root,'data/trips.js'),'window.TRIPS = '+JSON.stringify([trip]));fs.writeFileSync(path.join(root,'img/demo.jpg'),'fixture');
  cli.run('init',{},root);assert.equal(cli.read(root).meta.maps.demo.aligned,false);
  assert.throws(()=>cli.run('record-map',{trip:'demo',version:'v1',date:'2026-09-07'},root));
  const args={trip:'demo',target:'pass',date:'2026-02-30','source-url':'https://example.com','source-title':'官網'};
  assert.throws(()=>cli.run('record-check',args,root));
  cli.run('record-check',{...args,date:'2026-09-07'},root);cli.run('init',{},root);
  assert.equal(cli.run('status',{},root)[0].checks.recorded,1);
  cli.run('record-map',{trip:'demo',version:'v1',date:'2026-09-07','confirm-aligned':true},root);
  assert.equal(cli.run('status',{},root)[0].map,'aligned');
  fs.writeFileSync(path.join(root,'img/demo.jpg'),'new image');assert.equal(cli.run('status',{},root)[0].map,'image-changed');
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('spot check remains attached by name after array reordering',()=>{
 const t=clone(trip);t.spots.push({...clone(t.spots[0]),name:'另一景點'});
 const key='spot:博物館',value=M.targets(t).find(x=>x.key===key).value;
 const meta={checks:{demo:{[key]:{checkedAt:'2026-09-07',sources:[{title:'官網',url:'https://example.com'}],snapshot:value}}}};
 t.spots.reverse();assert.equal(M.checkState(t,key,meta).status,'recorded');t.spots.find(x=>x.name==='博物館').hours='10–18';assert.equal(M.checkState(t,key,meta).status,'changed');
});
