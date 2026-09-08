const {test}=require('node:test');const assert=require('node:assert/strict');
const M=require('../travel-mode.js');
const t={country:'日本',dateStart:'2027-01-01',dateEnd:'2027-01-10',days:Array.from({length:10},(_,i)=>({day:i+1}))};
test('today uses destination calendar day across UTC midnight',()=>{
 assert.equal(M.today(t,new Date('2026-12-31T15:01:00Z')).day,1);
 assert.equal(M.today(t,new Date('2027-01-09T15:01:00Z')).day,10);
 assert.equal(M.today(t,new Date('2027-01-10T15:01:00Z')).day,null);
});
test('outside trip dates is preview, not a fabricated today',()=>{
 assert.equal(M.today(t,new Date('2026-09-08T00:00:00Z')).status,'before');
 assert.equal(M.today(t,new Date('2027-02-08T00:00:00Z')).status,'after');
});
test('missing itinerary day does not select unrelated day',()=>{
 assert.equal(M.today({...t,days:[{day:1},{day:3}]},new Date('2027-01-02T01:00:00Z')).day,null);
});
test('navigation uses named destination, encodes query, and does not assume transport',()=>{
 const u=new URL(M.navigation(t,{name:'A & B',area:'函館'}));
 assert.equal(u.origin,'https://www.google.com');assert.equal(u.searchParams.get('api'),'1');
 assert.equal(u.searchParams.get('destination'),'日本 函館 A & B');assert.equal(u.searchParams.has('travelmode'),false);
});
