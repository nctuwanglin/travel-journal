// CI only: the interactive local equivalent is /tests/browser.html.
const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const path=require('node:path');
const fs=require('node:fs/promises');
const os=require('node:os');
(async()=>{
 const server=spawn('python3',['-m','http.server','8765','--bind','127.0.0.1'],{cwd:path.join(__dirname,'..'),stdio:'ignore'});
 const downloads=await fs.mkdtemp(path.join(os.tmpdir(),'travel-downloads-'));
 const results=path.join(__dirname,'../test-results/pdf');
 let browser;
 try{
  for(let i=0;i<50;i++){
   if(server.exitCode!==null)throw new Error('Local test server failed to start');
   try{const res=await fetch('http://127.0.0.1:8765/tests/browser.html');if(res.ok)break;}catch{}
   if(i===49)throw new Error('Local test server timed out');
   await new Promise(r=>setTimeout(r,100));
  }
  browser=await chromium.launch({downloadsPath:downloads});const page=await browser.newPage({acceptDownloads:true});
  await page.goto('http://127.0.0.1:8765/tests/browser.html');
  await page.waitForFunction(()=>['passed','failed'].includes(document.body.dataset.status),{},{timeout:180000});
  const status=await page.locator('body').getAttribute('data-status');
  const result=await page.locator('#result').innerText();
  if(status!=='passed')throw new Error(result);
  console.log(result.split('\n')[0]);
  await fs.mkdir(results,{recursive:true});
  const errors=[];page.on('dialog',async dialog=>{errors.push(dialog.message());await dialog.dismiss();});
  for(const id of ['tohoku-2026','shikoku-2026','hokkaido-2013','nagoya-2027','okinawa-2026','tokyo-2026','tokyo-2022']){
   await page.goto('http://127.0.0.1:8765/#/trip/'+id);
   const before=new Set(await fs.readdir(downloads));
   let eventDownload;
   const receive=download=>{eventDownload=download;};page.on('download',receive);
   try{
    await page.getByRole('button',{name:'⬇ 下載旅遊書',exact:true}).click();
    const deadline=Date.now()+90000;let bytes;
    while(Date.now()<deadline&&!bytes){
     if(errors.length)throw new Error(errors.join('\n'));
     for(const file of await fs.readdir(downloads)){
      if(before.has(file))continue;
      const data=await fs.readFile(path.join(downloads,file)).catch(()=>null);
      if(data&&data.length>1000&&data.subarray(0,5).toString()==='%PDF-'&&data.subarray(-1024).includes(Buffer.from('%%EOF'))){bytes=data;break;}
     }
     if(!bytes)await new Promise(resolve=>setTimeout(resolve,250));
    }
    if(!bytes)throw new Error(id+' did not produce a complete PDF file');
    await fs.writeFile(path.join(results,id+'.pdf'),bytes);
    console.log(id+': PDF '+bytes.length+' bytes; download event '+(eventDownload?'received':'filesystem fallback'));
   }finally{page.off('download',receive);}
  }
 }finally{if(browser)await browser.close();server.kill();await fs.rm(downloads,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
