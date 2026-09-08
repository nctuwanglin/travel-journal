const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
test('file URL with local map art gives HTTP guidance before rendering or disabling button',async()=>{
 const ctx={window:{html2pdf(){}},location:{protocol:'file:'}};vm.createContext(ctx);
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../pdf-book.js'),'utf8'),ctx);
 const button={textContent:'下載',disabled:false};
 await assert.rejects(ctx.window.TravelBook.download({querySelector(){return{};}},{},button),/HTTP/);
 assert.equal(button.disabled,false);assert.equal(button.textContent,'下載');
});
