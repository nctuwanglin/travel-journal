/* One-day travel view. No itinerary mutation or location permission required. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.TravelMode=factory();})(typeof window!=='undefined'?window:globalThis,function(){
 'use strict';
 var zones={'日本':'Asia/Tokyo','韓國':'Asia/Seoul','越南':'Asia/Ho_Chi_Minh','中國':'Asia/Shanghai','台灣':'Asia/Taipei','香港':'Asia/Hong_Kong'};
 function today(t,now){
  var zone=zones[t.country],parts=new Intl.DateTimeFormat('en-US',Object.assign({year:'numeric',month:'2-digit',day:'2-digit'},zone?{timeZone:zone}:{})).formatToParts(now||new Date());
  function part(k){return parts.find(function(p){return p.type===k;}).value;}
  var date=part('year')+'-'+part('month')+'-'+part('day');
  var n=Math.round((Date.parse(date+'T00:00:00Z')-Date.parse(t.dateStart+'T00:00:00Z'))/86400000)+1;
  var status=date<t.dateStart?'before':date>t.dateEnd?'after':'during';
  return{date:date,zone:zone||'裝置時區',status:status,day:status==='during'&&(t.days||[]).some(function(d){return d.day===n;})?n:null};
 }
 function navigation(t,s){return 'https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent([t.country,s.area||t.region,s.name].filter(Boolean).join(' '));}
 function esc(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
 function mount(t,button){
  if(!button||!(t.days||[]).length)return function(){};
  var dialog=null,selected=0,oldOverflow='',clock;
  function dispose(){if(dialog){dialog.close();dialog.remove();dialog=null;document.body.style.overflow=oldOverflow;}clearInterval(clock);}
  function open(){
   if(dialog)return;
   var current=today(t);selected=Math.max(0,t.days.findIndex(function(d){return d.day===current.day;}));
   dialog=document.createElement('dialog');dialog.className='travel-mode no-print';dialog.setAttribute('aria-labelledby','travel-title');
   dialog.innerHTML='<header class="travel-head"><div><span class="eyebrow">TRAVEL MODE</span><h2 id="travel-title">'+esc(t.title)+'</h2></div><button type="button" class="btn" aria-label="關閉旅行模式" data-close>✕ 關閉</button></header>'+
    '<div class="travel-controls"><button type="button" class="btn" data-today>今天行程</button><label>快速切換日期<select aria-label="旅行模式日期">'+t.days.map(function(d,i){return '<option value="'+i+'">Day '+esc(d.day)+' ・ '+esc(d.date)+'</option>';}).join('')+'</select></label><p class="travel-status" role="status"></p></div>'+
    '<main class="travel-body"></main><nav class="travel-nav" aria-label="每日切換"><button type="button" class="btn" data-prev>← 前一天</button><span class="travel-count"></span><button type="button" class="btn" data-next>後一天 →</button></nav>';
   document.body.appendChild(dialog);oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
   var panel=dialog;
   dialog.addEventListener('close',function(){if(dialog!==panel)return;dispose();if(button.isConnected)button.focus();});
   dialog.querySelector('[data-close]').onclick=function(){dialog.close();};
   dialog.querySelector('select').onchange=function(e){selected=Number(e.target.value);paint();};
   dialog.querySelector('[data-prev]').onclick=function(){if(selected>0){selected--;paint();}};
   dialog.querySelector('[data-next]').onclick=function(){if(selected<t.days.length-1){selected++;paint();}};
   dialog.querySelector('[data-today]').onclick=function(){var day=today(t).day;if(day!==null){selected=t.days.findIndex(function(d){return d.day===day;});paint();}};
   paint();dialog.showModal();dialog.querySelector('[data-close]').focus();
   clock=setInterval(updateStatus,30000);
  }
  function updateStatus(){
   if(!dialog)return;
   var current=today(t),day=t.days[selected];
   dialog.querySelector('[data-today]').disabled=current.day===null;
   dialog.querySelector('.travel-status').textContent=current.date+' ・ '+current.zone+'｜'+(current.day===null?(current.status==='before'?'尚未出發，預覽行程':current.status==='after'?'旅程已結束，回顧行程':'今天未排定行程'):current.day===day.day?'正在查看今天行程':'正在預覽 Day '+day.day+'；今天是 Day '+current.day);
  }
  function paint(){
   var d=t.days[selected],tips=d.tips||(d.tip?[d.tip]:[]),spots=(t.spots||[]).filter(function(s){return s.day===d.day;});
   dialog.querySelector('select').value=String(selected);
   dialog.querySelector('[data-prev]').disabled=selected===0;dialog.querySelector('[data-next]').disabled=selected===t.days.length-1;
   dialog.querySelector('.travel-count').textContent=(selected+1)+' / '+t.days.length;
   var body=dialog.querySelector('.travel-body');
   body.innerHTML='<div class="travel-day-title"><span class="eyebrow">DAY '+esc(d.day)+' ・ '+esc(d.date)+'</span><h3>'+esc(d.theme)+'</h3></div>'+
    '<ol class="travel-stops">'+(d.items||[]).map(function(i){return '<li><span>'+esc(i.time)+'</span><div>'+esc(i.text)+'</div></li>';}).join('')+'</ol>'+
    tips.map(function(tp){return '<aside class="tip '+(tp.type==='warn'?'warn':'info')+'"><span class="ti">'+(tp.type==='warn'?'⚠️ ':'💡 ')+esc(tp.title)+'</span><span>'+esc(tp.text)+'</span></aside>';}).join('')+
    '<h3>當日景點導航</h3><p class="travel-note">在 Google Maps 確認入口與交通方式；湖泊、街區可能有多個入口。</p>'+
    (spots.length?spots.map(function(s){return '<section class="travel-spot"><h4>'+esc(s.name)+'</h4><p>'+esc(s.area)+'</p>'+(s.hours?'<p>'+esc(s.hours)+'</p>':'')+'<a class="btn btn-ink" target="_blank" rel="noopener noreferrer" href="'+esc(navigation(t,s))+'" aria-label="導航到 '+esc(s.name)+'">↗ 導航</a></section>';}).join(''):'<p>這天尚未建立景點導航資料，請參考上方行程。</p>');
   updateStatus();body.scrollTop=0;
  }
  button.addEventListener('click',open);
  return function(){button.removeEventListener('click',open);dispose();};
 }
 return{today:today,navigation:navigation,mount:mount};
});
