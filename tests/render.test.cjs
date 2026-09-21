const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
function load(){
  let filter;
  const visible=new Set();
  const map={setView(){return this;},fitBounds(){},invalidateSize(){},removeLayer(m){visible.delete(m);}};
  const legend={addEventListener(_,f){filter=f;},querySelectorAll(){return[];}};
  const ctx={window:{addEventListener(){}}, location:{protocol:'file:'},setTimeout(){},
    document:{getElementById(id){return id==='maplegend'?legend:{};},querySelectorAll(){return[];}}};
  ctx.L={map(){return map;},tileLayer(){return{addTo(){}};},divIcon(x){return x;},marker(ll,opts){return{
    ll,number:Number(opts.icon.html.match(/>(\d+)</)[1]),addTo(){visible.add(this);return this;},bindPopup(){return this;},on(){return this;}
  };}};
  ctx.window.L=ctx.L;
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root,'data/trips.js'),'utf8'),ctx);
  vm.runInContext(fs.readFileSync(path.join(root,'trip-maintenance.js'),'utf8'),ctx);
  vm.runInContext(fs.readFileSync(path.join(root,'data/maintenance.js'),'utf8'),ctx);
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  const inline=html.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
  vm.runInContext(inline.split('/* ---------- boot ---------- */')[0]+'window.review={utilCols,buildDetailMap,tripMatches,foodTable,footprintGroups};})();',ctx);
  return{groups:ctx.window.review.footprintGroups,food:ctx.window.review.foodTable,trips:ctx.window.TRIPS,render:ctx.window.review.utilCols,map(t,day){
    ctx.window.review.buildDetailMap(t);
    filter({target:{closest(){return{getAttribute(){return String(day);}};}}});
    return [...visible].map(m=>m.number).sort((a,b)=>a-b);
  }};
}
test('legacy app and weather objects expose readable information, not object coercion',()=>{
 const {trips,render}=load(); const text=render(trips.find(t=>t.id==='hokkaido-2013'));
 assert.ok(!text.includes('[object Object]'));
 for(const value of ['Google Maps','景點導航','-8–2°C','隆冬嚴寒']) assert.ok(text.includes(value),value);
});
test('all twenty legacy practical cards remain present',()=>{
 const {trips,render}=load(); let n=0;
 for(const t of trips) for(const tip of t.tips||[]){const text=render(t);assert.ok(text.includes(tip.title),`${t.id}: ${tip.title}`);for(const item of tip.items) assert.ok(text.includes(item));n++;}
 assert.ok(n>=20);
});
test('Tohoku Day 2 shows gorge and museum, not Day 5 aquarium',()=>{
 const x=load();assert.deepEqual(x.map(x.trips.find(t=>t.id==='tohoku-2026'),2),[1,2]);
});
test('Busan Day 1 shows its first chronological marker',()=>{
 const x=load();assert.deepEqual(x.map(x.trips.find(t=>t.id==='busan-2026'),1),[1]);
});

test('planned restaurants without ratings do not invent stars or undefined accessibility text',()=>{
 const x=load();const html=x.food({id:'fixture',food:[{name:'餐廳',area:'札幌',note:'預定晚餐'}]});
 assert.ok(html.includes('預定晚餐'));assert.ok(!html.includes('undefined'));assert.ok(!html.includes('☆☆☆☆☆'));
});

test('food recommendation combines notes, ratings and reference in one cell for every trip',()=>{
 const x=load();
 for(const t of x.trips){
  const html=x.food(t);
  assert.equal((html.match(/<th>/g)||[]).length,3,t.id);
  const rows=[...html.matchAll(/<tr>(<td[\s\S]*?)<\/tr>/g)];
  assert.equal(rows.length,(t.food||[]).length,t.id);
  rows.forEach((row,i)=>{
   const cells=[...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)];
   assert.equal(cells.length,3,t.id);
   assert.equal(cells[2][1].includes('📖 推薦文'),!!t.food[i].ref?.url,t.food[i].name);
  });
 }
});

test('footprints group all regional trips despite different centers and regional aliases',()=>{
 const x=load(),groups=x.groups(x.trips);
 const counts=Object.fromEntries(groups.map(g=>[g.region,g.trips.length]));
 for(const [region,count] of Object.entries({'北海道':4,'沖繩':3,'東京':3,'東北':2,'九州':2,'關西':4,'中國地方':1,'中部':1}))assert.equal(counts[region],count,region);
 const ids=groups.flatMap(g=>g.trips.map(t=>t.id));
 assert.equal(ids.length,x.trips.length+2);
 for(const g of groups)assert.equal(new Set(g.trips.map(t=>t.id)).size,g.trips.length);
 assert.equal(new Set(ids).size,x.trips.length);
});
test('footprints do not merge different regions or countries at the same coordinates',()=>{
 const x=load();
 const trips=[{country:'日本',region:'東京',mapCenter:[35,139]},{country:'日本',region:'名古屋',mapCenter:[35,139]},{country:'其他',region:'東京',mapCenter:[35,139]}];
 assert.equal(x.groups(trips).length,3);
});

test('cross-region trips appear once in each visited region with distinct map markers',()=>{
 const x=load(),groups=x.groups(x.trips);
 const memberships=id=>Array.from(groups.filter(g=>g.trips.some(t=>t.id===id)),g=>g.region).sort();
 assert.deepEqual(memberships('tohoku-winter-2025'),['北海道','東北'].sort());
 assert.deepEqual(memberships('kansai-sanyo-2025'),['中國地方','關西'].sort());
 assert.deepEqual(memberships('nagoya-2027'),['中部']);
 const west=x.groups([x.trips.find(t=>t.id==='kansai-sanyo-2025')]);
 assert.notDeepEqual(Array.from(west[0].center),Array.from(west[1].center));
});
