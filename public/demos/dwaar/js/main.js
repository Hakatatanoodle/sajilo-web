(()=>{
const IMG=window.DWAAR_IMG||{hero:"assets/hero.jpg",win:"assets/win.jpg",tower:"assets/tower.jpg",sq:"assets/sq.jpg",arch:"assets/arch.jpg",gate:"assets/gate.jpg",room1:"assets/room1.jpg",room2:"assets/room2.jpg",food1:"assets/food1.jpg",food2:"assets/food2.jpg",lamps:"assets/lamps.jpg",pot:"assets/pot.jpg"};
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
gsap.registerPlugin(ScrollTrigger);
let lenis=null;
if(!reduce){lenis=new Lenis({lerp:.09});lenis.on('scroll',ScrollTrigger.update);lenis.stop();}
const items=[...document.querySelectorAll('[data-img]')].map(el=>({el,key:el.dataset.img,crop:el.dataset.crop.split(',').map(Number),hero:el.hasAttribute('data-hero')}));
let heroU=null;
const cur=document.querySelector('.cursor');
let px=-1,py=-1;

/* horizontal gallery */
const track=document.querySelector('.track');
const dist=()=>Math.max(0,track.scrollWidth-innerWidth);
gsap.to(track,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:'#gal',start:'top top',end:()=>'+='+dist(),pin:true,scrub:true,invalidateOnRefresh:true}});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>ScrollTrigger.refresh());
const link=document.querySelector('.top a');

/* cursor */
if(matchMedia('(hover:hover) and (pointer:fine)').matches){
  cur.classList.add('on');
  const qx=gsap.quickTo(cur,'x',{duration:.35,ease:'power3'}),qy=gsap.quickTo(cur,'y',{duration:.35,ease:'power3'});
  addEventListener('pointermove',e=>{qx(e.clientX);qy(e.clientY);});
}
addEventListener('pointermove',e=>{px=e.clientX;py=e.clientY;});

/* the one orchestrated moment: the doors open */
function open(){
  const g=document.getElementById('pre');
  if(reduce){g.remove();return;}
  gsap.set('.h-in',{yPercent:110});
  gsap.set('.dl',{transformOrigin:'0% 50%',transformPerspective:2400});
  gsap.set('.dr',{transformOrigin:'100% 50%',transformPerspective:2400});
  if(heroU)heroU.u.uZoom.value=1.2;
  const tl=gsap.timeline({delay:.8});
  tl.to('.glow',{opacity:.7,duration:.5},0)
    .to('.dl',{xPercent:-1.5,duration:.45,ease:'power2.out'},0)
    .to('.dr',{xPercent:1.5,duration:.45,ease:'power2.out'},0)
    .to('.dl',{xPercent:-101,duration:2.3,ease:'power4.inOut'},.55)
    .to('.dr',{xPercent:101,duration:2.3,ease:'power4.inOut'},.55)
    .to('.shade',{opacity:.4,duration:1.6,ease:'power2.in'},.55)
    .to('.glow',{opacity:0,duration:1.4},1.5)
    .set('.door',{autoAlpha:0},2.9)
    .add(()=>{g.remove();if(lenis)lenis.start();},3.1);
  if(heroU)tl.to(heroU.u.uZoom,{value:1.06,duration:3,ease:'power3.out'},1);
  tl.to('.h-in',{yPercent:0,duration:1.1,ease:'power3.out'},1.9)
    .fromTo('.hero-copy > div',{opacity:0,y:14},{opacity:1,y:0,duration:.9},2.1)
    .fromTo('.top',{opacity:0},{opacity:1,duration:.8},2.1);
}
let fell=false;
function fallback(){
  if(fell)return;fell=true;
  if(lenis){lenis.destroy();lenis=null;}
  items.forEach(i=>{const c=i.crop,s=i.el.style;s.backgroundImage='url('+IMG[i.key]+')';s.backgroundRepeat='no-repeat';
    if(c[2]>=1&&c[3]>=1){s.backgroundSize='cover';s.backgroundPosition='center';}
    else{s.backgroundSize=(100/c[2])+'% '+(100/c[3])+'%';s.backgroundPosition=(c[2]<1?c[0]/(1-c[2])*100:0)+'% '+(c[3]<1?c[1]/(1-c[3])*100:0)+'%';}});
  open();
}

