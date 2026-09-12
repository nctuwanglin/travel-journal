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
  vm.runInContext(inline.split('/* ---------- boot ---------- */')[0]+'window.review={utilCols,buildDetailMap,tripMatches,foodTable};})();',ctx);
  return{food:ctx.window.review.foodTable,trips:ctx.window.TRIPS,render:ctx.window.review.utilCols,map(t,day){
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
