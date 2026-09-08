/* Shared snapshot rules for the dashboard and maintenance CLI. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.TravelMaintenance=factory();})(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';
  function stableStringify(x){return JSON.stringify(normalize(x));}
  function normalize(x){if(Array.isArray(x))return x.map(normalize);if(x&&typeof x==='object'){var out={};Object.keys(x).sort().forEach(function(k){out[k]=normalize(x[k]);});return out;}return x;}
  function pick(x,keys){var out={};keys.forEach(function(k){out[k]=x[k]===undefined?null:x[k];});return out;}
  function mapSnapshot(t){var out=pick(t,['title','subtitle','country','region','year','dateLabel','dateStart','dateEnd','nights','flight','stay','pass','days']);out.spots=(t.spots||[]).map(function(s){return pick(s,['name','area','day','latlng']);});return out;}
  function targets(t){var out=[];function add(key,label,value){out.push({key:key,label:label,value:value});}
    ['flight','pass'].forEach(function(k){if(t[k])add(k,k==='flight'?'航班':'交通票券',t[k]);});
    ['spots','food'].forEach(function(k){var prefix=k==='spots'?'spot':'food';(t[k]||[]).forEach(function(s){var value={};Object.keys(s).forEach(function(key){if(!['ref','day','latlng'].includes(key))value[key]=s[key];});add(prefix+':'+s.name,s.name,value);if(s.ref&&s.ref.url)add(prefix+'-ref:'+s.name,s.name+' 推薦連結',s.ref);});});
    (t.budget||[]).forEach(function(b){add('budget:'+b.item,b.item,b);});return out;
  }
  function mapState(t,m){var r=(m.maps||{})[t.id];if(!r)return{status:'untracked'};return{record:r,status:r.imagePath!==t.mapArt||stableStringify(r.baselineSnapshot)!==stableStringify(mapSnapshot(t))?'stale':r.aligned?'aligned':'unconfirmed'};}
  function checkState(t,key,m){var r=((m.checks||{})[t.id]||{})[key],target=targets(t).find(function(x){return x.key===key;});if(!r)return{status:'unrecorded'};return{record:r,status:target&&stableStringify(r.snapshot)===stableStringify(target.value)?'recorded':'changed'};}
  function summary(t,m){var out={total:0,recorded:0,changed:0,unrecorded:0};targets(t).forEach(function(x){out.total++;out[checkState(t,x.key,m).status]++;});return out;}
  return{stableStringify:stableStringify,mapSnapshot:mapSnapshot,targets:targets,mapState:mapState,checkState:checkState,summary:summary};
});
