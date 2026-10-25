import * as THREE from 'three';
const mat=(color,roughness=.9)=>new THREE.MeshStandardMaterial({color,roughness});
export class WorldBuilder{
 constructor(scene){this.scene=scene;this.colliders=[];this.roads=[];this.lamps=[];this.missionSpots=[];this.trafficLanes=[];this.build();}
 addBox(x,y,z,w,h,d,material,collide=false){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);m.position.set(x,y+h/2,z);m.castShadow=h>2;m.receiveShadow=true;this.scene.add(m);if(collide)this.colliders.push({x,z,hw:w/2,hd:d/2,top:h});return m;}
 build(){const s=this.scene; s.background=new THREE.Color(0x9dc7df);s.fog=new THREE.Fog(0x9dc7df,180,950);
 const ground=mat(0x667c57);this.addBox(0,-3,0,1500,5,1500,ground);this.addBox(0,-.3,430,1500,.6,450,mat(0x2f9eb2)); // ocean south
 // beach strip
 this.addBox(0,-.05,230,1500,.3,70,mat(0xd7c38f));
 // distant mountains
 for(let i=0;i<24;i++){const x=-650+i*56,z=-560-(i%4)*30,h=100+(i*37%150);const mesh=new THREE.Mesh(new THREE.ConeGeometry(45+(i%3)*20,h,5),mat(i%2?0x687c80:0x778b8a));mesh.position.set(x,h/2-2,z);mesh.rotation.y=i*.37;s.add(mesh);}
 // city road grid, road surfaces, sidewalks and blocks
 const road=mat(0x30363c),line=mat(0xe5d8a5),sidewalk=mat(0xb5b3a8),grass=mat(0x6e825b);
 const roadXs=[];for(let x=-540;x<=540;x+=120)roadXs.push(x);const roadZs=[];for(let z=-480;z<=240;z+=120)roadZs.push(z);
 for(const x of roadXs){this.addBox(x,.01, -100,20,.12,760,road);this.addBox(x-12,.02,-100,3,.16,760,sidewalk);this.addBox(x+12,.02,-100,3,.16,760,sidewalk);for(let z=-470;z<270;z+=28)this.addBox(x,.09,z, .25,.02,9,line);this.trafficLanes.push({axis:'z',pos:x,from:-450,to:200});}
 for(const z of roadZs){this.addBox(0,.01,z,1240,.12,20,road);this.addBox(0,.02,z-12,1240,.16,3,sidewalk);this.addBox(0,.02,z+12,1240,.16,3,sidewalk);for(let x=-600;x<610;x+=28)this.addBox(x,.09,z,9,.02,.25,line);this.trafficLanes.push({axis:'x',pos:z,from:-580,to:580});}
 // blocks of buildings in road cells
 const colors=[0xb8a99b,0x8c9ba0,0xd1c4a8,0x8d8d88,0x9dabae,0xb5a48f,0x777e84,0xd6c7b4];
 for(let gx=-5;gx<=5;gx++)for(let gz=-4;gz<=2;gz++){if(gz===2&&Math.abs(gx)<3)continue;const cx=gx*120,cz=gz*120;for(let k=0;k<2+(Math.abs(gx+gz)%3);k++){const w=18+((gx*13+gz*9+k*17+900)%28),d=18+((gx*7+gz*19+k*11+700)%28),x=cx+(k%2?27:-27),z=cz+(k>1?26:-27);if(Math.abs(x)>590||Math.abs(z)>430)continue;let h=12+((Math.abs(gx*41+gz*29+k*31))% (Math.abs(gx)<2?95:35));if(gz===-4)h*=.7;this.addBox(x,.1,z,w,h,d,mat(colors[Math.abs(gx*7+gz*3+k)%colors.length]),true);
 if(h>40){for(let wy=6;wy<h-2;wy+=5)this.addBox(x,.1+wy,z+d/2+.03,w*.65,.8,.06,mat(0x384e5b));}
 }}
 // landmark tower
 this.addBox(0,.1,-190,48,180,48,mat(0x9baeb5),true);this.addBox(0,180.1,-190,30,14,30,mat(0x506873));
 // airport runways west, terminal
 this.addBox(-450,.08,-390,220,.16,520,mat(0x292e33));for(let z=-620;z<-150;z+=25)this.addBox(-450,.18,z,1,.02,13,line);this.addBox(-270,.1,-430,100,18,45,mat(0xb5b9b6),true);this.addBox(-270,18.1,-430,90,1,40,mat(0x718b96));
 // countryside park and hills to east
 for(let i=0;i<95;i++){const x=260+Math.sin(i*13.2)*280,z=-380+Math.cos(i*7.3)*210;const trunk=this.addBox(x,.1,z,1.3,4,1.3,mat(0x70533a));const crown=new THREE.Mesh(new THREE.ConeGeometry(4+(i%3),9+(i%4),7),mat(i%2?0x2f6645:0x3c754d));crown.position.set(x,7,z);s.add(crown);}
 // beach palms
 for(let i=0;i<38;i++){const x=-680+i*37,z=195+(i%4)*7;this.addBox(x,.1,z,.8,7,.8,mat(0x76543a));for(let j=0;j<5;j++){const leaf=new THREE.Mesh(new THREE.ConeGeometry(1.2,7,5),mat(0x3d7049));leaf.position.set(x+Math.cos(j*1.25)*3,7.2+Math.sin(j)*.7,z+Math.sin(j*1.25)*3);leaf.rotation.z=Math.PI/2;leaf.rotation.y=j;s.add(leaf);}}
 // street lights at selected corners
 for(let x=-540;x<=540;x+=120)for(let z=-480;z<=240;z+=120){this.addBox(x+17,.1,z+17,.35,7,.35,mat(0x34383a));const bulb=new THREE.Mesh(new THREE.SphereGeometry(.55,8,8),mat(0xffe0a0));bulb.position.set(x+17,7.2,z+17);s.add(bulb);this.lamps.push(bulb);}
 // interactive job spots and garage
 this.missionSpots=[{id:'delivery',name:'THE LAST MILE',desc:'Deliver a package to the beach in 90 seconds.',x:125,z:0,reward:650,type:'drive',target:{x:400,z:150}},{id:'courier',name:'NIGHT COURIER',desc:'Reach the downtown tower before the clock runs out.',x:-120,z:-120,reward:900,type:'drive',target:{x:0,z:-190}},{id:'scenic',name:'COASTLINE RUN',desc:'Take a fast car to the pier and enjoy the view.',x:245,z:120,reward:500,type:'drive',target:{x:0,z:210}},{id:'foot',name:'NEIGHBORHOOD FAVOR',desc:'Jog to the park marker on foot.',x:-240,z:0,reward:350,type:'walk',target:{x:330,z:-270}}];
 this.missionSpots.forEach((p,i)=>{const ring=new THREE.Mesh(new THREE.TorusGeometry(4,.35,8,24),new THREE.MeshStandardMaterial({color:0xffc857,emissive:0x6d3b00,emissiveIntensity:.5}));ring.rotation.x=Math.PI/2;ring.position.set(p.x,.7,p.z);ring.userData.mission=i;s.add(ring);p.mesh=ring;const beam=new THREE.Mesh(new THREE.CylinderGeometry(.08,.8,8,8,1,true),new THREE.MeshBasicMaterial({color:0xffc857,transparent:true,opacity:.24,side:THREE.DoubleSide}));beam.position.set(p.x,4,p.z);s.add(beam);});
 this.garage={x:120,z:-120};this.addBox(120,.1,-140,30,7,20,mat(0x5b6872),true);this.addBox(120,7.1,-140,32,.8,22,mat(0xffc857));
 }
}
