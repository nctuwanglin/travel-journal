/* Fixed-page PDF export. Each canvas is one A4 page, never a slice of a tall canvas. */
(function(){
  'use strict';
  function clean(node){
    var clone=node.cloneNode(true);
    clone.querySelectorAll('[id]').forEach(function(n){n.removeAttribute('id');});
    clone.removeAttribute('id');
    return clone;
  }
  async function waitImages(images){
    await Promise.all(Array.from(images).map(function(im){
      return new Promise(function(resolve,reject){
        function finish(){clearTimeout(timer);im.removeEventListener('load',loaded);im.removeEventListener('error',failed);}
        function loaded(){finish();im.naturalWidth?resolve():reject(new Error('行程圖無法讀取'));}
        function failed(){finish();reject(new Error('行程圖載入失敗，請確認圖片後重試'));}
        var timer=setTimeout(function(){finish();reject(new Error('行程圖載入逾時，請稍後重試'));},15000);
        im.addEventListener('load',loaded);im.addEventListener('error',failed);
        if(im.complete)loaded();
      });
    }));
  }
  async function buildPages(source,options){
    options=options||{};
    var holder=document.createElement('div');holder.className='book-stage';
    var status=document.createElement('div');status.className='book-status';status.setAttribute('role','status');status.textContent='正在整理旅遊書…';holder.appendChild(status);
    document.body.appendChild(holder);
    var pages=[],content;
    function newPage(){
      var page=document.createElement('article');page.className='book-page';
      content=document.createElement('div');content.className='book-content trip pdfbook';page.appendChild(content);
      holder.appendChild(page);pages.push(page);return page;
    }
    function fits(block,heading){
      if(heading)content.appendChild(heading);content.appendChild(block);
      var bottom=content.getBoundingClientRect().bottom;
      var ok=block.getBoundingClientRect().bottom<=bottom-2 && content.scrollHeight<=content.clientHeight;
      block.remove();if(heading)heading.remove();return ok;
    }
    function place(block,heading){
      if(!fits(block,heading))return false;
      if(heading)content.appendChild(heading);content.appendChild(block);return true;
    }
    function append(block,heading){
      if(place(block,heading))return;
      if(content.children.length){newPage();if(place(block,heading))return;}
      // Only oversized blocks are split. A row/stop/list item is always kept whole.
      var selector=block.matches('.day')?'.stop':block.querySelector('tbody')?'tbody tr':block.querySelector('.ulist')?'.ulist li':null;
      var items=selector?Array.from(block.querySelectorAll(selector)):[];
      if(items.length<2)throw new Error('有內容超出單頁，請縮短過長的單筆文字後重試');
      var chunks=[],chunk,container;
      function emptyChunk(){
        var c=clean(block);c.querySelectorAll(selector).forEach(function(n){n.remove();});
        if(selector==='.stop')c.querySelectorAll('.tip').forEach(function(n){n.remove();});
        return c;
      }
      function itemContainer(c){return c.querySelector(selector==='.stop'?'.day-body':selector==='tbody tr'?'tbody':'.ulist');}
      chunk=emptyChunk();container=itemContainer(chunk);
      items.forEach(function(item){
        var n=clean(item);container.appendChild(n);
        if(!fits(chunk,chunks.length?null:heading)){
          n.remove();
          if(!container.children.length)throw new Error('單筆內容超出 PDF 頁面，請縮短內容後重試');
          chunks.push(chunk);chunk=emptyChunk();container=itemContainer(chunk);container.appendChild(n);
          if(!fits(chunk,null))throw new Error('單筆內容超出 PDF 頁面，請縮短內容後重試');
        }
      });
      chunks.push(chunk);
      chunks.forEach(function(c,i){
        if(i){var label=c.querySelector('.day-head .th,h3');if(label){var more=document.createElement('span');more.className='book-continuation';more.textContent='（續）';label.appendChild(more);}}
        append(c,i?null:heading);
      });
      if(selector==='.stop')block.querySelectorAll('.tip').forEach(function(tip){append(clean(tip));});
    }
    try{
      // Images/fonts are measured only after they have settled; failed images stop export.
      await waitImages(source.querySelectorAll('img.mapart'));
      if(document.fonts){
        var fontTimer;
        try{await Promise.race([document.fonts.ready,new Promise(function(_,reject){fontTimer=setTimeout(function(){reject(new Error('字型載入逾時，請稍後重試'));},15000);})]);}
        finally{clearTimeout(fontTimer);}
      }
      newPage();
      var cover=source.querySelector('.cover');if(cover){var c=clean(cover);c.querySelectorAll('.back').forEach(function(n){n.remove();});append(c);}
      for(var section of source.querySelectorAll('.section')){
        if(section.querySelector('.detailmap'))continue;
        var heading=clean(section.querySelector('.sec-head'));
        var art=section.querySelector('.mapart');
        if(art){
          if(content.children.length)newPage();
          var artBlock=document.createElement('div');artBlock.appendChild(clean(art));
          var record=section.querySelector('.map-record');if(record){var copy=clean(record);copy.querySelectorAll('.map-prompt').forEach(function(n){n.remove();});artBlock.appendChild(copy);}
          append(artBlock,heading);newPage();continue;
        }
        var body=section.children[1];if(!body)continue;
        var blocks=body.matches('.days,.spots,.ucols,.infogrid')?Array.from(body.children):[body];
        for(var b of blocks){append(clean(b),heading);heading=null;}
      }
      if(!content.children.length&&pages.length>1)pages.pop().remove();
      pages.forEach(function(page,i){
        var footer=document.createElement('footer');footer.className='book-footer';
        var title=document.createElement('span');title.textContent=options.title||'行程集錦';
        var number=document.createElement('span');number.textContent=(i+1)+' / '+pages.length;
        footer.append(title,number);page.appendChild(footer);
      });
      return{holder:holder,pages:pages,status:status,dispose:function(){holder.remove();}};
    }catch(e){holder.remove();throw e;}
  }
  async function download(source,trip,button){
    if(!window.html2pdf)throw new Error('PDF 元件尚未載入完成，請連線後重試');
    if(location.protocol==='file:'&&source.querySelector('img.mapart'))throw new Error('含行程圖的 PDF 請從線上網站或本機 HTTP 預覽下載，無法由 file:// 匯出本機圖片。請依維護指南啟動本機預覽。');
    var book,original=button.textContent;
    button.disabled=true;button.textContent='整理旅遊書中…';
    try{
      book=await buildPages(source,{title:trip.country+' '+trip.region+' '+trip.year});
      var pdf;
      for(var i=0;i<book.pages.length;i++){
        var page=book.pages[i];book.status.textContent='產生 PDF '+(i+1)+' / '+book.pages.length+' 頁…';button.textContent=book.status.textContent;
        var worker=window.html2pdf().set({margin:0,image:{type:'jpeg',quality:.95},html2canvas:{scale:2,useCORS:true,backgroundColor:'#fff',scrollX:0,scrollY:0},jsPDF:{unit:'mm',format:'a4',orientation:'portrait'},pagebreak:{mode:[]},enableLinks:false}).from(page).toCanvas();
        var canvas=await worker.get('canvas');
        if(!pdf){
          pdf=await worker.toPdf().get('pdf');
          // The worker provides its bundled jsPDF instance. Replace its automatic slices.
          while(pdf.getNumberOfPages())pdf.deletePage(1);
        }
        pdf.addPage();pdf.addImage(canvas.toDataURL('image/jpeg',.95),'JPEG',0,0,210,297);
        var bounds=page.getBoundingClientRect();
        page.querySelectorAll('a[href]').forEach(function(link){
          if(!/^https?:\/\//i.test(link.href))return;
          Array.from(link.getClientRects()).forEach(function(r){pdf.link((r.left-bounds.left)*210/bounds.width,(r.top-bounds.top)*297/bounds.height,r.width*210/bounds.width,r.height*297/bounds.height,{url:link.href});});
        });
        canvas.width=canvas.height=0;
      }
      pdf.setProperties({title:trip.title+' — 旅遊書',subject:'行程集錦',creator:'Travel Journal'});
      await pdf.save(trip.region+'_'+trip.year+'_旅遊書.pdf',{returnPromise:true});
    }finally{if(book)book.dispose();button.disabled=false;button.textContent=original;}
  }
  window.TravelBook={buildPages:buildPages,download:download};
})();