const VS='varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
const FS=`precision highp float;
uniform sampler2D uTex;uniform vec2 uImg,uMouse,uPar;uniform vec4 uCrop;
uniform float uPlane,uHover,uOpen,uVel,uTime,uZoom;varying vec2 vUv;
vec2 fit(vec2 uv){
  float ca=(uCrop.z*uImg.x)/(uCrop.w*uImg.y);vec2 s=vec2(1.);
  if(uPlane>ca)s.y=ca/uPlane;else s.x=uPlane/ca;
  uv=(uv-.5)*s/uZoom+.5;
  return vec2(uCrop.x+uv.x*uCrop.z,1.-uCrop.y-uCrop.w+uv.y*uCrop.w);
}
void main(){
  vec2 uv=vUv+uPar;
  vec2 p=(vUv-uMouse)*vec2(uPlane,1.);float d=length(p);
  float fall=exp(-d*3.5)*uHover;
  vec2 dir=p/(d+1e-4)/vec2(uPlane,1.);
  uv+=dir*(sin(d*30.-uTime*3.)*.007-.035*exp(-d*6.))*fall;
  uv.x+=sin(vUv.y*3.14159)*uVel*.02;
  float sh=.003*(fall*3.+abs(uVel)*2.);
  vec3 col=vec3(texture2D(uTex,fit(uv+vec2(sh,0.))).r,texture2D(uTex,fit(uv)).g,texture2D(uTex,fit(uv-vec2(sh,0.))).b);
  col*=mix(.6,1.,uOpen);
  float dd=abs(vUv.x-.5)*2.;float edge=uOpen*1.04;
  float m=1.-smoothstep(edge-.01,edge,dd);
  float line=smoothstep(.012,0.,abs(dd-edge));
  gl_FragColor=vec4(mix(col,vec3(.89,.70,.42),line),max(m,line));
}`;

let renderer;
try{renderer=new THREE.WebGLRenderer({canvas:document.getElementById('gl'),alpha:true,antialias:true});}catch(e){renderer=null;}
if(!renderer||(location.protocol==='file:'&&IMG.hero.indexOf('data:')!==0)){fallback();}else{
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);renderer.setClearColor(0x000000,0);
  const scene=new THREE.Scene();
  const cam=new THREE.OrthographicCamera(-innerWidth/2,innerWidth/2,innerHeight/2,-innerHeight/2,-10,10);
  const geo=new THREE.PlaneGeometry(1,1);
  const tex={};const keys=Object.keys(IMG);let n=0;
  const loader=new THREE.TextureLoader();
  keys.forEach(k=>loader.load(IMG[k],t=>{t.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());tex[k]=t;if(++n===keys.length)build();},undefined,fallback));

  function build(){
    items.forEach(i=>{
      const t=tex[i.key];
      i.u={uTex:{value:t},uImg:{value:new THREE.Vector2(t.image.width,t.image.height)},uCrop:{value:new THREE.Vector4(...i.crop)},
        uPlane:{value:1},uHover:{value:0},uMouse:{value:new THREE.Vector2(.5,.5)},uPar:{value:new THREE.Vector2()},
        uOpen:{value:1},uVel:{value:0},uTime:{value:0},uZoom:{value:i.hero?1.1:1}};
      i.mesh=new THREE.Mesh(geo,new THREE.ShaderMaterial({uniforms:i.u,vertexShader:VS,fragmentShader:FS,transparent:true}));
      scene.add(i.mesh);
      if(i.hero)heroU=i;
    });
    open();
    let sv=0;
    gsap.ticker.add(time=>{
      if(lenis)lenis.raf(time*1000);
      const v=lenis?lenis.velocity:0;sv+=(v-sv)*.12;
      const vel=Math.max(-1,Math.min(1,sv*.012));
      const w=innerWidth,h=innerHeight;let any=false;
      for(const i of items){
        const r=i.el.getBoundingClientRect();
        const vis=r.width>0&&r.bottom>0&&r.top<h&&r.right>0&&r.left<w;
        i.mesh.visible=vis;if(!vis)continue;
        i.mesh.position.set(r.left+r.width/2-w/2,-(r.top+r.height/2)+h/2,0);
        i.mesh.scale.set(r.width,r.height,1);
        const u=i.u;u.uPlane.value=r.width/r.height;u.uTime.value=time;u.uVel.value=vel;
        const inside=px>=r.left&&px<=r.right&&py>=r.top&&py<=r.bottom;
        if(inside){any=true;
          u.uMouse.value.x+=((px-r.left)/r.width-u.uMouse.value.x)*.2;
          u.uMouse.value.y+=(1-(py-r.top)/r.height-u.uMouse.value.y)*.2;}
        u.uHover.value+=((inside?1:0)-u.uHover.value)*.08;
        if(i.hero&&px>=0){
          u.uPar.value.x+=((.5-px/w)*.02-u.uPar.value.x)*.05;
          u.uPar.value.y+=((py/h-.5)*.02-u.uPar.value.y)*.05;
          u.uZoom.value+=(1.06-u.uZoom.value)*.01;
        }
      }
      renderer.render(scene,cam);
      cur.classList.toggle('big',any);
    });
    gsap.ticker.lagSmoothing(0);
  }
  addEventListener('resize',()=>{
    const w=innerWidth,h=innerHeight;renderer.setSize(w,h);
    cam.left=-w/2;cam.right=w/2;cam.top=h/2;cam.bottom=-h/2;cam.updateProjectionMatrix();ScrollTrigger.refresh();
  });
}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(!t)return;e.preventDefault();if(a.dataset.room)document.getElementById('room').value=a.dataset.room;lenis?lenis.scrollTo(t):t.scrollIntoView({behavior:'smooth'});}));
const bf=document.getElementById('bf');bf.addEventListener('submit',e=>{e.preventDefault();const n=new FormData(bf).get('guest');document.getElementById('ok').textContent='Thank you, '+n+'. This is a concept site, so nothing was sent. A working booking form like this is something Sajilo Web builds for hotels.';bf.reset();});
})();