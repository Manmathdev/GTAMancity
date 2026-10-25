import * as THREE from 'three';
export class MissionSystem{
 constructor(world,ui){this.world=world;this.ui=ui;this.active=null;this.completed=[];this.time=0;this.marker=null;this.targetMesh=null;this.money=2500;this.lastToast=0;}
 nearby(pos){return this.world.missionSpots.find(m=>!this.completed.includes(m.id)&&Math.hypot(pos.x-m.x,pos.z-m.z)<8);}
 start(m){if(this.active)return;this.active={...m,time:90};this.time=90;this.targetMesh=new THREE.Mesh(new THREE.TorusGeometry(5,.4,8,24),new THREE.MeshStandardMaterial({color:0x6df0b1,emissive:0x145b40}));this.targetMesh.rotation.x=Math.PI/2;this.targetMesh.position.set(m.target.x,.7,m.target.z);this.world.scene.add(this.targetMesh);this.ui.toast('JOB ACCEPTED · '+m.name);this.ui.setMission('ACTIVE JOB',m.name,m.desc);}
 update(dt,pos,inVehicle){if(this.active){this.time-=dt;if(this.targetMesh)this.targetMesh.rotation.z+=dt*.8;const d=Math.hypot(pos.x-this.active.target.x,pos.z-this.active.target.z);if(d<10&&(this.active.type==='walk'?!inVehicle:inVehicle)){this.complete();}else if(this.time<=0){this.fail();}}else{const near=this.nearby(pos);if(near)this.ui.prompt(`Press E to start: ${near.name}`);}}
 interact(pos){if(this.active)return;const m=this.nearby(pos);if(m)this.start(m);}
 complete(){const m=this.active;this.money+=m.reward;this.completed.push(m.id);this.world.scene.remove(this.targetMesh);this.targetMesh=null;this.active=null;this.ui.toast(`JOB COMPLETE · +$${m.reward}`);this.ui.setMission('FREE ROAM','Job completed',`${m.name} · reward $${m.reward}`);this.ui.setMoney(this.money);}
 fail(){this.world.scene.remove(this.targetMesh);this.targetMesh=null;this.ui.toast('JOB FAILED · time ran out');this.ui.setMission('FREE ROAM','Job failed','Take a breath and try another marker.');this.active=null;}
}
