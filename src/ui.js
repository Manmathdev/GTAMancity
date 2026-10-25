export class UI{
 constructor(){this.el=id=>document.getElementById(id);this.toastTimer=0;this.promptText='';this.el('resume-btn').onclick=()=>this.pause(false);this.el('close-menu').onclick=()=>this.pause(false);this.el('help-btn').onclick=()=>{this.el('pause-screen').classList.add('hidden');this.el('help-screen').classList.remove('hidden');};this.el('help-back').onclick=()=>{this.el('help-screen').classList.add('hidden');this.pause(true);};this.el('save-btn').onclick=()=>this.onSave?.();this.el('load-btn').onclick=()=>this.onLoad?.();}
 pause(show){this.el('pause-screen').classList.toggle('hidden',!show);}
 prompt(text=''){this.promptText=text;this.el('prompt').textContent=text;this.el('prompt').classList.toggle('visible',!!text);}
 toast(text){const e=this.el('toast');e.textContent=text;e.classList.add('show');clearTimeout(this.toastTimer);this.toastTimer=setTimeout(()=>e.classList.remove('show'),2400);}
 setMission(tag,title,desc){this.el('mission-tag').textContent=tag;this.el('mission-title').textContent=title;this.el('mission-desc').textContent=desc;}
 setMoney(v){this.el('money').textContent='$ '+Math.floor(v).toLocaleString('en-US');}
 setHealth(v){this.el('health').textContent='♥ '+Math.max(0,Math.floor(v));}
 setWanted(v){this.el('wanted').textContent='★'.repeat(v)+'☆'.repeat(5-v);}
 setCharacter(i){const names=['JAX MERCER','NOVA REYES','ELI PARK'],abilities=['Driver · vehicle handling bonus','Runner · faster sprint and recovery','Scout · starts with extra cash'];this.el('char-number').textContent='0'+(i+1);this.el('char-name').textContent=names[i];this.el('char-ability').textContent=abilities[i];}
 setVehicle(v){this.el('vehicle-hud').classList.toggle('hidden',!v);if(v){this.el('vehicle-name').textContent=v.userData.type;this.el('speed').textContent=Math.abs(Math.round(v.userData.speed*3.6))+' KM/H';this.el('damage-fill').style.width=(100-v.userData.damage)+'%';this.el('damage-fill').style.background=v.userData.damage>60?'#e56b59':'#a4d48b';}}
 menuMessage(s){this.el('menu-message').textContent=s;}
}
