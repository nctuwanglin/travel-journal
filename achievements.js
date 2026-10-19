/* Japan achievements: explicit evidence, unique places, and conservative completion. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory();
  else root.JapanAchievements=factory();
})(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';
  const kinds=['prefectures','castles','hotels'];
  const rank={unvisited:0,pending:1,planned:2,completed:3};
  const labels={unvisited:'未造訪',pending:'待確認',planned:'已規劃',completed:'已達成'};
  const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function todayJapan(){return new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
  function tripState(t,today){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(t.dateEnd||'')||!Number.isFinite(Date.parse(t.dateEnd))||new Date(t.dateEnd).toISOString().slice(0,10)!==t.dateEnd)return 'pending';
    if(t.dateEnd>=today)return 'planned';
    return t.status==='旅遊回憶'?'completed':'pending';
  }
  function evidenceExists(t,e,type){
    if(type==='hotels'&&e.kind!=='stay')return false;
    const pool=e.kind==='stay'?(t.stay||[]).map(x=>x.name):e.kind==='spot'?(t.spots||[]).map(x=>x.name):e.kind==='day'?(t.days||[]).flatMap(d=>(d.items||[]).map(i=>i.text)):[];
    return !!e.text&&pool.includes(e.text);
  }
  function summarize(trips,catalog,records,today){
    today=today||todayJapan();
    const result={issues:[]},japan=trips.filter(t=>t.country==='日本'),byTrip=new Map(japan.map(t=>[t.id,t]));
    const maps={};
    for(const type of kinds){
      const items=(catalog[type]||[]).map(x=>({...x,state:'unvisited',visits:[]}));
      result[type]={items,total:items.length};maps[type]=new Map(items.map(x=>[x.id,x]));
    }
    const issue=(t,reason)=>{if(!result.issues.some(x=>x.tripId===t.id&&x.reason===reason))result.issues.push({tripId:t.id,title:t.title,reason});};
    for(const t of japan){
      if(!records.some(r=>r.tripId===t.id))issue(t,'尚未建立成就對應，暫不計入。');
      else if(tripState(t,today)==='pending')issue(t,'行程是否完成尚待確認，暫不列為已達成。');
    }
    for(const r of records){
      const t=byTrip.get(r.tripId);if(!t)continue;
      for(const reason of r.uncertain||[])issue(t,reason);
      for(const type of kinds)for(const e of r[type]||[]){
        const item=maps[type].get(e.id);
        if(!item){issue(t,'成就項目不在目前名單，需核對後計入。');continue;}
        const valid=evidenceExists(t,e,type),state=valid?tripState(t,today):'pending';
        if(!valid)issue(t,'資料已變更：'+e.text+'，請重新核對成就對應。');
        if(!item.visits.some(v=>v.tripId===t.id))item.visits.push({tripId:t.id,title:t.title,date:t.dateStart||'',state,evidence:e.text});
        if(rank[state]>rank[item.state])item.state=state;
      }
    }
    for(const type of kinds){
      const group=result[type];
      for(const state of ['completed','planned','pending'])group[state]=group.items.filter(x=>x.state===state).length;
      group.percent=group.total?Math.round(group.completed/group.total*1000)/10:0;
    }
    return result;
  }
  function render(trips,catalog,records,today){
    const data=summarize(trips,catalog,records,today);
    const configs=[['prefectures','01','日本 47 都道府縣','實際遊覽或住宿；轉機與途經不計。'],['castles','02','日本 100 名城','原版百名城，以造訪計算，不要求集章。'],['hotels','03','日本星野飯店','日本境內住宿設施；用餐與參觀不計。']];
    function tripLink(v){return '<a href="#/trip/'+encodeURIComponent(v.tripId)+'">'+esc(v.title)+'</a>';}
    function card([type,no,title,note]){
      const g=data[type],groups=[...new Set(g.items.map(x=>x.group))];
      return '<article class="achievement-card achievement-'+type+'"><div class="achievement-kicker">JAPAN COLLECTION <span>'+no+'</span></div><h3>'+title+'<span>制霸達成率</span></h3>'+
        '<div class="achievement-score"><strong>'+g.completed+'<small> / '+g.total+'</small></strong><b>'+g.percent+'<small>%</small></b></div>'+
        '<progress max="'+g.total+'" value="'+g.completed+'" aria-label="'+title+'達成率 '+g.percent+'%">'+g.percent+'%</progress>'+
        '<p class="achievement-counts">已規劃 '+g.planned+' · 待確認 '+g.pending+'</p><p class="achievement-rule">'+note+'</p>'+
        '<details class="achievement-details"><summary>查看完整清單 <span>'+g.total+' 項</span></summary><div class="achievement-list">'+groups.map(group=>'<section><h4>'+esc(group)+'</h4><ul>'+g.items.filter(x=>x.group===group).map(x=>
          '<li class="achievement-item is-'+x.state+'"><div class="achievement-item-head"><strong>'+(type==='castles'?'<small>No. '+esc(x.id)+'</small> ':'')+esc(x.name)+'</strong><span class="achievement-state">'+(type==='hotels'&&x.state==='unvisited'?'未入住':labels[x.state])+'</span></div>'+
          (x.location?'<p class="achievement-location">'+esc(x.location)+'</p>':'')+
          (x.visits.length?'<ul class="achievement-evidence">'+x.visits.map(v=>'<li>'+tripLink(v)+' <span>· '+labels[v.state]+'</span></li>').join('')+'</ul>':'')+
          (x.url?'<a class="achievement-official" href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer">官方介紹 ↗</a>':'')+'</li>').join('')+'</ul></section>').join('')+'</div></details></article>';
    }
    return '<section class="achievements wrap" aria-labelledby="achievement-title"><div class="achievement-heading"><div><span class="eyebrow">JAPAN · 旅途收藏</span><h2 id="achievement-title">日本旅遊成就</h2></div><p>每一次出發，點亮一個新地方。</p></div><div class="achievement-grid">'+configs.map(card).join('')+'</div>'+
      '<p class="achievement-footnote">依已記錄且確認完成的行程計算；同一地點只計一次。已規劃、待確認不列入達成率。</p>'+
      (data.issues.length?'<details class="achievement-review"><summary>有 '+data.issues.length+' 筆紀錄待確認</summary><ul>'+data.issues.map(x=>'<li>'+tripLink(x)+'：'+esc(x.reason)+'</li>').join('')+'</ul></details>':'')+
      '<details class="achievement-sources"><summary>名單與計算方式</summary><p>名城採日本城郭協會原版 100 名城，不含續百名城。星野以 '+esc(catalog.updatedAt||'未記錄')+' 官方目錄的日本住宿設施為基準，排除海外、日歸設施及尚未開業的虹夕諾雅飛鳥；總數會隨名單維護調整。</p><p>住宿館別不明時不推定；日期已過但仍是預定的行程，須確認完成後才點亮成就。地點判定依景點、每日行程或住宿紀錄，不依航班或途經路線。</p>'+
      '<ul>'+(catalog.sources||[]).map(s=>'<li><a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.title)+'</a></li>').join('')+'</ul></details></section>';
  }
  return {summarize,render,todayJapan};
});
